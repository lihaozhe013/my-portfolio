# Three.js 高级 GPU 墨迹追踪方案

## Summary

- 当前由六个轨迹采样点叠加出的解析 shader 只能形成局部光晕，缺少持续墨水状态、帧间反馈和真实流动，无法通过继续调参实现高级墨迹追踪。
- 主效果升级为基于 Three.js
  RenderTarget 的 WebGL2 二维流体墨场：鼠标向速度场与颜料场注入能量，墨迹产生卷吸、融合、扩散、沉积，并在停止输入后约
  `3–4s` 内消退。
- 视觉方向采用“湿宣纸上的流体扩散”：保留方向性笔锋和少量飞白，但不把飞溅作为主要表现。
- 全站启用同一套模拟：首页使用完整强度；Timeline、About、Contact 等内容页降低注墨量和最终对比度。
- 滚动不参与墨场计算，也不注册滚轮阻塞逻辑。没有鼠标输入时不会生成新墨迹。

## Current Implementation Assessment

### Existing Strengths

- 已经具备稳定的 Three.js 生命周期、路由强度控制、WebGL context-loss 回退和带
  `[ink_3d]` 前缀的 shader 调试日志。
- 当前全屏 shader 可以继续承担静态宣纸底纹和大尺度底层墨云。
- Canvas 位于内容层下方并设置
  `pointer-events: none`，不会影响链接、文本选择、弹窗和原生滚动。

### Existing Limitations

- 六个 `vec4`
  轨迹 uniform 只描述有限数量的瞬时影响点，旧轨迹不能与新轨迹发生真实融合。
- fragment
  shader 每帧都从同一套程序化噪声重新计算，没有保存上一帧的颜料、含水量或速度。
- 粒子位置没有持久状态，只围绕初始位置做解析偏移，因此不能被流场带走、回卷或形成飞溅轨迹。
- 单一方向 uniform 同时作用于全部轨迹，折返、画圈和快速变向时无法保留每一段笔势。
- 当前效果本质上是“鼠标附近的噪声扭曲”，不是持续存在并演化的墨水介质。

## Visual Direction

### Fluid Ink

- 持续慢速移动时生成细而淡的连续笔触，外围仍通过含水量和速度场自然渗开。
- 快速移动时笔触变窄并沿移动方向拉伸，边缘出现不规则断裂、飞白和少量高速墨滴。
- 轨迹交叉时墨水自然合并；快速折返或画圈时速度场形成可见但克制的回卷涡流。
- 停止移动后不再注入新墨，但现有墨迹继续扩散、沉积和蒸发，约 `3–4s`
  后回到静态纸面。
- 点击产生一次局部墨震和少量卫星墨点，不形成连续喷射器。

### Paper and Pigment

- 现有程序化 shader 降为静态纸张底纹与淡墨云，不再承担主要追踪效果。
- 颜料合成加入纸张颗粒扰动、湿区柔化、干区破碎、边缘积墨和轻微色素沉降。
- 墨色以暖黑和炭灰为主；朱砂只在高速划动或点击产生的极少数粒子中短暂出现。
- 墨场始终位于页面内容下方，不在正文与项目卡片上形成长期不透明墨块。

## Simulation Architecture

### Render Targets

- 使用 WebGL2、Half Float 纹理和 ping-pong RenderTarget 保存连续模拟状态。
- `velocity`：最长边约 `512px` 的二维速度场，保存墨水运动方向和强度。
- `pressure`、`divergence`、`curl`：与速度场同级，用于不可压缩流体求解与涡度增强。
- `pigment/wetness`：最长边约 `1024px`，保存颜料密度、含水量和沉积状态。
- RenderTarget 根据视口宽高比创建，resize 时重建并清空旧状态，不拉伸已有墨迹。

### Frame Pipeline

每个活动帧按以下顺序执行：

1. 将本帧缓存的鼠标线段注入速度场、颜料场和含水量通道。
2. 对速度场执行半拉格朗日平流。
3. 计算 curl 并施加涡度约束，保留小尺度回卷。
4. 计算 divergence，执行约 `18` 次 Jacobi pressure iteration。
5. 从速度场减去压力梯度，得到近似不可压缩流体。
6. 使用速度场平流颜料和含水量。
7. 根据纸张噪声执行非均匀扩散、蒸发、颗粒吸附与边缘沉积。
8. 将静态纸墨、流体颜料和 GPU 粒子合成为最终透明画面。

### Pointer Injection

- 指针事件保存在 WebGL 控制器内部队列，不通过 React state 逐帧传播。
- 每个事件使用屏幕像素记录位置、时间、累计路径和像素速度，避免归一化位移被重复放大。
- 静止约 `140ms` 后开始的新笔画先经过 `3px` 微移动死区，并在累计移动 `3–14px`
  时平滑提高起笔增益。
- 相邻事件按屏幕距离插值为连续线段，补点间距约
  `3–4px`，避免高刷新率或快速移动产生断裂圆斑。
- 所有移动速度共用固定的细颜料核心；速度只调节方向力与颜料量，不再放大慢速笔画宽度。
- 速度场作用半径绑定为颜料核心的约 `1.6`
  倍；相邻轨迹采样使用覆盖合并，避免密集圆形 splat 累加为粗带。
- 快速输入使用更强方向速度，并根据加速度生成稀疏飞白与卫星墨滴。
- 指针离开窗口后停止注入；已有墨迹继续完成物理衰减。

### GPU Particles

- 将当前静态 `THREE.Points` 升级为约 `8192`
  个具有持久位置、速度、寿命和 seed 的 GPU 状态粒子。
- 粒子从高速轨迹、急转弯或点击位置附近的窄范围生成，并采样相同的流体速度场，因此与主体墨迹共享运动方向而不形成大面积墨雾。
- 大部分粒子是低对比度墨尘；只有满足高速阈值且 seed 足够高的少量粒子显示短暂朱砂色。
- 粒子寿命结束后回收到不可见状态，等待下一次指针事件重新生成。

## Scene and Lifecycle

- `InkCanvas`
  只负责 renderer、路由模式、resize、visibility、context-loss 和资源释放。
- 流体求解器、全屏 pass、RenderTarget 管理和 shader 常量拆分为独立的内部模块。
- Renderer 使用 `powerPreference: 'high-performance'`，DPR 上限提高到 `2`。
- 不实现动态分辨率、低粒子数量、慢帧自动降级或低配设备分支。
- 首页注墨与合成强度为 `1.0`；内容页注墨量约为 `0.45`，最终合成透明度约为
  `0.55`，模拟分辨率和求解质量保持一致。
- 只有存在待处理输入或墨迹能量仍高于阈值时持续请求动画帧；颜料消退后渲染一次静态底纹并暂停循环。
- 页面隐藏时暂停模拟；恢复时丢弃过期输入并重置帧时间，避免一次性执行过大的时间步长。
- 路由切换时保留 renderer，但清空流体和粒子状态，避免首页墨迹进入内容页。

## Compatibility and Accessibility

- 高级效果要求 WebGL2 和浮点 RenderTarget 支持。
- WebGL2 初始化、浮点 framebuffer 或 shader 编译失败时，回退到当前的简单纸墨 shader；不尝试低质量流体模拟。
- `prefers-reduced-motion`
  下禁用流体演化、飞溅和点击墨震，只渲染静态纸墨背景。这属于无障碍行为，不作为性能降级策略。
- 触屏和 coarse
  pointer 不运行连续拖动注墨，避免与页面滚动冲突；轻触只产生一次短暂淡墨波纹。
- Canvas 继续保持 `aria-hidden="true"` 和 `pointer-events: none`。

## Debugging

- 开发环境日志统一使用 `[ink_fluid]`
  前缀，记录 WebGL 能力、RenderTarget 配置、shader 编译失败、context
  loss、fallback 原因和首次有效合成。
- 增加 `?inkDebug=1` 调试模式，显示：
  - velocity、pigment、pressure 和 curl 的缩略预览；
  - 当前 RenderTarget 尺寸、DPR、活动粒子数和模拟是否休眠；
  - CPU frame time、GPU pass 数量和最近一秒平均 FPS。
- 调试 UI 只在开发环境与显式 query 参数同时满足时出现，不进入正常页面视觉层。

## Delivery Phases

### Phase 1 — Fluid Core

- 建立 RenderTarget ping-pong 基础设施和全屏 pass 管线。
- 完成 velocity advection、curl、divergence、pressure solve 和 gradient
  subtract。
- 使用调试视图验证速度场稳定、无 framebuffer 错误且 resize 后状态正确。

### Phase 2 — Pigment and Pointer Stroke

- 加入连续鼠标线段插值、速度映射和 splat 注入。
- 完成颜料/含水量平流、纸张扩散、蒸发、沉积与最终合成。
- 调整慢速、快速、折返和交叉轨迹之间的视觉差异。

### Phase 3 — Particles and Integration

- 接入 GPU 粒子状态、飞白墨点、点击墨震和克制的朱砂强调。
- 应用首页与内容页强度档位，并处理路由、visibility、context-loss 和 reduced-motion。
- 移除旧六点轨迹 uniform 与 React 指针订阅路径，保留旧 shader 作为静态底纹和失败回退。

### Phase 4 — Visual Tuning

- 调整墨色密度、固定笔画宽度、扩散速度、涡度、蒸发时间、边缘沉积和内容对比度。
- 确认墨迹在 `3–4s` 内完成从浓墨、扩散到沉积消退的完整过程。
- 使用生产构建检查最终 shader、资源释放和运行时控制台。

## Test Plan

- 验证静止后单次 `1–2px` 蹭动不注入颜料、速度或粒子，也不会生成低速大圆斑。
- 验证累计移动 `3–14px` 时墨迹平滑渐入，持续慢移超过约 `20px`
  后形成细而淡的连续线。
- 验证慢移、快速横扫、折返、画圈、轨迹交叉、突然停止、点击和移出窗口；慢速移动不得重新产生宽圆斑。
- 验证墨迹沿完整路径连续生成，能够卷吸、融合，并在停止输入后约 `3–4s`
  内自然消退。
- 验证页面静止且墨迹消退后动画循环暂停；滚轮、触控板和页面滚动位置不改变墨场。
- 验证首页与内容页强度差异，以及文本、链接、项目弹窗、文本选择和键盘操作不受影响。
- 验证 resize、路由切换、标签页隐藏恢复、React Strict Mode 和 WebGL context
  loss。
- 验证 WebGL2、Half Float RenderTarget 和各个 shader
  pass 编译成功，正常模式下控制台不存在 WebGL 错误。
- 验证不支持高级管线时能够进入现有简单 shader 回退，不出现空白背景或重复报错。
- 运行 `pnpm exec tsc --noEmit` 与 `pnpm build`。
- 性能目标为在 `1440p` 常规独立显卡环境接近
  `60fps`；视觉质量不因运行时帧率自动降低。

## Acceptance Criteria

- 有意移动越过起笔死区后出现连续墨迹，不呈现为离散圆斑，也不整体平移背景。
- 静止后的 `1–2px` 微小位移不会产生任何可见落墨。
- 慢速与高速轨迹具有清晰差异，并能看到涡流、融合、湿边扩散、边缘沉积和局部颗粒破碎。
- 轨迹交叉、折返和画圈时保留各段方向信息，不被最后一次鼠标方向统一覆盖。
- 停止输入后只保留物理扩散余韵，不产生新的自动墨迹；最终回到静态纸面。
- 高级效果覆盖全站且内容页更加克制，不恢复任何滚动驱动或滚轮阻塞逻辑。
- 页面内容始终清晰可读，Canvas 不捕获交互事件。
- 正常运行时没有 shader 编译、invalid framebuffer、`useProgram` 或 `drawArrays`
  错误。

## Assumptions

- 视觉质量优先，不针对低配设备设计运行时降级策略。
- 不引入第三方流体库；使用 Three.js 的 RenderTarget 和自定义 shader 构建模拟管线。
- 不增加具象毛笔、自定义光标、音效、山水模型或滚动驱动动画。
- 流体模拟是屏幕空间二维效果；粒子提供有限的空间层次，但不引入三维模型场景。
- 本方案保留当前 shader 的视觉价值，但将其定位为静态底纹与兼容回退，而非主要墨迹追踪实现。

const markdownModules = import.meta.glob('../content/projects/**/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

const imageModules = import.meta.glob(
  '../content/projects/**/*.{png,jpg,jpeg,svg,gif,webp}',
  {
    eager: true,
    query: '?url',
    import: 'default',
  },
) as Record<string, string>;

const markdownByFilename = new Map<string, string>();

for (const [path, content] of Object.entries(markdownModules)) {
  const projectsIndex = path.indexOf('projects/');
  const filename =
    projectsIndex === -1
      ? path.split('/').at(-1)
      : path.slice(projectsIndex + 'projects/'.length);

  if (!filename) {
    continue;
  }

  if (markdownByFilename.has(filename)) {
    throw new Error(`Duplicate project Markdown filename: ${filename}`);
  }

  markdownByFilename.set(filename, content);
}

const imageUrlByPath = new Map<string, string>();

for (const [path, url] of Object.entries(imageModules)) {
  const projectsIndex = path.indexOf('projects/');
  if (projectsIndex === -1) {
    continue;
  }
  imageUrlByPath.set(path.slice(projectsIndex + 'projects/'.length), url);
}

export function hasProjectMarkdown(filename: string): boolean {
  return markdownByFilename.has(filename);
}

export function getProjectMarkdown(filename: string): string | undefined {
  return markdownByFilename.get(filename);
}

export function resolveProjectImage(
  markdownFilename: string,
  imageSrc: string,
): string | undefined {
  const relativeSrc = imageSrc.replace(/^\.\//, '');
  if (/^(https?:|data:|\/)/.test(relativeSrc)) {
    return imageSrc;
  }

  const dir = markdownFilename.includes('/')
    ? markdownFilename.slice(0, markdownFilename.lastIndexOf('/') + 1)
    : '';

  return imageUrlByPath.get(dir + relativeSrc);
}

export interface ProjectMarkdownPreview {
  readingMinutes: number;
}

export function getProjectMarkdownPreview(
  filename: string,
): ProjectMarkdownPreview | undefined {
  const markdown = getProjectMarkdown(filename);

  if (!markdown) {
    return undefined;
  }

  const readableContent = markdown.replace(/```[\s\S]*?```/g, ' ');
  const wordCount = readableContent.split(/\s+/).filter(Boolean).length;

  return {
    readingMinutes: Math.max(1, Math.ceil(wordCount / 220)),
  };
}

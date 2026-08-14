const markdownModules = import.meta.glob('../content/projects/*.md', {
  eager: true,
  import: 'default',
  query: '?raw',
}) as Record<string, string>;

const markdownByFilename = new Map<string, string>();

for (const [path, content] of Object.entries(markdownModules)) {
  const filename = path.split('/').at(-1);

  if (!filename) {
    continue;
  }

  if (markdownByFilename.has(filename)) {
    throw new Error(`Duplicate project Markdown filename: ${filename}`);
  }

  markdownByFilename.set(filename, content);
}

export function hasProjectMarkdown(filename: string): boolean {
  return markdownByFilename.has(filename);
}

export function getProjectMarkdown(filename: string): string | undefined {
  return markdownByFilename.get(filename);
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

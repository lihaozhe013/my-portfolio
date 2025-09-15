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

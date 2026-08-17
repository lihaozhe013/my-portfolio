import rawPortfolioData from '@/data/portfolio.json';
import type {
  PortfolioData,
  ProjectCategory,
  ProjectLinkType,
} from '@/types/content';
import { hasProjectMarkdown } from '@/data/projectMarkdown';

const projectCategories = rawPortfolioData.projectCategories;

const projectLinkTypes = new Set<ProjectLinkType>(['github', 'external']);

function parseProjectCategory(value: string): ProjectCategory {
  if (!Object.hasOwn(projectCategories, value)) {
    throw new Error(`Unsupported project category: ${value}`);
  }
  return value as ProjectCategory;
}

function parseProjectLinkType(value: string): ProjectLinkType {
  if (!projectLinkTypes.has(value as ProjectLinkType)) {
    throw new Error(`Unsupported project link type: ${value}`);
  }
  return value as ProjectLinkType;
}

function parseProjectMarkdown(value: unknown): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (
    typeof value !== 'string' ||
    value.length === 0 ||
    value.includes('\\') ||
    value.endsWith('/') ||
    !value.endsWith('.md')
  ) {
    throw new Error(`Invalid project Markdown filename: ${String(value)}`);
  }

  if (!hasProjectMarkdown(value)) {
    throw new Error(`Project Markdown file was not found: ${value}`);
  }

  return value;
}

export const portfolioData: PortfolioData = {
  ...rawPortfolioData,
  projects: rawPortfolioData.projects.map((project) => ({
    ...project,
    markdown: parseProjectMarkdown(
      'markdown' in project ? project.markdown : undefined,
    ),
    category: parseProjectCategory(project.category),
    links: project.links.map((link) => ({
      ...link,
      type: parseProjectLinkType(link.type),
    })),
  })),
};

export function getProjectCategoryLabel(
  category: ProjectCategory,
  locale: string,
): string {
  const language = locale.startsWith('zh') ? 'zh' : 'en';
  return portfolioData.projectCategories[category][language];
}

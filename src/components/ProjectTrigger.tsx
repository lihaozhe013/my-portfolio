import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectDialog from '@/components/ProjectDialog';
import { getProjectMarkdownPreview } from '@/data/projectMarkdown';
import type { ProjectMeta } from '@/types/content';

export function getProjectText(
  project: ProjectMeta,
  translate: (key: string) => string,
) {
  return {
    title: translate(`projects.${project.id}.title`),
    description: translate(`projects.${project.id}.description`),
  };
}

interface ProjectTriggerProps {
  project: ProjectMeta;
  title: string;
  description: string;
  categoryLabel: string;
  technologiesLabel: string;
  closeLabel: string;
  featured?: boolean;
}

export default function ProjectTrigger({
  project,
  title,
  description,
  categoryLabel,
  technologiesLabel,
  closeLabel,
  featured = false,
}: ProjectTriggerProps) {
  const { t } = useTranslation();
  const markdownPreview = project.markdown
    ? getProjectMarkdownPreview(project.markdown)
    : undefined;
  const translatedHighlights = project.markdown
    ? t(`projects.${project.id}.fullProjectHighlights`, {
        returnObjects: true,
      })
    : undefined;
  const highlights = Array.isArray(translatedHighlights)
    ? translatedHighlights.filter(
        (highlight): highlight is string => typeof highlight === 'string',
      )
    : undefined;
  const fullProjectPreview =
    markdownPreview && highlights && highlights.length > 0
      ? {
          ...markdownPreview,
          highlights,
        }
      : undefined;
  const previewLabel = t('actions.previewProject');
  const trigger: ReactNode = featured ? (
    <button className="featured-project" type="button">
      <span className="project-meta">
        <span>{project.index}</span>
        <span className="project-meta-right">
          <span>{categoryLabel}</span>
          {project.markdown ? (
            <span className="project-full-project-mark">
              {t('labels.fullProject')}
            </span>
          ) : null}
        </span>
      </span>
      <span className="featured-project-title">{title}</span>
      <span className="body-copy featured-project-description">
        {description}
      </span>
      <span className="project-action">
        {previewLabel} <span aria-hidden="true">+</span>
      </span>
    </button>
  ) : (
    <button className="project-row" type="button">
      <span className="project-index">{project.index}</span>
      <span className="project-row-category">{categoryLabel}</span>
      <span className="project-row-title-group">
        <span className="project-row-title">{title}</span>
        {project.markdown ? (
          <span className="project-full-project-mark">
            {t('labels.fullProject')}
          </span>
        ) : null}
      </span>
      <span className="project-action">
        {previewLabel} <span aria-hidden="true">+</span>
      </span>
    </button>
  );

  return (
    <ProjectDialog
      project={project}
      title={title}
      description={description}
      categoryLabel={categoryLabel}
      technologiesLabel={technologiesLabel}
      closeLabel={closeLabel}
      trigger={trigger}
      actionLabel={`${previewLabel}: ${title}`}
      detailHref={project.markdown ? `/projects/${project.id}` : undefined}
      detailLabel={
        project.markdown ? t('actions.exploreFullProject') : undefined
      }
      fullProjectPreview={fullProjectPreview}
    />
  );
}

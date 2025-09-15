import type { ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import ProjectDialog from '@/components/ProjectDialog';
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
  const trigger: ReactNode = featured ? (
    <button className="featured-project" type="button">
      <span className="project-meta">
        <span>{project.index}</span>
        <span>{categoryLabel}</span>
      </span>
      <span className="featured-project-title">{title}</span>
      <span className="body-copy featured-project-description">
        {description}
      </span>
      <span className="project-action">
        {project.links.length > 0 ? '↗' : '—'}
      </span>
    </button>
  ) : (
    <button className="project-row" type="button">
      <span className="project-index">{project.index}</span>
      <span className="project-row-category">{categoryLabel}</span>
      <span className="project-row-title">{title}</span>
      <span className="project-action" aria-hidden="true">
        ↗
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
      actionLabel={`${t('actions.readProject')}: ${title}`}
      detailHref={project.markdown ? `/projects/${project.id}` : undefined}
      detailLabel={project.markdown ? t('actions.readDetails') : undefined}
    />
  );
}

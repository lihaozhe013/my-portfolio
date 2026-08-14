import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import type { ProjectMeta } from '@/types/content';

interface FullProjectPreview {
  readingMinutes: number;
  highlights: string[];
}

interface ProjectDialogProps {
  project: ProjectMeta;
  title: string;
  description: string;
  categoryLabel: string;
  technologiesLabel: string;
  closeLabel: string;
  trigger: ReactNode;
  actionLabel?: string;
  detailHref?: string;
  detailLabel?: string;
  fullProjectPreview?: FullProjectPreview;
}

export default function ProjectDialog({
  project,
  title,
  description,
  categoryLabel,
  technologiesLabel,
  closeLabel,
  trigger,
  actionLabel,
  detailHref,
  detailLabel,
  fullProjectPreview,
}: ProjectDialogProps) {
  const { t } = useTranslation();
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    setContainer(document.getElementById('ui-layer'));
  }, []);

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild aria-label={actionLabel}>
        {trigger}
      </Dialog.Trigger>
      <Dialog.Portal container={container ?? undefined}>
        <Dialog.Overlay className="dialog-overlay" />
        <Dialog.Content className="paper-dialog">
          <div className="dialog-heading">
            <p className="section-kicker">
              {project.index} / {categoryLabel}
            </p>
            <Dialog.Close asChild>
              <button className="text-button" type="button">
                {closeLabel}
              </button>
            </Dialog.Close>
          </div>
          <Dialog.Title className="dialog-title">{title}</Dialog.Title>
          <Dialog.Description className="body-copy dialog-description">
            {description}
          </Dialog.Description>
          {detailHref && detailLabel && fullProjectPreview ? (
            <Dialog.Close asChild>
              <Link className="dialog-full-project" to={detailHref}>
                <div className="dialog-full-project-heading">
                  <p className="section-kicker">{t('labels.fullProject')}</p>
                  <span className="dialog-full-project-time">
                    {t('labels.readingTime', {
                      count: fullProjectPreview.readingMinutes,
                    })}
                  </span>
                </div>
                <p className="dialog-full-project-lede">
                  {t('labels.fullProjectContents')}
                </p>
                <ul className="dialog-full-project-highlights">
                  {fullProjectPreview.highlights.map((highlight) => (
                    <li key={highlight}>{highlight}</li>
                  ))}
                </ul>
                <span className="dialog-full-project-action">
                  {detailLabel} <span aria-hidden="true">→</span>
                </span>
              </Link>
            </Dialog.Close>
          ) : null}
          <div className="dialog-section">
            <p className="section-kicker">{technologiesLabel}</p>
            <ul className="technology-list" aria-label={technologiesLabel}>
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
          {project.links.length > 0 ? (
            <div className="dialog-links">
              <p className="section-kicker">{t('labels.projectLinks')}</p>
              <div className="dialog-external-links">
                {project.links.map((link) => (
                  <a
                    className="ink-link"
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noreferrer"
                  >
                    {link.label} <span aria-hidden="true">↗</span>
                  </a>
                ))}
              </div>
            </div>
          ) : null}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

import * as Dialog from '@radix-ui/react-dialog';
import { useEffect, useState, type ReactNode } from 'react';
import { Link } from 'react-router-dom';
import type { ProjectMeta } from '@/types/content';

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
}: ProjectDialogProps) {
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
          <div className="dialog-section">
            <p className="section-kicker">{technologiesLabel}</p>
            <ul className="technology-list" aria-label={technologiesLabel}>
              {project.technologies.map((technology) => (
                <li key={technology}>{technology}</li>
              ))}
            </ul>
          </div>
          {detailHref && detailLabel ? (
            <div className="dialog-links">
              <Dialog.Close asChild>
                <Link className="ink-link" to={detailHref}>
                  {detailLabel} <span aria-hidden="true">↗</span>
                </Link>
              </Dialog.Close>
            </div>
          ) : null}
          <div className="dialog-links">
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
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

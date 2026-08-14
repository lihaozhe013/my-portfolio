import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useTranslation } from 'react-i18next';

type CopyState = 'idle' | 'copied' | 'failed';

interface MarkdownCodeBlockProps {
  children?: ReactNode;
}

export default function MarkdownCodeBlock({
  children,
}: MarkdownCodeBlockProps) {
  const { t } = useTranslation();
  const codeRef = useRef<HTMLPreElement>(null);
  const resetTimeoutRef = useRef<number | null>(null);
  const [copyState, setCopyState] = useState<CopyState>('idle');

  useEffect(() => {
    return () => {
      if (resetTimeoutRef.current !== null) {
        window.clearTimeout(resetTimeoutRef.current);
      }
    };
  }, []);

  const updateCopyState = (nextState: CopyState) => {
    setCopyState(nextState);

    if (resetTimeoutRef.current !== null) {
      window.clearTimeout(resetTimeoutRef.current);
    }

    resetTimeoutRef.current = window.setTimeout(() => {
      setCopyState('idle');
      resetTimeoutRef.current = null;
    }, 2000);
  };

  const handleCopy = async () => {
    const content = codeRef.current?.textContent ?? '';

    if (!navigator.clipboard?.writeText) {
      updateCopyState('failed');
      return;
    }

    try {
      await navigator.clipboard.writeText(content);
      updateCopyState('copied');
    } catch {
      updateCopyState('failed');
    }
  };

  const copyLabel =
    copyState === 'copied'
      ? t('actions.codeCopied')
      : copyState === 'failed'
        ? t('actions.copyFailed')
        : t('actions.copyCode');

  return (
    <div className="markdown-code-frame">
      <button
        className="markdown-code-copy"
        type="button"
        onClick={handleCopy}
        aria-label={copyLabel}
      >
        <span aria-live="polite">{copyLabel}</span>
      </button>
      <pre ref={codeRef}>{children}</pre>
    </div>
  );
}

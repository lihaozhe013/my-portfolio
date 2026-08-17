import { visit } from 'unist-util-visit';
import type { Plugin } from 'unified';
import type { Root, HTML, Paragraph, Text } from 'mdast';

const HTML_COMMENT_RE = /^<!--\s*([\s\S]*?)\s*-->$/;

/**
 * Remark plugin that converts HTML comment nodes into visible paragraph nodes.
 *
 * By default, markdown parsers treat `<!-- ... -->` as raw HTML and
 * react-markdown strips them. This plugin transforms them into visible
 * text so that descriptive comments (e.g. screenshot captions) are rendered.
 */
const remarkHtmlComments: Plugin<[], Root> = () => {
  return (tree) => {
    visit(tree, 'html', (node: HTML, index, parent) => {
      if (!parent || index === undefined) return;

      const match = node.value.match(HTML_COMMENT_RE);
      if (!match) return;

      const commentText = match[1].trim();
      if (!commentText) return;

      const textNode: Text = {
        type: 'text',
        value: commentText,
      };

      const paragraphNode: Paragraph = {
        type: 'paragraph',
        children: [textNode],
        data: {
          hProperties: {
            className: ['markdown-comment'],
          },
        },
      };

      parent.children.splice(index, 1, paragraphNode);
    });
  };
};

export default remarkHtmlComments;

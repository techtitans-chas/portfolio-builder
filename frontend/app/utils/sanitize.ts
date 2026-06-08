import DOMPurify from 'dompurify';

export function sanitizeHtml(html: string): string {
  if (import.meta.server) return html;
  return DOMPurify.sanitize(html);
}

/** Filter out tags prefixed with `::` — used for internal organisation only. */
export function visibleTags(tags: string[]): string[] {
  return tags.filter(t => !t.startsWith('::'));
}

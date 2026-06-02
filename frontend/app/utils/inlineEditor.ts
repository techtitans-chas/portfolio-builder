import type { InjectionKey } from 'vue';

export interface InlineEditorContext {
  blockId: string;
  blockContent: Record<string, unknown>;
  setField: (path: string, value: unknown) => void;
}

export const inlineEditorKey = Symbol() as InjectionKey<InlineEditorContext>;

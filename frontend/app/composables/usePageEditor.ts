import type { Block } from '@portfolio-builder/shared/types';
import { setPath } from '~/utils/dotPath';

export function usePageEditor() {
  // New blocks queued to be created on save — full Block objects with temporary pending IDs
  const pendingNewBlocks = useState<Block[]>('editor-pending-new-blocks', () => []);

  // Block IDs queued for deletion on save
  const pendingDeletions = useState<Set<string>>('editor-pending-deletions', () => new Set());

  // Content edits for existing blocks (blockId → patched content)
  const pendingContentEdits = useState<Record<string, Record<string, unknown>>>(
    'editor-pending-content-edits',
    () => ({}),
  );

  // Name edits for existing blocks (blockId → name)
  const pendingNameEdits = useState<Record<string, string | null>>(
    'editor-pending-name-edits',
    () => ({}),
  );

  function addPendingBlock(type: string, content: Record<string, unknown>): Block {
    const newBlock: Block = {
      id: `pending-${Date.now()}-${Math.random()}`,
      pageId: '',
      type,
      name: null,
      sortOrder: 0,
      content,
      styles: {},
      isVisible: true,
      isMandatory: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    pendingNewBlocks.value = [...pendingNewBlocks.value, newBlock];
    return newBlock;
  }

  function queueDeletion(blockId: string) {
    pendingDeletions.value = new Set([...pendingDeletions.value, blockId]);
  }

  function setBlockContent(blockId: string, content: Record<string, unknown>) {
    pendingContentEdits.value = { ...pendingContentEdits.value, [blockId]: content };
  }

  function setBlockField(
    blockId: string,
    path: string,
    value: unknown,
    currentContent: Record<string, unknown>,
  ) {
    const existing = pendingContentEdits.value[blockId] ?? currentContent;
    const merged = setPath({ ...currentContent, ...existing }, path, value);
    pendingContentEdits.value = { ...pendingContentEdits.value, [blockId]: merged };
  }

  function setBlockName(blockId: string, name: string | null, liveBlock?: { name: string | null }) {
    if (liveBlock) liveBlock.name = name;
    pendingNameEdits.value = { ...pendingNameEdits.value, [blockId]: name };
  }

  function resetPending() {
    pendingNewBlocks.value = [];
    pendingContentEdits.value = {};
    pendingNameEdits.value = {};
    pendingDeletions.value = new Set();
  }

  const hasPendingChanges = computed(
    () =>
      pendingNewBlocks.value.length > 0 ||
      Object.keys(pendingContentEdits.value).length > 0 ||
      Object.keys(pendingNameEdits.value).length > 0 ||
      pendingDeletions.value.size > 0,
  );

  return {
    pendingNewBlocks,
    pendingDeletions,
    pendingContentEdits,
    pendingNameEdits,
    hasPendingChanges,
    addPendingBlock,
    queueDeletion,
    setBlockContent,
    setBlockField,
    setBlockName,
    resetPending,
  };
}

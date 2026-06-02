import type { Block } from '@portfolio-builder/shared/types';

export function useSelectedBlock() {
  const selectedBlock = useState<Block | null>('selected-block', () => null);

  function selectBlock(block: Block) {
    selectedBlock.value = block;
  }

  function clearSelection() {
    selectedBlock.value = null;
  }

  return { selectedBlock, selectBlock, clearSelection };
}

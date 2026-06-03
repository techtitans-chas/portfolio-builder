import Sortable from 'sortablejs';
import type { WidgetType } from '~/components/blocks/Header.vue';

type ZoneKey = 'left' | 'center' | 'right' | 'top';

interface SlotVisibility {
  showLogo: boolean;
  showNav: boolean;
  showCta: boolean;
  showSocials: boolean;
  showColorModeToggle: boolean;
}

interface SlotOrders {
  leftOrder: WidgetType[];
  centerOrder: WidgetType[];
  rightOrder: WidgetType[];
  topOrder: WidgetType[];
  layout: string;
}

export function useHeaderSlots(
  orders: ComputedRef<SlotOrders>,
  visibility: ComputedRef<SlotVisibility>,
  onReorder?: (slots: SlotOrders) => void,
) {
  function filterVisible(order: WidgetType[]): WidgetType[] {
    const v = visibility.value;
    return order.filter(w => {
      if (w === 'logo')    return v.showLogo;
      if (w === 'nav')     return v.showNav;
      if (w === 'cta')     return v.showCta;
      if (w === 'socials') return v.showSocials;
      if (w === 'toggle')  return v.showColorModeToggle;
      return true;
    });
  }

  function buildZones(o: SlotOrders): Record<ZoneKey, WidgetType[]> {
    const seen = new Set<WidgetType>();
    const dedup = (order: WidgetType[]) =>
      filterVisible([...order].filter(w => !seen.has(w) && (seen.add(w), true)));
    if (o.layout === 'stacked') {
      const top    = dedup(o.topOrder);
      const left   = dedup(o.leftOrder);
      const center = dedup(o.centerOrder);
      const right  = dedup(o.rightOrder);
      return { top, left, center, right };
    } else {
      const left   = dedup(o.leftOrder);
      const center = dedup(o.centerOrder);
      const right  = dedup(o.rightOrder);
      const top    = filterVisible(o.topOrder.filter(w => !seen.has(w)));
      return { top, left, center, right };
    }
  }

  const zones = reactive<Record<ZoneKey, WidgetType[]>>(buildZones(orders.value));

  // Whether we're currently mid-drag — blocks external prop syncs
  const isDragging = ref(false);

  watch(orders, ({ leftOrder, centerOrder, rightOrder, topOrder, layout }) => {
    if (isDragging.value) return;
    const seen = new Set<WidgetType>();
    const dedup = (order: WidgetType[]) =>
      filterVisible([...order].filter(w => !seen.has(w) && (seen.add(w), true)));

    if (layout === 'stacked') {
      // In stacked mode: top zone is active. Any widget already in top
      // should not also appear in bottom zones.
      zones.top    = dedup([...topOrder]);
      zones.left   = dedup([...leftOrder]);
      zones.center = dedup([...centerOrder]);
      zones.right  = dedup([...rightOrder]);
    } else {
      // In single mode: top zone is not rendered. Don't let topOrder
      // steal widgets from the bottom zones.
      zones.left   = dedup([...leftOrder]);
      zones.center = dedup([...centerOrder]);
      zones.right  = dedup([...rightOrder]);
      zones.top    = filterVisible([...topOrder].filter(w => !seen.has(w)));
    }
  });

  watch(visibility, () => {
    if (isDragging.value) return;
    zones.left   = filterVisible(zones.left);
    zones.center = filterVisible(zones.center);
    zones.right  = filterVisible(zones.right);
    zones.top    = filterVisible(zones.top);
  });

  // SortableJS instances — one per zone element
  const sortables: Sortable[] = [];

  // Map from DOM element to zone key, populated when we mount sortables
  const elToZone = new Map<HTMLElement, ZoneKey>();

  function initSortable(el: HTMLElement, zone: ZoneKey) {
    elToZone.set(el, zone);

    const instance = Sortable.create(el, {
      group: 'header-widgets',
      animation: 150,
      ghostClass: 'header-sortable-ghost',
      chosenClass: 'header-sortable-chosen',
      dragClass: 'header-sortable-drag',

      onStart() {
        isDragging.value = true;
      },

      onEnd(evt) {
        isDragging.value = false;

        // Read the final order directly from the DOM — SortableJS has already
        // moved the nodes, so the DOM is the source of truth at this point.
        // We can't rely on zones.* because Vue hasn't re-rendered yet.
        function readZone(zoneKey: ZoneKey): WidgetType[] {
          const el = [...elToZone.entries()].find(([, k]) => k === zoneKey)?.[0];
          if (!el) return [...zones[zoneKey]];
          return [...el.querySelectorAll('[data-widget]')]
            .map(node => (node as HTMLElement).dataset.widget as WidgetType)
            .filter(Boolean);
        }

        const fromZone = elToZone.get(evt.from as HTMLElement);
        const toZone   = elToZone.get(evt.to as HTMLElement);
        if (!fromZone || !toZone) return;

        nextTick(() => {
          zones.left   = readZone('left');
          zones.center = readZone('center');
          zones.right  = readZone('right');
          zones.top    = readZone('top');

          onReorder?.({
            leftOrder:   zones.left,
            centerOrder: zones.center,
            rightOrder:  zones.right,
            topOrder:    zones.top,
          });
        });
      },
    });

    sortables.push(instance);
  }

  function destroySortables() {
    sortables.forEach(s => s.destroy());
    sortables.length = 0;
    elToZone.clear();
  }

  const slotOrder = computed(() => ({
    leftOrder:   [...zones.left],
    centerOrder: [...zones.center],
    rightOrder:  [...zones.right],
    topOrder:    [...zones.top],
  }));

  return { zones, slotOrder, initSortable, destroySortables, isDragging };
}

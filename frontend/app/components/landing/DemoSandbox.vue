<script setup lang="ts">
import { VueDraggable } from 'vue-draggable-plus';

interface DemoBlock {
  id: string;
  type: 'hero' | 'skills' | 'testimonial';
  label: string;
  icon: string;
}

const blocks = ref<DemoBlock[]>([
  { id: 'hero', type: 'hero', label: 'Hero', icon: 'i-lucide-layout-template' },
  { id: 'skills', type: 'skills', label: 'Skills', icon: 'i-lucide-bar-chart-2' },
  { id: 'testimonial', type: 'testimonial', label: 'Testimonial', icon: 'i-lucide-quote' },
]);

const dragging = ref(false);
const demoDark = ref(false);

const skills = [
  { name: 'TypeScript', level: 92, category: 'Frontend' },
  { name: 'Vue / Nuxt', level: 88, category: 'Frontend' },
  { name: 'Node.js', level: 80, category: 'Backend' },
  { name: 'PostgreSQL', level: 74, category: 'Backend' },
];

const animated = ref(false);
const sandboxRef = ref<HTMLElement | null>(null);

onMounted(() => {
  if (!sandboxRef.value) return;
  const observer = new IntersectionObserver(
    entries => {
      if (entries[0]?.isIntersecting) {
        animated.value = true;
        observer.disconnect();
      }
    },
    { threshold: 0.2 },
  );
  observer.observe(sandboxRef.value);
});

// All color tokens derived from the dark toggle — keeps the template clean
const t = computed(() =>
  demoDark.value
    ? {
        canvasBg: '#0b1a17',
        headerBg: '#0b1a17',
        headerBorder: '#1a2e28',
        headerText: '#f0faf8',
        headerNav: '#7ab5a8',
        heroBg: 'linear-gradient(135deg, #0d2b24 0%, #0b1a17 60%, #0a2020 100%)',
        heroHeading: '#f0faf8',
        heroSub: '#7ab5a8',
        heroBtn1Bg: '#00CC99',
        heroBtn1Color: '#fff',
        heroBtn2Border: '#088b8b',
        heroBtn2Color: '#00CC99',
        skillsBg: '#0b1a17',
        skillsHeading: '#f0faf8',
        skillsLabel: '#d1faf0',
        skillsPct: '#7ab5a8',
        skillsTrack: '#1a3830',
        testimonialBg: '#0d201c',
        testimonialCard: '#132820',
        testimonialCardShadow: '0 1px 3px rgba(0,0,0,0.3), 0 4px 16px rgba(0,0,0,0.2)',
        testimonialText: '#9fd4c8',
        testimonialAuthor: '#f0faf8',
        testimonialRole: '#7ab5a8',
        avatarBg: '#1a3830',
        avatarColor: '#00CC99',
        dragHandle: 'rgba(11,26,23,0.9)',
        dragHandleBorder: '#1a3830',
        dragHandleColor: '#7ab5a8',
        dragDotFill: '#7ab5a8',
      }
    : {
        canvasBg: '#ffffff',
        headerBg: '#ffffff',
        headerBorder: '#f1f5f9',
        headerText: '#0f172a',
        headerNav: '#64748b',
        heroBg: 'linear-gradient(135deg, #e6fff8 0%, #f4fdfb 60%, #e8faf5 100%)',
        heroHeading: '#0f172a',
        heroSub: '#475569',
        heroBtn1Bg: '#00CC99',
        heroBtn1Color: '#fff',
        heroBtn2Border: '#7de8d0',
        heroBtn2Color: '#088b8b',
        skillsBg: '#ffffff',
        skillsHeading: '#0f172a',
        skillsLabel: '#1e293b',
        skillsPct: '#94a3b8',
        skillsTrack: '#ccf5ec',
        testimonialBg: '#f0fdf9',
        testimonialCard: '#ffffff',
        testimonialCardShadow: '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        testimonialText: '#334155',
        testimonialAuthor: '#0f172a',
        testimonialRole: '#94a3b8',
        avatarBg: '#ccf5ec',
        avatarColor: '#088b8b',
        dragHandle: 'rgba(255,255,255,0.95)',
        dragHandleBorder: '#e2e8f0',
        dragHandleColor: '#475569',
        dragDotFill: '#94a3b8',
      },
);
</script>

<template>
  <section ref="sandboxRef" class="py-24 px-4">
    <!-- Section heading -->
    <div class="text-center mb-14">
      <p
        class="text-xs font-semibold uppercase tracking-widest mb-3"
        style="color: var(--ui-primary)"
      >
        Interactive Preview
      </p>
      <h2 class="text-4xl font-bold tracking-tight">Your project, built block by block</h2>
      <p class="mt-4 text-lg max-w-xl mx-auto" style="color: var(--ui-text-muted)">
        Drag and drop sections to rearrange your layout in real time — no code, no friction.
      </p>
    </div>

    <div class="max-w-4xl mx-auto">
      <!-- Browser chrome -->
      <div
        class="rounded-2xl overflow-hidden"
        style="
          box-shadow:
            0 25px 60px -12px rgba(0, 0, 0, 0.18),
            0 0 0 1px rgba(0, 0, 0, 0.06);
        "
      >
        <!-- Chrome top bar -->
        <div
          class="flex items-center gap-3 px-4 py-3 border-b"
          :style="{
            backgroundColor: 'var(--ui-bg-elevated)',
            borderColor: 'var(--ui-border)',
          }"
        >
          <!-- Traffic lights -->
          <div class="flex gap-1.5 shrink-0">
            <div class="w-3 h-3 rounded-full bg-red-400/80" />
            <div class="w-3 h-3 rounded-full bg-yellow-400/80" />
            <div class="w-3 h-3 rounded-full bg-green-400/80" />
          </div>
          <!-- URL bar -->
          <div
            class="flex-1 mx-2 rounded-md px-3 py-1 text-xs text-center truncate"
            :style="{
              backgroundColor: 'var(--ui-bg)',
              color: 'var(--ui-text-muted)',
              border: '1px solid var(--ui-border)',
            }"
          >
            alexjohnson.app
          </div>
          <!-- Dark mode toggle -->
          <button
            class="shrink-0 w-7 h-7 rounded-md flex items-center justify-center transition-colors"
            :style="{
              backgroundColor: demoDark ? '#1a3830' : '#e6fff8',
              color: demoDark ? '#00CC99' : '#088b8b',
            }"
            :aria-label="demoDark ? 'Switch to light mode' : 'Switch to dark mode'"
            @click="demoDark = !demoDark"
          >
            <UIcon :name="demoDark ? 'i-lucide-sun' : 'i-lucide-moon'" class="w-3.5 h-3.5" />
          </button>
        </div>

        <!-- Portfolio canvas -->
        <div
          class="overflow-y-auto overflow-x-hidden transition-colors duration-300"
          :style="{ maxHeight: '560px', background: t.canvasBg }"
        >
          <!-- Mini site header -->
          <div
            class="transition-colors duration-300"
            :style="{
              borderBottom: `1px solid ${t.headerBorder}`,
              padding: '12px 24px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              position: 'sticky',
              top: '0',
              background: t.headerBg,
              zIndex: '10',
            }"
          >
            <span :style="{ fontWeight: '700', fontSize: '14px', color: t.headerText }">
              Alex Johnson
            </span>
            <div :style="{ display: 'flex', gap: '20px', fontSize: '12px', color: t.headerNav }">
              <span>About</span>
              <span>Projects</span>
              <span>Contact</span>
            </div>
          </div>

          <!-- Draggable blocks -->
          <VueDraggable
            v-model="blocks"
            handle=".demo-drag-handle"
            :animation="200"
            ghost-class="demo-ghost"
            drag-class="demo-dragging"
            @start="dragging = true"
            @end="dragging = false"
          >
            <div
              v-for="block in blocks"
              :key="block.id"
              class="demo-block-wrap group relative"
              :class="{ 'cursor-grabbing': dragging }"
            >
              <!-- Drag handle -->
              <div
                class="demo-drag-handle"
                :style="{
                  position: 'absolute',
                  top: '10px',
                  right: '10px',
                  zIndex: '20',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  padding: '4px 10px',
                  background: t.dragHandle,
                  border: `1px solid ${t.dragHandleBorder}`,
                  borderRadius: '8px',
                  fontSize: '11px',
                  fontWeight: '500',
                  color: t.dragHandleColor,
                  cursor: 'grab',
                  boxShadow: '0 1px 4px rgba(0,0,0,0.08)',
                  opacity: '0',
                  transition: 'opacity 150ms',
                  userSelect: 'none',
                }"
              >
                <svg width="10" height="14" viewBox="0 0 10 14" fill="none">
                  <circle cx="2" cy="2" r="1.5" :fill="t.dragDotFill" />
                  <circle cx="8" cy="2" r="1.5" :fill="t.dragDotFill" />
                  <circle cx="2" cy="7" r="1.5" :fill="t.dragDotFill" />
                  <circle cx="8" cy="7" r="1.5" :fill="t.dragDotFill" />
                  <circle cx="2" cy="12" r="1.5" :fill="t.dragDotFill" />
                  <circle cx="8" cy="12" r="1.5" :fill="t.dragDotFill" />
                </svg>
                Drag
              </div>

              <!-- Hero block -->
              <div
                v-if="block.type === 'hero'"
                class="transition-colors duration-300"
                :style="{ padding: '56px 32px', textAlign: 'center', background: t.heroBg }"
              >
                <h1
                  :style="{
                    fontSize: '36px',
                    fontWeight: '800',
                    color: t.heroHeading,
                    lineHeight: '1.2',
                    margin: '0 0 12px',
                  }"
                >
                  Alex Johnson
                </h1>
                <p
                  :style="{
                    fontSize: '15px',
                    color: t.heroSub,
                    maxWidth: '380px',
                    margin: '0 auto 24px',
                    lineHeight: '1.6',
                  }"
                >
                  Full-Stack Developer &amp; Open Source Contributor
                </p>
                <div style="display: flex; gap: 12px; justify-content: center">
                  <a
                    :style="{
                      padding: '10px 22px',
                      background: t.heroBtn1Bg,
                      color: t.heroBtn1Color,
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: '600',
                      textDecoration: 'none',
                    }"
                    href="#"
                    @click.prevent
                  >
                    View Projects
                  </a>
                  <a
                    :style="{
                      padding: '10px 22px',
                      border: `1.5px solid ${t.heroBtn2Border}`,
                      color: t.heroBtn2Color,
                      borderRadius: '10px',
                      fontSize: '13px',
                      fontWeight: '600',
                      textDecoration: 'none',
                    }"
                    href="#"
                    @click.prevent
                  >
                    Contact Me
                  </a>
                </div>
              </div>

              <!-- Skills block -->
              <div
                v-else-if="block.type === 'skills'"
                class="transition-colors duration-300"
                :style="{ padding: '40px 32px', background: t.skillsBg }"
              >
                <h2
                  :style="{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: t.skillsHeading,
                    margin: '0 0 24px',
                  }"
                >
                  Skills &amp; Expertise
                </h2>
                <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px 40px">
                  <div v-for="skill in skills" :key="skill.name">
                    <div
                      style="
                        display: flex;
                        justify-content: space-between;
                        align-items: center;
                        margin-bottom: 6px;
                      "
                    >
                      <span :style="{ fontSize: '13px', fontWeight: '500', color: t.skillsLabel }">
                        {{ skill.name }}
                      </span>
                      <span
                        :style="{
                          fontSize: '11px',
                          color: t.skillsPct,
                          fontVariantNumeric: 'tabular-nums',
                        }"
                      >
                        {{ skill.level }}%
                      </span>
                    </div>
                    <div
                      :style="{
                        height: '6px',
                        borderRadius: '9999px',
                        background: t.skillsTrack,
                        overflow: 'hidden',
                      }"
                    >
                      <div
                        :style="{
                          height: '100%',
                          borderRadius: '9999px',
                          background: 'linear-gradient(to right, #00CC99, #088b8b)',
                          transition: 'width 0.75s cubic-bezier(0.4, 0, 0.2, 1)',
                          width: animated ? skill.level + '%' : '0%',
                        }"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Testimonial block -->
              <div
                v-else-if="block.type === 'testimonial'"
                class="transition-colors duration-300"
                :style="{ padding: '40px 32px', background: t.testimonialBg }"
              >
                <h2
                  :style="{
                    fontSize: '22px',
                    fontWeight: '700',
                    color: t.skillsHeading,
                    margin: '0 0 24px',
                    textAlign: 'center',
                  }"
                >
                  What people say
                </h2>
                <div
                  :style="{
                    background: t.testimonialCard,
                    borderRadius: '16px',
                    padding: '28px 28px 24px',
                    maxWidth: '520px',
                    margin: '0 auto',
                    boxShadow: t.testimonialCardShadow,
                  }"
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    style="opacity: 0.3; margin-bottom: 12px"
                  >
                    <path
                      d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
                      fill="#00CC99"
                    />
                    <path
                      d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                      fill="#00CC99"
                    />
                  </svg>
                  <p
                    :style="{
                      fontSize: '14px',
                      lineHeight: '1.7',
                      color: t.testimonialText,
                      margin: '0 0 20px',
                    }"
                  >
                    "Working with Alex was an absolute pleasure. The attention to detail and clean
                    code made our product launch a huge success."
                  </p>
                  <div style="display: flex; align-items: center; gap: 10px">
                    <div
                      :style="{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: t.avatarBg,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '13px',
                        fontWeight: '700',
                        color: t.avatarColor,
                        flexShrink: '0',
                      }"
                    >
                      S
                    </div>
                    <div>
                      <p
                        :style="{
                          fontSize: '13px',
                          fontWeight: '600',
                          color: t.testimonialAuthor,
                          margin: '0',
                        }"
                      >
                        Sarah Chen
                      </p>
                      <p :style="{ fontSize: '12px', color: t.testimonialRole, margin: '0' }">
                        VP of Product at Acme Co
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </VueDraggable>
        </div>
      </div>
    </div>

    <!-- Drag hint -->
    <p
      class="text-center text-sm mt-6 flex items-center justify-center gap-2"
      style="color: var(--ui-text-muted)"
    >
      <UIcon name="i-lucide-grip-vertical" class="w-4 h-4" />
      Hover any block and drag to reorder
    </p>
  </section>
</template>

<style scoped>
.demo-block-wrap:hover .demo-drag-handle {
  opacity: 1 !important;
}

.demo-ghost {
  opacity: 0.35;
  background: #ccf5ec !important;
}

.demo-dragging {
  box-shadow: 0 8px 30px rgba(0, 204, 153, 0.25);
}
</style>

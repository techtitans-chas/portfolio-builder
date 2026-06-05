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
        class="flex-1 min-w-0 rounded-2xl overflow-hidden shadow-2xl ring-1"
        :style="{ ringColor: 'var(--ui-border)' }"
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
            alexjohnson.portfolio.app
          </div>
        </div>

        <!-- Portfolio canvas — always light so it matches a real portfolio -->
        <div
          class="overflow-y-auto overflow-x-hidden"
          style="max-height: 560px; background: #ffffff; color: #0f172a"
        >
          <!-- Mini site header -->
          <div
            style="
              border-bottom: 1px solid #f1f5f9;
              padding: 12px 24px;
              display: flex;
              align-items: center;
              justify-content: space-between;
              position: sticky;
              top: 0;
              background: #ffffff;
              z-index: 10;
            "
          >
            <span style="font-weight: 700; font-size: 14px; color: #0f172a">Alex Johnson</span>
            <div style="display: flex; gap: 20px; font-size: 12px; color: #64748b">
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
              <!-- Drag handle — appears on hover -->
              <div
                class="demo-drag-handle"
                style="
                  position: absolute;
                  top: 10px;
                  right: 10px;
                  z-index: 20;
                  display: flex;
                  align-items: center;
                  gap: 4px;
                  padding: 4px 10px;
                  background: rgba(255, 255, 255, 0.95);
                  border: 1px solid #e2e8f0;
                  border-radius: 8px;
                  font-size: 11px;
                  font-weight: 500;
                  color: #475569;
                  cursor: grab;
                  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.08);
                  opacity: 0;
                  transition: opacity 150ms;
                  user-select: none;
                "
              >
                <svg
                  width="10"
                  height="14"
                  viewBox="0 0 10 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle cx="2" cy="2" r="1.5" fill="#94a3b8" />
                  <circle cx="8" cy="2" r="1.5" fill="#94a3b8" />
                  <circle cx="2" cy="7" r="1.5" fill="#94a3b8" />
                  <circle cx="8" cy="7" r="1.5" fill="#94a3b8" />
                  <circle cx="2" cy="12" r="1.5" fill="#94a3b8" />
                  <circle cx="8" cy="12" r="1.5" fill="#94a3b8" />
                </svg>
                Drag
              </div>

              <!-- Hero block -->
              <div
                v-if="block.type === 'hero'"
                style="
                  padding: 56px 32px;
                  text-align: center;
                  background: linear-gradient(135deg, #eef2ff 0%, #f8fafc 60%, #f0fdf4 100%);
                "
              >
                <h1
                  style="
                    font-size: 36px;
                    font-weight: 800;
                    color: #0f172a;
                    line-height: 1.2;
                    margin: 0 0 12px;
                  "
                >
                  Alex Johnson
                </h1>
                <p
                  style="
                    font-size: 15px;
                    color: #475569;
                    max-width: 380px;
                    margin: 0 auto 24px;
                    line-height: 1.6;
                  "
                >
                  Full-Stack Developer &amp; Open Source Contributor
                </p>
                <div style="display: flex; gap: 12px; justify-content: center">
                  <a
                    style="
                      padding: 10px 22px;
                      background: #6366f1;
                      color: #fff;
                      border-radius: 10px;
                      font-size: 13px;
                      font-weight: 600;
                      text-decoration: none;
                    "
                    href="#"
                    @click.prevent
                  >
                    View Projects
                  </a>
                  <a
                    style="
                      padding: 10px 22px;
                      border: 1.5px solid #c7d2fe;
                      color: #6366f1;
                      border-radius: 10px;
                      font-size: 13px;
                      font-weight: 600;
                      text-decoration: none;
                    "
                    href="#"
                    @click.prevent
                  >
                    Contact Me
                  </a>
                </div>
              </div>

              <!-- Skills block -->
              <div v-else-if="block.type === 'skills'" style="padding: 40px 32px; background: #fff">
                <h2 style="font-size: 22px; font-weight: 700; color: #0f172a; margin: 0 0 24px">
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
                      <span style="font-size: 13px; font-weight: 500; color: #1e293b">{{
                        skill.name
                      }}</span>
                      <span
                        style="font-size: 11px; color: #94a3b8; font-variant-numeric: tabular-nums"
                        >{{ skill.level }}%</span
                      >
                    </div>
                    <div
                      style="
                        height: 6px;
                        border-radius: 9999px;
                        background: #e0e7ff;
                        overflow: hidden;
                      "
                    >
                      <div
                        style="
                          height: 100%;
                          border-radius: 9999px;
                          background: linear-gradient(to right, #6366f1, #818cf8);
                          transition: width 0.75s cubic-bezier(0.4, 0, 0.2, 1);
                        "
                        :style="{ width: animated ? skill.level + '%' : '0%' }"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <!-- Testimonial block -->
              <div
                v-else-if="block.type === 'testimonial'"
                style="padding: 40px 32px; background: #f8fafc"
              >
                <h2
                  style="
                    font-size: 22px;
                    font-weight: 700;
                    color: #0f172a;
                    margin: 0 0 24px;
                    text-align: center;
                  "
                >
                  What people say
                </h2>
                <div
                  style="
                    background: #fff;
                    border-radius: 16px;
                    padding: 28px 28px 24px;
                    max-width: 520px;
                    margin: 0 auto;
                    box-shadow:
                      0 1px 3px rgba(0, 0, 0, 0.06),
                      0 4px 16px rgba(0, 0, 0, 0.04);
                  "
                >
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    style="opacity: 0.2; margin-bottom: 12px; color: #6366f1"
                  >
                    <path
                      d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"
                      fill="#6366f1"
                    />
                    <path
                      d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"
                      fill="#6366f1"
                    />
                  </svg>
                  <p style="font-size: 14px; line-height: 1.7; color: #334155; margin: 0 0 20px">
                    "Working with Alex was an absolute pleasure. The attention to detail and clean
                    code made our product launch a huge success."
                  </p>
                  <div style="display: flex; align-items: center; gap: 10px">
                    <div
                      style="
                        width: 36px;
                        height: 36px;
                        border-radius: 50%;
                        background: #e0e7ff;
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        font-size: 13px;
                        font-weight: 700;
                        color: #6366f1;
                        flex-shrink: 0;
                      "
                    >
                      S
                    </div>
                    <div>
                      <p style="font-size: 13px; font-weight: 600; color: #0f172a; margin: 0">
                        Sarah Chen
                      </p>
                      <p style="font-size: 12px; color: #94a3b8; margin: 0">
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
  background: #e0e7ff !important;
}

.demo-dragging {
  box-shadow: 0 8px 30px rgba(99, 102, 241, 0.2);
}
</style>

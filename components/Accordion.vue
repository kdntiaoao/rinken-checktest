<template>
  <div>
    <div class="cursor-pointer" @click="openPanel($event)">
      <div class="mb-2">
        <slot name="accordion-title" />
      </div>
      <div class="h-0 mb-2 overflow-hidden transition-[height] duration-300 cursor-default js-panel" @click.stop>
        <div class="js-panelConts">
          <slot name="accordion-content" />
        </div>
      </div>
      <div>
        <!-- 矢印アイコン -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 20 20"
          class="w-4 h-4 md:w-6 md:h-6 mx-auto transition delay-300 duration-300 rotate-90 text-slate-400"
        >
          <path fill="none" d="M0 0h20v20H0z" />
          <g
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            fill-rule="evenodd"
            fill="currentColor"
          >
            <path
              filter="none"
              d="m6.504 1.53 8.486 8.486-1.414 1.414L5.09 2.944 6.504 1.53Z"
              data-centerx="10.04"
              data-centery="6.48"
            />
            <path filter="none" d="m6.504 18.51 8.486-8.486-1.414-1.414-8.486 8.486 1.414 1.414Z" />
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openPanel(ev) {
      const target = ev.currentTarget
      // const nextEl = target.nextElementSibling;
      const panel = target.querySelector('.js-panel')
      const panelHeight = target.querySelector('.js-panelConts').offsetHeight
      // アコーディオンパネルが閉じているとき
      if (panel.classList.contains('h-0')) {
        // パネルを開く
        panel.classList.remove('h-0')
        panel.style.height = `${panelHeight}px`
        // 矢印アイコンを180度回転させる
        target.querySelector('svg').classList.add('-rotate-90')
        target.querySelector('svg').classList.remove('rotate-90')
      } else {
        // パネルを閉じる
        panel.classList.add('h-0')
        panel.removeAttribute('style')
        // 矢印アイコンを180度回転させる
        target.querySelector('svg').classList.add('rotate-90')
        target.querySelector('svg').classList.remove('-rotate-90')
      }
    },
  },
}
</script>

<template>
  <div>
    <div
      class="flex items-center justify-between cursor-pointer"
      @click="openPanel($event)"
    >
      <div class="">
        <slot name="accordion-title" />
      </div>
      <div>
        <!-- 矢印アイコン -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20px"
          height="20px"
          viewBox="0 0 20 20"
          class="w-4 h-4 md:w-6 md:h-6 ml-2 transition duration-300 rotate-90"
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
            <path
              filter="none"
              d="m6.504 18.51 8.486-8.486-1.414-1.414-8.486 8.486 1.414 1.414Z"
            />
          </g>
        </svg>
      </div>
    </div>
    <div class="h-0 overflow-hidden transition-[height] duration-300">
      <div class="panel pt-5">
        <slot name="accordion-content" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    openPanel(ev) {
      const target = ev.currentTarget;
      const nextEl = target.nextElementSibling;
      const panelHeight = nextEl.querySelector(".panel").offsetHeight;
      // アコーディオンパネルが閉じているとき
      if (nextEl.classList.contains("h-0")) {
        // パネルを開く
        nextEl.classList.remove("h-0");
        nextEl.style.height = `${panelHeight}px`;
        // 矢印アイコンを180度回転させる
        target.querySelector("svg").classList.add("-rotate-90");
        target.querySelector("svg").classList.remove("rotate-90");
      } else {
        // パネルを閉じる
        nextEl.classList.add("h-0");
        nextEl.removeAttribute("style");
        // 矢印アイコンを180度回転させる
        target.querySelector("svg").classList.add("rotate-90");
        target.querySelector("svg").classList.remove("-rotate-90");
      }
    },
  },
};
</script>

<template>
  <div class="wrapper">
    <ContentTitle title="間違えた問題">
      <template v-slot:addElement>
        <div class="relative z-10">
          <button
            @click.stop="isInfo = !isInfo"
            class="border-2 border-slate-400 rounded-full w-5 h-5 text-center text-sm text-slate-400 flex items-center justify-center"
          >
            <div>i</div>
          </button>
          <div
            v-show="isInfo"
            class="absolute top-1/2 left-0 translate-x-[-104%] -translate-y-1/2 border-2 bg-white w-40 xs:w-60 md:w-96 shadow p-2 text-xs xs:text-sm"
          >
            間違った問題のデータはsessionStorageを使って保存しているため、ウィンドウ
            (タブ) を閉じたときに保存されたデータは削除されます。
          </div>
        </div>
      </template>
    </ContentTitle>
    <p v-if="storageData.length === 0">間違えた問題はありません。</p>
    <div v-else class="p-2 rounded border shadow">
      <ul>
        <li
          class="border-x border-t last:border-b p-2"
          v-for="d in storageData"
          :key="d.id"
        >
          <Accordion>
            <template v-slot:accordion-title>
              <!-- 問題文 -->
              <div>
                <span class="sm:text-xl">
                  {{ d.time.replace(/([0-9]{2})([A-Z]{2})/, convertTime) }} 問題
                  {{ d.questionNum }}
                </span>
                <br />
                {{ d.question }}
              </div>
            </template>
            <template v-slot:accordion-content>
              <div>
                <!-- 選択肢 -->
                <ul>
                  <li
                    v-for="(o, index) in d.options"
                    :key="index"
                    class="list-btn pointer-events-none select-text mb-3"
                    :class="{ 'text-red-400': d.answer.includes(index + 1) }"
                  >
                    {{ o }}
                  </li>
                </ul>
                <!-- 問題に関する画像 -->
                <div v-if="d.imgName !== false" class="max-w-lg mx-auto">
                  <img
                    :src="require(`~/assets/images/${d.time}/${d.imgName}`)"
                    alt="問題についての画像"
                  />
                </div>
              </div>
            </template>
          </Accordion>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      storageData: [],
      isInfo: false,
    };
  },
  mounted() {
    this.storageData = JSON.parse(sessionStorage.getItem("mistake")) || [];
    document.body.addEventListener("click", () => (this.isInfo = false));
  },
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
    convertTime(match, p1, p2) {
      return `第${p1}回 ${p2 === "AM" ? "午前" : "午後"}`;
    },
  },
};
</script>

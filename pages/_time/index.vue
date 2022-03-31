<template>
  <div>
    <!-- 問題一覧の画面(○〜○問目を解くか選択する画面) -->
    <div class="wrapper">
      <h2 class="border-b-2 border-sky-600 mb-10 md:mb-20 pb-1 xs:pb-2 md:pb-4 text-base xs:text-xl md:text-2xl">
        {{ time.replace(/([0-9]{2})([A-Z]{2})/, convertTime) }}
      </h2>
      <ul class="grid grid-cols-4 gap-4 max-w-lg md:max-w-full mx-auto">
        <li class="col-span-2 md:col-span-1" v-for="n in 10" :key="n">
          <NuxtLink :to="{ path: '/' + time + '/' + (10 * (n - 1) + 1) + '-' + 10 * n }">
            <div class="list-btn text-center">{{ 10 * (n - 1) + 1 }} 〜 {{ 10 * n }}</div>
          </NuxtLink>
        </li>
        <li class="col-start-2 col-span-2 md:col-start-3">
          <NuxtLink :to="{ path: '/' + time + '/1-100' }">
            <div class="list-btn text-center">1 〜 100</div>
          </NuxtLink>
        </li>
      </ul>
      <p class="mt-10 sm:mt-20 text-center">
        出典 :
        <a
          :href="sourceLink"
          target="_blank"
          rel="noopener noreferrer"
          class="text-blue-500 underline decoration-solid"
        >
          第{{ time.match(/[0-9]{2}/)[0] }}回 臨床検査技師国家試験問題および正答について｜厚生労働省
        </a>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: this.$route.params.time,
      jsonData: {},
      sourceLink: '',
    }
  },
  async mounted() {
    const res = await fetch(`/json-data/rinsyo${this.time}.json`)
    this.jsonData = await res.json()
    this.sourceLink = this.jsonData.link
  },
  methods: {
    convertTime(match, p1, p2) {
      return `第${p1}回 ${p2 === 'AM' ? '午前' : '午後'}`
    },
  },
}
</script>

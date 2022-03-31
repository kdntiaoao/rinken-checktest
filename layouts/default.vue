<template>
  <div class="min-h-screen flex flex-col">
    <header>
      <Header />
    </header>

    <BreadcrumbNav :navAry="navAry" :navNameAry="navNameAry" />

    <main class="my-5 md:my-10">
      <Nuxt />
    </main>

    <footer class="mt-auto">
      <Footer />
    </footer>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navAry: [],
      navNameAry: [],
    }
  },
  mounted() {
    // URLに使われる英語表記のナビゲーション名を代入
    this.navAry = this.$route.path.split('/').filter((el) => el !== '')
    // パンくずリストに使われる日本語表記のナビゲーション名を代入
    this.navNameAry = this.navAry.map((nav) => {
      // 英語表記を日本語表記に変更する
      if (nav.match(/[0-9]{2}[A-Z]{2}/)) {
        return nav.replace(/([0-9]{2})([A-Z]{2})/, this.convertTime)
      } else if (nav === 'mistake') {
        return '間違った問題'
      } else if (nav === 'search') {
        return '検索'
      } else {
        return nav
      }
    })
  },
  methods: {
    convertTime(match, p1, p2) {
      return `第${p1}回 ${p2 === 'AM' ? '午前' : '午後'}`
    },
  },
  watch: {
    $route(newRoute, oldRoute) {
      // URLに使われる英語表記のナビゲーション名を代入
      // 「path」は「/」から始めるので、配列の1つ目が空文字になるので取り除く
      this.navAry = newRoute.path.split('/').filter((el) => el !== '')
      // パンくずリストに使われる日本語表記のナビゲーション名を代入
      this.navNameAry = this.navAry.map((nav) => {
        // 英語表記を日本語表記に変更する
        if (nav.match(/[0-9]{2}[A-Z]{2}/)) {
          return nav.replace(/([0-9]{2})([A-Z]{2})/, this.convertTime)
        } else if (nav === 'mistake') {
          return '間違った問題'
        } else if (nav === 'search') {
          return '検索'
        } else {
          return nav
        }
      })
    },
  },
}
</script>

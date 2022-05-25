<template>
  <div class="wrapper max-w-2xl">
    <div class="relative">
      <!-- 解答画面 -->
      <div v-if="questionNum <= Number(questionNums.split('-')[1])">
        <transition name="fade">
          <div :key="questionNum" :hidden="questionNum === 0">
            <!-- 問題文 -->
            <p class="mb-5">
              <span class="text-sm">問題 {{ questionNum }}</span>
              <br />
              {{ question }}
            </p>
            <div class="relative mb-8">
              <!-- 「マル」か「バツ」を表示 -->
              <div
                class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-60 opacity-40"
                v-show="!thinking"
              >
                <!-- マルマーク -->
                <div v-show="isCorrect">
                  <img src="~/assets/images/correct_red.svg" alt="マルマーク" class="w-full" />
                </div>
                <!-- バツマーク -->
                <div v-show="!isCorrect">
                  <img src="~/assets/images/incorrect_blue.svg" alt="バツマーク" class="w-full" />
                </div>
              </div>
              <!-- 選択肢 -->
              <ul class="grid grid-cols-1 gap-3" :class="{ 'pointer-events-none': !thinking }">
                <li
                  v-for="(option, index) in options"
                  :key="index"
                  class="list-btn transition"
                  :class="[
                    {
                      'bg-sky-200': selectedOptions.includes(index),
                      'text-red-400': answer.includes(index + 1) && !thinking,
                    },
                  ]"
                  :style="'order:' + randomNumAry[index]"
                  @click="selectedOption(index, $event)"
                >
                  {{ option }}
                </li>
              </ul>
            </div>
            <div class="mb-8">
              <button class="btn-primary w-full p-2 md:p-3" v-show="thinking" @click="checkAnswer">解答</button>
              <button class="btn-secondary w-full p-2 md:p-3" v-show="!thinking" @click="questionNum++">
                次の問題
              </button>
            </div>
            <div v-if="imgName !== ''" class="max-w-lg mx-auto">
              <img :src="require(`~/assets/images/${time}/${imgName}`)" alt="問題についての画像" />
            </div>
          </div>
        </transition>
      </div>

      <!-- 正答率画面 -->
      <div class="text-center" v-else>
        <h2 class="mb-5 pb-1 text-base xs:text-xl md:text-2xl">
          {{ time.replace(/([0-9]{2})([A-Z]{2})/, convertTime) }}<br />
          {{ questionNums.replace('-', ' 〜 ') }}
        </h2>
        <div class="mb-10">
          <span class="text-base xs:text-xl md:text-2xl font-semibold text-red-400 mr-1">
            {{ answerCount }}
          </span>
          <span class="after:content-['/'] after:mx-2">問正解</span>
          <span class="text-xl md:text-2xl font-semibold mr-1">
            {{ Number(questionNums.split('-')[1]) - Number(questionNums.split('-')[0]) + 1 }}
          </span>
          <span>問中</span>
        </div>
        <NuxtLink :to="'/' + time">
          <button class="btn-primary px-5 py-2">問題一覧</button>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      time: this.$route.params.time, // 何年度か
      questionNums: this.$route.params.questionNums, // ○〜○問目か
      jsonData: {}, // 問題や解答のJSONデータ
      questionNum: 0, // 問題番号
      question: '', // 問題文
      options: [], // 選択肢
      imgName: '', // 問題の画像のファイル名
      answer: [], // 解答番号
      selectedOptions: [], // 選択された番号
      answerCount: 0, // 正解の数
      thinking: true, // 解答を表示するときfalse
      isCorrect: true, // 正解ならtrue, 不正解なかfalse
      randomNum: 1, // 1〜4の数字
      randomNumAry: [1, 2, 3, 4, 5], // shuffleAry()でシャッフルされる
    }
  },
  async mounted() {
    const res = await fetch(`/json-data/rinsyo${this.time}.json`)
    this.jsonData = await res.json()
    this.questionNum = Number(this.questionNums.replace(/-[0-9]{2,3}/, ''))
  },
  methods: {
    selectedOption(index, ev) {
      const target = ev.currentTarget
      // 選択されていないとき
      if (!target.classList.contains('bg-sky-200')) {
        // selectedOptionsに追加する
        this.selectedOptions.push(index)
      } else {
        // すでに選択されているとき
        // selectedOptionsから取り除く
        this.selectedOptions.splice(this.selectedOptions.indexOf(index), 1)
      }
      // 選択数が多いとき
      if (this.selectedOptions.length > this.answer.length) {
        this.selectedOptions.shift()
      }
    },
    checkAnswer() {
      // 解答を表示する
      this.thinking = false
      // 正答がないとき
      if (this.answer[0] === 0) {
        this.isCorrect = true
        this.answerCount++
        return
      }
      // 配列は0からなので1加え、ソートする
      const selectedOptions = this.selectedOptions.map((opt) => ++opt).sort()
      for (let i = 0; i < this.answer.length; i++) {
        // 不正解のとき
        if (this.answer[i] !== selectedOptions[i]) {
          const mistakeAry = JSON.parse(sessionStorage.getItem('mistake')) || []
          // 間違えた問題が存在しているか確認
          for (let i = 0; i < mistakeAry.length; i++) {
            if (this.time === mistakeAry[i].time && this.questionNum === mistakeAry[i].questionNum) {
              mistakeAry[i].id = Date.now()
              sessionStorage.setItem('mistake', JSON.stringify(mistakeAry))
              this.isCorrect = false
              return
            }
          }
          const mistakeQuestion = {
            id: Date.now(),
            time: this.time,
            questionNum: this.questionNum,
            question: this.question,
            options: this.options,
            imgName: this.imgName || false,
            answer: this.answer,
          }
          mistakeAry.push(mistakeQuestion)
          mistakeAry.sort((a, b) => b.id - a.id)
          sessionStorage.setItem('mistake', JSON.stringify(mistakeAry))
          this.isCorrect = false
          return
        }
      }
      this.isCorrect = true
      this.answerCount++
    },
    shuffleAry(ary) {
      ary.sort(() => Math.random() - 0.5)
    },
    convertTime(match, p1, p2) {
      return `第${p1}回 ${p2 === 'AM' ? '午前' : '午後'}`
    },
  },
  watch: {
    questionNum(newNum, oldNum) {
      if (newNum > Number(this.questionNums.split('-')[1])) {
        // 最終問題を回答したとき
        return
      }
      // 選択肢をランダムにする処理
      this.shuffleAry(this.randomNumAry)
      // JSONデータから問題や解答の情報を取得
      const questionData = this.jsonData.questionData.slice(newNum - 1, newNum)[0]
      // 問題文を代入
      this.question = questionData.question
      // 選択肢を代入
      this.options = questionData.options
      // 画像があるときだけJPGファイルの名前の代入
      this.imgName = !questionData.img ? '' : `${questionData.img}.jpg`
      // 答えの番号を代入
      this.answer = this.jsonData.answerData[newNum - 1]
      // 解答中の状態にする
      this.thinking = true
      // 選ばれた選択肢を初期化
      this.selectedOptions = []
    },
  },
}
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-out, transform 0.8s ease-out;
}
.fade-enter-active {
  transition: opacity 0.3s ease-out, transform 0.8s ease-out;
  transition-delay: 0.3s;
}
.fade-enter {
  opacity: 0;
  transform: translateX(200px);
}
.fade-leave-to {
  transform: translateX(-200px);
  position: absolute;
  width: 100%;
  opacity: 0;
}
</style>

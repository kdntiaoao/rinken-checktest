<template>
  <!-- 検索ボタンを押して遷移した検索ページ -->
  <div class="wrapper">
    <ContentTitle title="検索" />
    <div>
      <!-- 検索フォーム -->
      <label class="flex border rounded shadow mb-10 p-1 md:p-2 max-w-2xl mx-auto">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24px"
          height="24px"
          viewBox="0 0 24 24"
          fill="currentColor"
          class="w-6 h-6 xs:w-8 xs:h-8 mr-1"
        >
          <path d="M0 0h24v24H0V0z" fill="none" />
          <path
            d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
          />
        </svg>
        <input
          type="text"
          autocomplete="off"
          autocapitalize="off"
          spellcheck="false"
          autofocus
          placeholder="検索ワードを入力"
          v-model="searchWord"
          class="block grow focus:outline focus:outline-0"
        />
      </label>
    </div>

    <div>
      <div class="mb-10">
        <!-- 年度を選択するタブ -->
        <ul class="hidden md:grid grid-cols-6 gap-x-1 gap-y-2 bg-sky-600 p-2 rounded shadow-md">
          <template v-for="t in times">
            <template v-for="m in ['AM', 'PM']">
              <li :key="`${t}${m}`" class="text-center">
                <input
                  :id="`${t - 1953}${m}`"
                  type="radio"
                  :value="`${t - 1953}${m}`"
                  v-model="isShowTab"
                  class="hidden peer"
                />
                <label
                  :for="`${t - 1953}${m}`"
                  class="py-1 md:py-2 rounded peer-checked:bg-white text-white peer-checked:text-black block peer-checked:shadow cursor-pointer"
                >
                  {{ `${t - 1953}${m}`.replace(/([0-9]{2})([A-Z]{2})/, convertTime) }}
                </label>
              </li>
            </template>
          </template>
          <li class="text-center">
            <input id="all" type="radio" value="All" v-model="isShowTab" class="hidden peer" />
            <label
              for="all"
              class="py-1 md:py-2 rounded peer-checked:bg-white text-white peer-checked:text-black block peer-checked:shadow cursor-pointer"
            >
              全年度
            </label>
          </li>
        </ul>
        <!-- 年度を選択するポップアップメニュー -->
        <label class="md:hidden">
          年度選択：
          <select v-model="isShowTab">
            <option value="All">全年度</option>
            <optgroup v-for="t in times" :key="t" :label="`${t}年度`">
              <option :value="`${t - 1953}AM`">第{{ t - 1953 }}回 午前</option>
              <option :value="`${t - 1953}PM`">第{{ t - 1953 }}回 午後</option>
            </optgroup>
          </select>
        </label>
      </div>
      <!-- 検索結果がなかったときのメッセージ -->
      <p v-show="searchWord && resultData.length === 0">検索結果は0件です。</p>
      <!-- 検索結果 -->
      <div class="p-2 rounded border shadow" v-show="resultData.length !== 0">
        <ul>
          <template v-if="this.isShowTab === 'All'">
            <template v-for="dataElement in resultData">
              <template v-for="d in dataElement.result">
                <li class="border-x border-t last:border-b p-2" :key="`${dataElement.time}${d.num}`">
                  <Accordion>
                    <template v-slot:accordion-title>
                      <!-- 問題文 -->
                      <div>
                        <span class="sm:text-xl">
                          {{ dataElement.time.replace(/([0-9]{2})([A-Z]{2})/, convertTime) }}
                          問題 {{ d.num }}
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
                            :class="{
                              'text-red-400': d.answer.includes(index + 1),
                            }"
                          >
                            {{ o }}
                          </li>
                        </ul>
                        <!-- 問題に関する画像 -->
                        <!-- isShowTabが変更されてからresultDataを取得するまでに時間差があるため、isShowTabとresultDataの年度が一致しているかもチェック -->
                        <div
                          v-if="
                            isShowTab === 'All' &&
                            d.img !== false &&
                            dataElement.time === d.img.match(/[0-9]{2}[A-Z]{2}/)[0]
                          "
                          class="max-w-lg mx-auto"
                        >
                          <img
                            :src="require(`~/assets/images/${dataElement.time}/${d.img}.jpg`)"
                            alt="問題についての画像"
                          />
                        </div>
                      </div>
                    </template>
                  </Accordion>
                </li>
              </template>
            </template>
          </template>
          <!-- isShowTabが変わってからresultDataを取得するまで時間がかかるのでresultDataをチェックする -->
          <template v-else-if="resultData[0] && resultData[0].num">
            <template v-for="d in resultData">
              <li class="border-x border-t last:border-b p-2" :key="`${isShowTab}-${d.num}`">
                <Accordion>
                  <template v-slot:accordion-title>
                    <!-- 問題文 -->
                    <div>
                      <span class="sm:text-xl">問題 {{ d.num }}</span>
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
                          :class="{
                            'text-red-400': d.answer.includes(index + 1),
                          }"
                        >
                          {{ o }}
                        </li>
                      </ul>
                      <!-- 問題に関する画像 -->
                      <!-- isShowTabが変更されてからresultDataを取得するまでに時間差があるため、isShowTabとresultDataの年度が一致しているかもチェック -->
                      <div
                        v-if="isShowTab !== 'All' && d.img && isShowTab === d.img.match(/[0-9]{2}[A-Z]{2}/)[0]"
                        class="max-w-lg mx-auto"
                      >
                        <img :src="require(`~/assets/images/${isShowTab}/${d.img}.jpg`)" alt="問題についての画像" />
                      </div>
                    </div>
                  </template>
                </Accordion>
              </li>
            </template>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      times: [2020, 2019, 2018, 2017, 2016, 2015],
      searchWord: '',
      isShowTab: '',
      jsonData: {},
      resultData: [],
    }
  },
  async mounted() {
    // isShowTabの初期値を設定
    this.isShowTab = 'All'
    // 問題のJSONデータを取得
    const res = await fetch(`/json-data/rinsyo${this.isShowTab}.json`)
    this.jsonData = await res.json()
  },
  methods: {
    // 検索結果を取得
    getResult() {
      if (this.isShowTab === 'All') {
        const AllResults = []
        this.jsonData.forEach((d) => {
          // 問題を取得
          const questionAry = d.questionData
          // 検索ワードが含まれている問題番号を保存する配列
          const result = []
          questionAry.forEach((q, index) => {
            // 検索ワードがあるか確認
            if (q.question.includes(this.searchWord)) {
              // 問題文に含まれているか
              // 問題のデータを取得
              const questionData = q
              questionData.answer = d.answerData[index]
              result.push(questionData)
            } else {
              for (let o of q.options) {
                if (o.includes(this.searchWord)) {
                  // 選択肢に含まれているか
                  // 問題のデータを取得
                  const questionData = q
                  questionData.answer = d.answerData[index]
                  result.push(questionData)
                  break
                }
              }
            }
          })
          // 検索結果があったとき
          if (result.length > 0) {
            AllResults.push({ time: d.time, result: result })
          }
        })
        return AllResults
      } else {
        // 問題を取得
        const questionAry = this.jsonData.questionData
        // 検索ワードが含まれている問題番号を保存する配列
        const result = []
        questionAry.forEach((q, index) => {
          // 検索ワードがあるか確認
          if (q.question.includes(this.searchWord)) {
            // 問題文に含まれているか
            // 問題のデータを取得
            const questionData = q
            questionData.answer = this.jsonData.answerData[index]
            result.push(questionData)
          } else {
            for (let o of q.options) {
              if (o.includes(this.searchWord)) {
                // 選択肢に含まれているか
                // 問題のデータを取得
                const questionData = q
                questionData.answer = this.jsonData.answerData[index]
                result.push(questionData)
                break
              }
            }
          }
        })
        return result
      }
    },
    convertTime(match, p1, p2) {
      return `第${p1}回 ${p2 === 'AM' ? '午前' : '午後'}`
    },
  },
  watch: {
    async isShowTab(newTab, oldTab) {
      // 問題のJSONデータを取得
      const res = await fetch(`/json-data/rinsyo${this.isShowTab}.json`)
      this.jsonData = await res.json()
      // 検索結果を代入、検索ワードがないときは検索結果をリセット
      this.resultData = this.searchWord !== '' ? this.getResult() : []
    },
    searchWord(newWord, oldWord) {
      // 検索結果を代入、検索ワードがないときは検索結果をリセット
      this.resultData = newWord !== '' ? this.getResult() : []
    },
  },
}
</script>

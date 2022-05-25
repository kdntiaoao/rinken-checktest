<template>
  <!-- 解く問題の年度を選択する画面 -->
  <div class="wrapper">
    <ContentTitle title="国家試験問題" />
    <ul class="grid sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-6">
      <li v-for="t in times" :key="t">
        <h3 class="mb-2 sm:pb-2 text-slate-400">{{ t }}年度</h3>
        <ul class="grid grid-cols-2 sm:grid-cols-1 gap-x-4 gap-y-4">
          <li v-for="m in ['AM', 'PM']" :key="`${t - 1953}${m}`">
            <NuxtLink :to="`/${t - 1953}${m}`">
              <div class="flex items-center justify-between list-btn">
                <div>第{{ t - 1953 }}回{{ m === 'AM' ? '午前' : '午後' }}</div>
                <div class="border rounded-full border-black ml-1 p-[2px]">
                  <!-- 矢印アイコン -->
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20px"
                    height="20px"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="w-2 h-2"
                  >
                    <path fill="none" d="M0 0h20v20H0z" />
                    <g
                      stroke="currentColor"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      fill-rule="evenodd"
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
            </NuxtLink>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      times: [2020, 2019, 2018, 2017, 2016, 2015],
    }
  },
}
</script>

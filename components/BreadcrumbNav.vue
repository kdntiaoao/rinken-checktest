<template>
  <nav class="my-1 md:my-2" :class="{ 'opacity-0 pointer-events-none': navAry.length === 0 }">
    <div class="wrapper">
      <ol class="flex items-center text-slate-500">
        <li
          class="underline decoration-solid"
        >
          <NuxtLink to="/">
            <div class="flex items-center">
              <div>
                <!-- ホームアイコン -->
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24px"
                  height="24px"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  class="w-5 h-5"
                >
                  <path d="M0 0h24v24H0V0z" fill="none" />
                  <path
                    d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"
                  />
                </svg>
              </div>
              <div>ホーム</div>
            </div>
          </NuxtLink>
        </li>

        <template v-for="(nav, index) in navAry">
          <li
            class="flex items-center group last:pointer-events-none"
            :key="index"
          >
            <div>
              <!-- 矢印アイコン -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20px"
                height="20px"
                viewBox="0 0 20 20"
                fill="currentColor"
                class="mx-1 xs:mx-2 md:mx-3 w-2 h-2 xs:w-3 xs:h-3"
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
                  <path
                    filter="none"
                    d="m6.504 18.51 8.486-8.486-1.414-1.414-8.486 8.486 1.414 1.414Z"
                  />
                </g>
              </svg>
            </div>
            <div>
              <NuxtLink :to="getLink(index)">
                <div
                  class="cursor-pointer underline decoration-solid group-last:no-underline group-last:text-slate-800 group-last:font-semibold"
                >
                  {{ navNameAry[index] }}
                </div>
              </NuxtLink>
            </div>
          </li>
        </template>
      </ol>
    </div>
  </nav>
</template>

<script>
export default {
  name: "BreadcrumbNav",
  props: {
    navAry: Array,
    navNameAry: Array,
  },
  data() {
    return {
      time: this.$route.params.time || "",
      questionNums: this.$route.params.questionNums || "",
    };
  },
  methods: {
    getLink(index) {
      let link = "";
      for (let i = 0; i <= index; i++) {
        link += `/${this.navAry[i]}`;
      }
      return link;
    },
  },
  watch: {
    $route() {
      this.time = this.$route.params.time || "";
      this.questionNums = this.$route.params.questionNums || "";
    },
  },
};
</script>

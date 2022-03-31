<template>
  <div class="border-b border-slate-200">
    <div class="wrapper flex justify-between items-center">
      <h1
        class="text-lg xs:text-xl md:text-3xl font-semibold py-5"
        :class="{ 'pointer-events-none': $route.path === '/' }"
      >
        <NuxtLink to="/"> 臨検チェックテスト </NuxtLink>
      </h1>
      <div class="flex items-center">
        <div
          v-show="$route.path !== '/search'"
          class="mr-3 md:mr-8 hidden xs:block"
        >
          <NuxtLink to="/search">
            <SearchButton />
          </NuxtLink>
        </div>
        <HamburgerMenu :menuAry="menuAry" :menuNameAry="menuNameAry">
          <template v-slot:menuIcon-1>
            <!-- 三角に！のマーク -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="mr-1"
            >
              <path
                d="M4.47 21h15.06c1.54 0 2.5-1.67 1.73-3L13.73 4.99c-.77-1.33-2.69-1.33-3.46 0L2.74 18c-.77 1.33.19 3 1.73 3zM12 14c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1zm1 4h-2v-2h2v2z"
              />
            </svg>
          </template>
          <template v-slot:menuIcon-2>
            <!-- 虫眼鏡マーク -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24px"
              height="24px"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="mr-1"
            >
              <path d="M0 0h24v24H0V0z" fill="none" />
              <path
                d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"
              />
            </svg>
          </template>
          <template v-slot:menuIcon-3>
            <!-- policyのマーク -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              enable-background="new 0 0 24 24"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              fill="currentColor"
              class="mr-1"
            >
              <g>
                <rect fill="none" height="24" width="24" />
                <rect fill="none" height="24" width="24" />
              </g>
              <g>
                <path
                  d="M21,6.3c0-0.79-0.47-1.51-1.19-1.83l-7-3.11c-0.52-0.23-1.11-0.23-1.62,0l-7,3.11C3.47,4.79,3,5.51,3,6.3V11 c0,5.55,3.84,10.74,9,12c2.3-0.56,4.33-1.9,5.88-3.71l-3.12-3.12c-1.94,1.29-4.58,1.07-6.29-0.64c-1.95-1.95-1.95-5.12,0-7.07 c1.95-1.95,5.12-1.95,7.07,0c1.71,1.71,1.92,4.35,0.64,6.29l2.9,2.9C20.29,15.69,21,13.38,21,11V6.3z"
                />
                <circle cx="12" cy="12" r="3" />
              </g>
            </svg>
          </template>
        </HamburgerMenu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      menuAry: ["mistake", "search"],
      menuNameAry: ["間違えた問題", "検索"],
    };
  },
};
</script>

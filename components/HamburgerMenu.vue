<template>
  <div>
    <!-- ハンバーガーボタン -->
    <div
      class="grid grid-cols-2 gap-[3px] md:gap-1 w-5 h-5 md:w-6 md:h-6 cursor-pointer"
      @click="isMenu = true"
    >
      <span v-for="n in 4" :key="n" class="bg-slate-400 rounded-sm"></span>
    </div>
    <!-- ハンバーガーボタンを押して出てくるメニュー -->
    <div
      class="fixed inset-0 bg-black/60 z-20 cursor-pointer"
      v-show="isMenu"
      @click="isMenu = false"
    >
      <transition name="slide">
        <div
          class="absolute top-0 right-0 left-0 py-6 md:pb-12 bg-sky-600 text-white cursor-auto"
          v-show="isMenu"
          @click.stop
        >
          <div class="wrapper">
            <!-- バツボタン -->
            <div
              class="w-6 h-6 md:w-7 md:h-7 relative ml-auto mb-6 cursor-pointer"
              @click="isMenu = false"
            >
              <span
                class="absolute top-1/2 -translate-y-1/2 w-[110%] h-1 bg-white rotate-45"
              ></span>
              <span
                class="absolute top-1/2 -translate-y-1/2 w-[110%] h-1 bg-white -rotate-45"
              ></span>
            </div>
            <ul class="max-w-2xl mx-auto">
              <li>
                <NuxtLink to="/">
                  <div
                    class="flex items-center p-2 border-b cursor-pointer"
                    @click="isMenu = false"
                  >
                    <!-- ホームアイコン -->
                    <div>
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
                          d="M10 19v-5h4v5c0 .55.45 1 1 1h3c.55 0 1-.45 1-1v-7h1.7c.46 0 .68-.57.33-.87L12.67 3.6c-.38-.34-.96-.34-1.34 0l-8.36 7.53c-.34.3-.13.87.33.87H5v7c0 .55.45 1 1 1h3c.55 0 1-.45 1-1z"
                        />
                      </svg>
                    </div>
                    <div>ホーム</div>
                  </div>
                </NuxtLink>
              </li>
              <template v-for="(menu, index) in menuAry">
                <li :key="index">
                  <NuxtLink :to="`/${menu}`">
                    <div
                      class="flex items-center p-2 border-b cursor-pointer"
                      @click="isMenu = false"
                    >
                      <div>
                        <slot :name="`menuIcon-${index + 1}`">
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
                                d="M12,2C6.48,2,2,6.48,2,12c0,5.52,4.48,10,10,10s10-4.48,10-10C22,6.48,17.52,2,12,2z M7,13.5c-0.83,0-1.5-0.67-1.5-1.5 c0-0.83,0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5C8.5,12.83,7.83,13.5,7,13.5z M12,13.5c-0.83,0-1.5-0.67-1.5-1.5 c0-0.83,0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5C13.5,12.83,12.83,13.5,12,13.5z M17,13.5c-0.83,0-1.5-0.67-1.5-1.5 c0-0.83,0.67-1.5,1.5-1.5s1.5,0.67,1.5,1.5C18.5,12.83,17.83,13.5,17,13.5z"
                              />
                            </g>
                          </svg>
                        </slot>
                      </div>
                      <div>{{ menuNameAry[index] }}</div>
                    </div>
                  </NuxtLink>
                </li>
              </template>
            </ul>
          </div>
          <!-- /.wrapper -->
        </div>
      </transition>
    </div>
  </div>
</template>

<script>
export default {
  name: "HamburgerMenu",
  transition: "slide",
  props: {
    menuAry: Array,
    menuNameAry: Array,
  },
  data() {
    return {
      isMenu: false,
    };
  },
};
</script>

<style>
.slide-enter-active {
  transition: transform 0.3s ease-out;
}
.slide-enter {
  transform: translateY(-100%);
}
</style>

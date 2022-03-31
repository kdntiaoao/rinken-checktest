<template>
  <div
    class="border-b-2 border-sky-600 mb-10 md:mb-20 pb-1 xs:pb-2 md:pb-4 text-base xs:text-xl md:text-2xl flex items-center justify-between"
  >
    <h2>
      {{ title }}
    </h2>
    <slot name="addElement" />
  </div>
</template>

<script>
export default {
  name: "ContentTitle",
  props: ["title"],
  data() {
    return {};
  },
};
</script>

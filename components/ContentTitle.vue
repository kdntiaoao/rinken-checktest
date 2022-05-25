<template>
  <div
    class="border-b-2 border-sky-600 mb-6 pb-1 text-base xs:text-xl md:text-2xl flex items-center justify-between"
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

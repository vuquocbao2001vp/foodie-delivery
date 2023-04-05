<template>
    <div class="category-page">
        <BaseProduct />
        <BaseProduct />
        <BaseProduct />
        <BaseProduct />
        <BaseProduct />
    </div>
</template>
<script>
export default {
    watch: {
    "$route.path": function(value) {
      console.log(value);
    },
  },
}
</script>
<style scoped>
.category-page {
    width: 70%;
    position: absolute;
    left: 30%;
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    align-items: baseline;
}

</style>
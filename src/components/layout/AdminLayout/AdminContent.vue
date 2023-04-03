<template>
<div class="b-content">
    <BaseLoader />
    <BaseToast />
    <router-view></router-view>
</div>
</template>

<script>
</script>
<style scoped>
.b-content{
    background-color: var(--background-main);
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 20px 24px;
    overflow: hidden;
    position: relative;
}
</style>
<template>
  <div class="header-dashboard flex">
    <div class="header-icon icon-three-stripes"></div>
    <div class="header-branch">
      <span class="header-left-branch"
        >{{headerTitle}}</span
      >
    </div>

    <div class="flex-end-block flex">
      <div class="header-button-text" title="Thông báo">
        <div class="icon-bell icon-header"></div>
      </div>
      <div class="avata-header">
        <img src="@/assets/Icons/default-avatar.jpg" alt="" />
      </div>

      <div class="header-right header-branch">
        <span class="header-branch-titile">Nguyễn Quang Minh</span>
      </div>
      <div class="header-right-icon flex"><div class="icon-down"></div></div>
    </div>
  </div>
</template>
<script>
export default {
    data() {
        return {
            headerTitle: "",
        }
    },
    mounted() {
        this.headerTitle = this.$route.name;
    },
    watch: {
        "$route.name": function(value){
            this.headerTitle = value;
        }
    },
};
</script>
<style scoped>

.header-dashboard{
    width: 100%;
    height: 48px;
    min-height: 48px !important;
    background-color: #fff;
    box-shadow: 0 3px 2px -1px rgb(233, 232, 232);
}
.header-branch{
    padding-left: 8px;
    font-family: Font SemiBold;
    font-size: 14px;
}
.icon-down{
    background: url('@/assets/Icons/Sprites.64af8f61.svg') no-repeat -1078px -38px;
    width: 9px;
    height: 6px;
    margin-top: 3px !important;
}
.header-tooltip{
    display: flex;
    border: 1px solid #ebedf0;
    border-radius: 40px;
    margin: 0 22px;
    cursor: pointer;
    height: 30px;
    padding: 0 12px;
    align-items: center;
}
.header-point{
    width: 6px;
    height: 6px;
    background-color: #4ea344;
    border-radius: 50%;
    border: 1px solid #fff;
}
.header-place{
    padding-left: 5px;
    width: fit-content;
}

/* header button*/
/* chứa các nút chức năng trợ giúp của header */
.header-button{
    display: flex;
    margin-left: 12px;
}

.header-button-text{
    width: 44px ;
    height: 48px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
}
.icon-header{
    background: url('@/assets/Icons/Sprites.64af8f61.svg') no-repeat;
    width: 24px;
    height: 24px;
    min-width: 24px;
    min-height: 24px;
    cursor: pointer;
}

.icon-bell{
    background-position: -788px -30px;
}
.avata-header{
    border: 1px solid #ebedf0;
    border-radius: 50%;    
    width: 32px;
    height: 32px;
    margin-left: 16px;
}

.avata-header img{
    width:  32px;
    height: 32px;
    border-radius: 50%;
}
.header-right-icon{
    margin-left: 8px;
    justify-content: center;
    width: 14px;
    height: 14px;
}
.header-left-branch{
    font-size: 1.125rem;
    font-family: Font Bold;
    padding-left: 16px;
}

/* content dashboard  */
.content-dashboard{
    padding-left: 20px;
}


.flex-end-block {
    position: absolute;
    right: 36px;
    top: 0;
}
.icon-down-header-start {
    mask: url('@/assets/Icons/Sprites.64af8f61.svg') no-repeat -178px -364px;
	width: 12px;
	height: 8px;
    background-color: rgb(123, 123, 123);
}
</style>
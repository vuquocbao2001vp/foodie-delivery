<template>
  <div v-if="isShowDetail==true">
    <BasePopup>
      <template #header>
        <div>Thông tin Người dùng</div>
        <div class="header-icon flex" @click="showDetail(false)"><div class="icon-X-secondary icon-center"></div></div>
      </template>
      <template #content>
        
        <div class="content-item flex">
            <div class="item-title">Họ tên:</div>
            <div class="item-input">Tào Tháo</div>
        </div>
        <div class="content-item flex">
            <div class="item-title">Giới tính:</div>
            <div class="item-input">Nam</div>
        </div>
         <div class="content-item flex">
            <div class="item-title">Ngày sinh:</div>
            <div class="item-input">4/4/186</div>
        </div>
        <div class="content-item flex">
            <div class="item-title">Số điện thoại:</div>
            <div class="item-input">0123456789</div>
        </div>
        <div class="content-item flex">
            <div class="item-title">Email:</div>
            <div class="item-input">taothao@tamquoc.com</div>
        </div>
        <div class="content-item flex">
            <div class="item-title">Địa chỉ:</div>
            <div class="item-input">133 Xuân thủy, Dịch Vọng Hậu, Cầu Giấy</div>
        </div>
         <div class="content-item flex">
            <div class="item-title">Ngày tạo:</div>
            <div class="item-input">4/4/1866</div>
        </div>
      </template>
      <template #control>
        <div class="control-flex flex">
            <div class="control-button" @click="showDetail(false)"><BaseButton buttonType="white-regular-square" buttonName="Đóng"/></div>
        </div>
      </template>
    </BasePopup>
  </div>
</template>

<script>
export default {
  props: ["isShowDetail"],
  data() {
    return {
    }
  },
  methods: {
    showDetail(isShow){
        this.$emit("showDetail", isShow);
    }
  }
};
</script>

<style scoped>
.content-item {
    padding-bottom: 12px;
    align-items: flex-start;
    font-size: 0.95rem;
}
.item-title {
    font-family: Font SemiBold;
    width: 160px;
}
.item-input {
    width: 400px;
}
.control-flex {
    flex-direction: row-reverse;
}
.control-button {
    margin-left: 8px;
}
.header-icon {
    width: 24px;
    height: 24px;
    position: absolute;
    right: 0;
    top: 0;
    border-radius: 50%;
    justify-content: center;
    cursor: pointer;
}
.header-icon:hover {
    background-color: #ccc;
}
.product-line {
    padding-bottom: 4px;
}
.last-item {
  padding-bottom: 0;
}
</style>
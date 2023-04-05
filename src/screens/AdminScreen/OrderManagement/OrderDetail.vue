<template>
  <div v-if="isShowDetail==true">
    <BasePopup>
      <template #header>
        <div>Thông tin Đơn hàng</div>
        <div class="header-icon flex" @click="showDetail(false)"><div class="icon-X icon-center"></div></div>
      </template>
      <template #content>
        
        <div class="content-item flex">
            <div class="item-title">Mã đơn hàng:</div>
            <div class="item-input">ĐH1234</div>
        </div>
        <div class="content-item flex">
            <div class="item-title">Họ tên:</div>
            <div class="item-input">Tào Tháo</div>
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
            <div class="item-title">Sản phẩm:</div>
            <div class="item-input">
                <div class="product-line">Pizza xúc xích phô mai nướng <span class="font-semibold">x2</span></div>
                <div class="product-line">Pizza xúc xích phô mai nướng <span class="font-semibold">x2</span></div>
                <div class="product-line">Pizza xúc xích phô mai nướng <span class="font-semibold">x2</span></div>
            </div>
        </div>
        <div class="content-item flex">
            <div class="item-title">Ghi chú người mua:</div>
            <div class="item-input">Nhiều xúc xích nhiều phô mai không cho thêm rau cho nhiều tương ớt</div>
        </div>
        <div class="content-item flex">
            <div class="item-title">Tổng tiền:</div>
            <div class="item-input">240,000đ</div>
        </div>
        <div class="content-item flex">
            <div class="item-title">Thời gian đặt hàng:</div>
            <div class="item-input">19h00 19/03/2022</div>
        </div>
        <div class="content-item flex">
            <div class="item-title">Người giao hàng:</div>
            <div class="item-input">Lưu Bị</div>
        </div>
        <div class="content-item flex">
            <div class="item-title">Trạng thái:</div>
            <div class="item-input text-green">Đã hoàn thành</div>
        </div>
        <div class="content-item last-item flex">
            <div class="item-title">Ghi chú người bán:</div>
            <div class="item-input">Ghi chú ở đây</div>
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
        displayStatus: ['Hiển thị', 'Không hiển thị'],
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
    width: 180px;
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
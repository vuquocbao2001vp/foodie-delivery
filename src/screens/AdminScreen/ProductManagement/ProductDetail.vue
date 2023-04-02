<template>
  <div v-if="isShowDetail == true">
    <BasePopup>
      <template #header>
        <div>Thông tin Sản phẩm</div>
        <div class="header-icon flex" @click="showDetail(false)">
          <div class="icon-X-secondary icon-center"></div>
        </div>
      </template>
      <template #content>
        <div class="content flex">
          <div class="product-image">
            <img class="img flex" :src="productImageUrl" alt="">
            <div class="select-image-button flex" @click="changeProductImageOnClick">
                <BaseButton buttonType="regular-square" buttonName="Chọn ảnh"/>
            </div>
                <input hidden ref="productImageFile" type="file" @change="changeProductImage">

          </div>
          <div class="product-info">
            <div class="content-item flex">
              <div class="item-title">
                Tên sản phẩm <span class="text-red">*</span>
              </div>
              <div class="item-input">
                <DxTextBox />
              </div>
            </div>
            <div class="content-item flex">
              <div class="item-title">
                Danh mục <span class="text-red">*</span>
              </div>
              <div class="item-input">
                <DxSelectBox />
              </div>
            </div>
            <div class="content-item flex">
              <div class="item-title">
                Giá <span class="text-red">*</span>
              </div>
              <div class="item-input">
                <DxTextBox />
              </div>
            </div>
            <div class="content-item flex">
              <div class="item-title">
                Đã bán
              </div>
              <div class="item-input">
                <DxTextBox />
              </div>
            </div>
            <div class="content-item flex">
              <div class="item-title">
                Mô tả
              </div>
              <div class="item-input">
                <textarea rows="3" placeholder="Nhập mô tả của sản phẩm"></textarea>
              </div>
            </div>
            <div class="content-item flex">
              <div class="item-title">
                Trạng thái <span class="text-red">*</span>
              </div>
              <div class="item-input">
                <DxRadioGroup
                  :items="displayStatus"
                  :value="displayStatus[0]"
                  layout="horizontal"
                />
              </div>
            </div>
            <div class="content-item last-item flex">
              <div class="item-title">
                Sản phẩm nổi bật
              </div>
              <div class="item-input">
                <DxCheckBox text="Chọn" />
              </div>
            </div>
          </div>
        </div>
      </template>
      <template #control>
        <div class="control-flex flex">
          <div class="control-button">
            <BaseButton buttonType="regular-square" buttonName="Xác nhận" />
          </div>
          <div class="control-button">
            <BaseButton buttonType="white-regular-square" buttonName="Đóng" />
          </div>
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
      displayStatus: ["Hiển thị", "Không hiển thị"],
      productImageUrl: require("@/assets/Icons/pizza.png"),
    };
  },
  methods: {
    showDetail(isShow) {
      this.$emit("showDetail", isShow);
    },
    /**
     * Event chọn file ảnh từ máy
     */
    changeProductImage(event){
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.productImageUrl = reader.result;
      };
      reader.readAsDataURL(file);
    },
    /**
     * Chọn ảnh từ máy khi click button chọn ảnh
     */
    changeProductImageOnClick(){
      this.$refs.productImageFile.click();
    }
  },
};
</script>

<style scoped>
.content-item {
  padding-bottom: 24px;
  align-items: flex-start;
}
.item-title {
  font-family: Font SemiBold;
  width: 140px;
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
.product-image {
  width: 200px;
  min-height: 240px;
  height: 100%;
  padding-right: 24px;
}
.product-info {
  width: max-content;
  height: max-content;
  padding-left: 24px;
  border-left: 2px solid var(--grid-border);
}
.content {
  align-items: flex-start;
  padding: 12px 0;
}
.img {
    width: 200px;
    height: 200px;
    justify-content: center;
    box-sizing: border-box;
}
.select-image-button{
    width: 100%;
    margin-top: 16px;
}
.last-item {
  padding-bottom: 0;
}
</style>
<template>
  <div v-if="isShowDetail == true">
    <BasePopup>
      <template #header>
        <div>Thông tin Sản phẩm</div>
        <div class="header-icon flex" @click="hideDetail">
          <div class="icon-X-secondary icon-center"></div>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="submitForm">
          <div class="content flex">
            <div class="product-image">
              <img class="img flex" :src="product.image" alt="" />
              <div
                class="select-image-button flex"
                @click="changeProductImageOnClick"
              >
                <BaseButton buttonType="regular-square" buttonName="Chọn ảnh" />
              </div>
              <input
                hidden
                ref="productImageFile"
                type="file"
                @change="changeProductImage"
              />
            </div>
            <div class="product-info">
              <div class="content-item flex">
                <div class="item-title">
                  Tên sản phẩm <span class="text-red">*</span>
                </div>
                <div class="item-input">
                  <DxTextBox
                    v-model="product.name"
                    :on-initialized="onInitialized"
                    value-change-event="keyup"
                    max-length="100"
                  >
                    <DxValidator>
                      <DxRequiredRule
                        message="Tên sản phẩm không được để trống."
                      />
                    </DxValidator>
                  </DxTextBox>
                </div>
              </div>
              <div class="content-item flex">
                <div class="item-title">
                  Danh mục <span class="text-red">*</span>
                </div>
                <div class="item-input">
                  <DxSelectBox
                    :search-enabled="true"
                    v-model:value="product.category"
                    :data-source="categories"
                    no-data-text="Không có dữ liệu"
                    display-expr="category_name"
                    value-expr="id"
                    placeholder=""
                  />
                </div>
              </div>
              <div class="content-item flex">
                <div class="item-title">
                  Giá <span class="text-red">*</span>
                </div>
                <div class="item-input">
                  <DxTextBox
                    v-model="product.price"
                    value-change-event="keyup"
                    max-length="20"
                  >
                    <DxValidator>
                      <DxRequiredRule
                        message="Giá sản phẩm không được để trống."
                      />
                    </DxValidator>
                  </DxTextBox>
                </div>
              </div>
              <div class="content-item flex">
                <div class="item-title">Đã bán</div>
                <div class="item-input">
                  <DxTextBox />
                </div>
              </div>
              <div class="content-item flex">
                <div class="item-title">Mô tả</div>
                <div class="item-input">
                  <textarea
                    rows="3"
                    placeholder="Nhập mô tả của sản phẩm"
                    v-model="product.description"
                  ></textarea>
                </div>
              </div>
              <div class="content-item flex">
                <div class="item-title">
                  Trạng thái <span class="text-red">*</span>
                </div>
                <div class="item-input">
                  <DxRadioGroup
                    :items="displayStatus"
                    value-expr="value"
                    display-expr="text"
                    :value="product.status !== undefined ? product.status : 1"
                    layout="horizontal"
                    @valueChanged="changeProductStatus"
                  />
                </div>
              </div>
              <div class="content-item last-item flex">
                <div class="item-title">Sản phẩm nổi bật</div>
                <div class="item-input">
                  <DxCheckBox v-model="product.highlight" text="Chọn" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <!-- <DxValidationSummary ref="ok"/> -->
            <div v-show="false">
              <DxButton
                ref="summary"
                width="100%"
                :use-submit-behavior="true"
                text="Register"
                type="success"
              />
            </div>
          </div>
        </form>
      </template>
      <template #control>
        <div class="control-flex flex">
          <div class="control-button" @click="saveOnClick">
            <BaseButton buttonType="regular-square" buttonName="Xác nhận" />
          </div>
          <div class="control-button" @click="hideDetail">
            <BaseButton buttonType="white-regular-square" buttonName="Đóng" />
          </div>
        </div>
      </template>
    </BasePopup>
    <BasePopup v-if="isShowPopup">
      <template #header>
        <div>Thông báo</div>
        <div class="header-icon flex">
          <div
            class="icon-X-secondary icon-center"
            @click="showPopup(false)"
          ></div>
        </div>
      </template>
      <template #content>
        <div class="noti-popup">
          <div class="noti-icon flex"><div class="icon-info"></div></div>
          <div class="noti-info-text flex">{{ popupMessage }}</div>
        </div>
      </template>
      <template #control>
        <div class="flex">
          <div @click="showPopup(false)">
            <BaseButton buttonType="white-regular-square" buttonName="Hủy" />
          </div>
          <div class="control-flex control-right flex">
            <div class="control-button" @click="confirmPopupAction">
              <BaseButton buttonType="regular-square" buttonName="Đồng ý" />
            </div>
            <div class="control-button" @click="cancelPopupAction">
              <BaseButton
                buttonType="white-regular-square"
                buttonName="Không"
              />
            </div>
          </div>
        </div>
      </template>
    </BasePopup>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  props: ["isShowDetail", "saveMode", "selectedProduct"],
  inject: ["Enum"],
  data() {
    return {
      displayStatus: [
        { value: 1, text: "Hiển thị" },
        { value: 0, text: "Không hiển thị" },
      ],
      product: {},
      oldProduct: {},
      elementFocus: null,
      isShowPopup: false,
      popupMessage: "",
      productImageUrl: null,
    };
  },
  computed: {
    ...mapGetters(["categories"]),
    SAVE_MODE() {
      return this.Enum.SAVE_MODE;
    },
  },
  created() {
    /**
     * Lấy danh mục từ storage, nếu chưa có thì gọi api lấy danh mục
     */
    const categories = JSON.parse(sessionStorage.getItem("categories"));
    if (categories) {
      this.setCategories(categories);
    } else {
      this.getCategories();
    }
  },
  watch: {
    selectedProduct: function (value) {
      this.product = { ...value };
      this.oldProduct = { ...value };
    },
  },
  methods: {
    ...mapMutations(["setProducts", "setCategories"]),
    ...mapActions([
      "getProducts",
      "createProduct",
      "editProduct",
      "getCategories",
    ]),

    /**
     * Ẩn hiện form chi tiết
     */
    showDetail(isShow) {
      this.$emit("showDetail", isShow);
    },
    /**
     * Event chọn file ảnh từ máy
     */
    changeProductImage(event) {
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
    changeProductImageOnClick() {
      this.$refs.productImageFile.click();
    },
    /**
     * Hiển thị popup
     */
    showPopup(isShow, message) {
      this.isShowPopup = isShow;
      this.popupMessage = message;
    },
    /**
     * Sự kiện click button xác nhận
     */
    saveOnClick() {
      if (this.product.status === undefined) this.product.status = 1;
      this.$refs.summary.$el.click();
    },
    /**
     * Thay đổi giá trị status của sản phẩm ở radio button
     */
    changeProductStatus(e) {
      this.product.status =
        e.value === 0 || e.value === 1 ? e.value : this.product.status;
    },
    /**
     * focus vào ô input đầu tiên mỗi khi mở form
     */
    onInitialized: function (e) {
      this.elementFocus = e;
      setTimeout(function () {
        e.component.focus();
      }, 0);
    },
    /**
     * Khi form validate thành công thì thực hiện gọi api
     */
    submitForm() {
      // if (!this.$compareObjects(this.product, this.oldProduct)) {
      //   if (this.saveMode == this.SAVE_MODE.Add) {
      //     this.createProduct(this.product);
      //   } else {
      //     this.editProduct({ id: this.product.id, product: this.product });
      //   }
      // }
      // this.showDetail(false);
      console.log(this.product, this.oldProduct);
    },
    /**
     * Ẩn form chi tiết
     */
    hideDetail() {
      if (!this.$compareObjects(this.product, this.oldProduct)) {
        this.showPopup(true, "Dữ liệu đã thay đổi, bạn có muốn lưu lại không?");
      } else {
        this.showDetail(false);
      }
    },
    /**
     * Đóng form và không thực hiện hành động popup
     */
    cancelPopupAction() {
      this.showPopup(false);
      this.showDetail(false);
    },
    /**
     * Thực hiện hành động popup
     */
    confirmPopupAction() {
      this.saveOnClick();
      this.showPopup(false);
    },
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
.select-image-button {
  width: 100%;
  margin-top: 16px;
}
.last-item {
  padding-bottom: 0;
}
.control-right {
  position: absolute;
  right: 0px;
}
.noti-popup {
  display: flex;
  align-items: flex-start;
  width: 436px;
  min-height: 70px;
  border-bottom: 1px solid #b8bcc3;
  box-sizing: border-box;
}
.noti-icon {
  width: 48px;
  height: 48px;
  justify-content: center;
  box-sizing: border-box;
}
.noti-info-text {
  min-height: 48px;
  padding-left: 12px;
  font-size: 1rem;
  box-sizing: border-box;
}
</style>
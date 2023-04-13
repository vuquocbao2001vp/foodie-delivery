<template>
  <div v-if="isShowDetail == true">
    <BasePopup>
      <template #header>
        <div>Thông tin Danh mục</div>
        <div class="header-icon flex" @click="hideDetail">
          <div class="icon-X-secondary icon-center"></div>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="submitForm">
          <div class="content-item flex">
            <div class="item-title">
              Tên danh mục <span class="text-red">*</span>
            </div>
            <div class="item-input">
              <DxTextBox
                v-model="category.category_name"
                :on-initialized="onInitialized"
                value-change-event="keyup"
                max-length="100"
              >
                <DxValidator>
                  <DxRequiredRule message="Tên danh mục không được để trống." />
                </DxValidator>
              </DxTextBox>
            </div>
          </div>
          <div class="content-item flex" v-if="saveMode == SAVE_MODE.Edit">
            <div class="item-title">
              Thứ tự hiển thị <span class="text-red">*</span>
            </div>
            <div class="item-input">
              <DxTextBox v-model="category.order">
                <DxValidator>
                  <DxRequiredRule
                    message="Thứ tự danh mục không được để trống."
                  />
                </DxValidator>
              </DxTextBox>
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
                :value="category.status !== undefined ? category.status : 1"
                layout="horizontal"
                @valueChanged="changeCategoryStatus"
              />
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
import { mapActions } from "vuex";

export default {
  props: ["isShowDetail", "saveMode", "selectedCategory"],
  inject: ["Enum"],
  data() {
    return {
      displayStatus: [
        { value: 1, text: "Hiển thị" },
        { value: 0, text: "Không hiển thị" },
      ],
      category: {},
      oldCategory: {},
      elementFocus: null,
      isShowPopup: false,
      popupMessage: "",
    };
  },
  computed: {
    SAVE_MODE() {
      return this.Enum.SAVE_MODE;
    },
  },
  watch: {
    selectedCategory: function (value) {
      this.category = {...value};
      this.oldCategory = { ...value };
    },
  },
  methods: {
    ...mapActions(["getCategories", "createCategory", "editCategory"]),

    /**
     * Ẩn hiện form chi tiết
     */
    showDetail(isShow) {
      this.$emit("showDetail", isShow);
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
      if (this.category.status === undefined) this.category.status = 1;
      this.$refs.summary.$el.click();
    },
    /**
     * Thay đổi giá trị status của danh mục ở radio button
     */
    changeCategoryStatus(e) {
      this.category.status =
        e.value === 0 || e.value === 1 ? e.value : this.category.status;
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
      if (!this.$compareObjects(this.category, this.oldCategory)) {
        if (this.saveMode == this.SAVE_MODE.Add) {
          this.createCategory(this.category);
        } else {
          this.editCategory({ id: this.category.id, category: this.category });
        }
      }
      this.showDetail(false);
    },
    /**
     * Ẩn form chi tiết
     */
    hideDetail() {
      if (!this.$compareObjects(this.category, this.oldCategory)) {
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
  padding: 16px 0;
}
.item-title {
  font-family: Font SemiBold;
  width: 128px;
}
.item-input {
  width: 400px;
}
.control-flex {
  flex-direction: row-reverse;
}
.control-right {
  position: absolute;
  right: 0px;
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
<template>
  <div v-if="isShowDetail == true">
    <BasePopup>
      <template #header>
        <div>Thông tin Danh mục</div>
        <div class="header-icon flex" @click="showDetail(false)">
          <div class="icon-X-secondary icon-center"></div>
        </div>
      </template>
      <template #content>
        <div class="content-item flex">
          <div class="item-title">
            Tên danh mục <span class="text-red">*</span>
          </div>
          <div class="item-input">
            <DxTextBox
              v-model="category.category_name"
              :on-initialized="onInitialized"
              :on-focus-out="validateCategoryname"
              value-change-event="keyup"
              max-length="100"
            />
            <div class="validate-error">
              <div class="arrow"></div>
              <div class="error-text">Tên danh mục không được để trống.</div>
            </div>
          </div>
        </div>
        <div class="content-item flex" v-if="saveMode == SAVE_MODE.Edit">
          <div class="item-title">
            Thứ tự hiển thị <span class="text-red">*</span>
          </div>
          <div class="item-input">
            <DxTextBox v-model="category.id" />
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
      </template>
      <template #control>
        <div class="control-flex flex">
          <div class="control-button" @click="saveOnClick">
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
import { mapMutations, mapActions } from "vuex";

export default {
  props: ["isShowDetail", "saveMode", "selectedCategory"],
  inject: ["Enum"],
  data() {
    return {
      displayStatus: ["Hiển thị", "Không hiển thị"],
      category: {},
    };
  },
  computed: {
    SAVE_MODE() {
      return this.Enum.SAVE_MODE;
    },
  },
  watch: {
    selectedCategory: function (value) {
      this.category = value;
    },
  },
  methods: {
    ...mapMutations(["setCategories"]),
    ...mapActions(["getCategories", "createCategory", "editCategory"]),

    showDetail(isShow) {
      this.$emit("showDetail", isShow);
    },

    saveOnClick() {
      if (this.saveMode == this.SAVE_MODE.Add) {
        this.createCategory(this.category);
        this.showDetail(false);
      } else {
        this.editCategory({ id: this.category.id, category: this.category });
        this.showDetail(false);
      }
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
  position: relative;
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
.validate-error {
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: auto;
  left: 0;
  right: 0;
  text-align: center;
}
.arrow {
  width: 8px;
  height: 8px;
  background-color: #f34a4a;
  transform: rotate(45deg);
}
.error-text {
  background-color: #f34a4a;
  color: #fff;
  border-radius: 4px;
  height: 24px;
  width: max-content;
  display: flex;
  align-items: center;
  padding: 0 6px;
  margin-top: -4px;
}
</style>
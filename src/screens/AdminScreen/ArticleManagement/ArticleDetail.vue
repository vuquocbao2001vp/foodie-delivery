<template>
  <div v-show="isShowDetail == true">
    <BasePopup>
      <template #header>
        <div>Thông tin Bài viết</div>
        <div class="header-icon flex" @click="hideDetail">
          <div class="icon-X-secondary icon-center"></div>
        </div>
      </template>
      <template #content>
        <form @submit.prevent="submitForm">
          <div class="content flex">
            <div class="product-image" v-if="isShowDetail == true">
              <img class="img flex" :src="articleImageUrl" alt="" />
              <div
                class="select-image-button flex"
                @click="changeArticleImageOnClick"
              >
                <BaseButton buttonType="regular-square" buttonName="Chọn ảnh" />
              </div>
              <div v-if="isEmptyImage" class="text-red">
                Chọn ảnh cho bài viết.
              </div>
              <input
                hidden
                ref="articleImageFile"
                type="file"
                @change="changeArticleImage"
              />
            </div>
            <div class="product-info">
              <div class="content-item" v-if="isShowDetail == true">
                <div class="item-title mgb-20">
                  Tiêu đề <span class="text-red">*</span>
                </div>
                <div class="item-input">
                  <DxTextBox
                    v-model="article.title"
                    :on-initialized="onInitialized"
                    value-change-event="focusout"
                  >
                    <DxValidator>
                      <DxRequiredRule message="Tiêu đề không được để trống." />
                    </DxValidator>
                  </DxTextBox>
                </div>
              </div>
              <div class="content-item">
                <div class="item-title">
                  Nội dung <span class="text-red">*</span>
                </div>
                <div class="item-input">
                  <div class="quill-editor">
                    <QuillEditor
                      ref="myQuill"
                      theme="snow"
                      toolbar="full"
                      :modules="modules"
                      placeholder="Nhập văn bản tại đây"
                      v-model:content="content"
                    />
                  </div>
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
import { mapGetters, mapActions } from "vuex";
import BlotFormatter from "quill-blot-formatter";
import Delta from "quill-delta";

export default {
  props: ["isShowDetail", "saveMode", "selectedArticle"],
  inject: ["Enum"],
  data() {
    return {
      article: {},
      oldArticle: {},
      elementFocus: null,
      isShowPopup: false,
      popupMessage: "",
      articleImageFile: null,
      articleImageUrl: null,
      isEmptyImage: null,
      content: "",
    };
  },
  setup: () => {
    const modules = {
      name: "blotFormatter",
      module: BlotFormatter,
      options: {
        /* options */
      },
    };
    return { modules };
  },
  computed: {
    ...mapGetters(["articleSelected"]),
    SAVE_MODE() {
      return this.Enum.SAVE_MODE;
    },
  },
  watch: {
    articleSelected: function (value) {
      if (this.saveMode == this.SAVE_MODE.Edit) {
        this.article = { ...value[0] };
        this.oldArticle = { ...value[0] };
        let delta = new Delta(JSON.parse(value[0].content));
        this.$refs.myQuill.setContents(delta);
      } else {
        this.article = {};
        this.oldArticle = {};
        this.$refs.myQuill.setContents("");
      }
      this.articleImageUrl =
        this.article.media != null ? this.article.media : "";
    },
    isShowDetail: function (value) {
      if (value == false) {
        this.articleImageFile = null;
        this.articleImageUrl = null;
      }
    },
  },
  methods: {
    ...mapActions(["createArticle", "updateArticle"]),

    /**
     * Ẩn hiện form chi tiết
     */
    showDetail(isShow) {
      this.$emit("showDetail", isShow);
    },
    /**
     * Event chọn file ảnh từ máy
     */
    changeArticleImage(event) {
      this.articleImageFile = event.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(this.articleImageFile);
      reader.onload = () => {
        this.articleImageUrl = reader.result;
      };
    },
    /**
     * Chọn ảnh từ máy khi click button chọn ảnh
     */
    changeArticleImageOnClick() {
      this.$refs.articleImageFile.click();
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
      this.$refs.summary.$el.click();
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
        if (this.articleImageUrl == "") {
          this.isEmptyImage = true;
        }
        else if (
          this.articleImageFile != null ||
          !this.$compareObjects(this.article, this.oldArticle) ||
          this.article.content !== JSON.stringify(this.content)
        ) {
          this.isEmptyImage = false;
          let jsonString = JSON.stringify(this.$refs.myQuill.getContents());
          this.article.content = jsonString;
          if (this.saveMode == this.SAVE_MODE.Add) {
            this.createArticle({
                body: this.article.content,
                title: this.article.title,
                image: this.articleImageFile
            });
          } else {
            this.updateArticle({
                id: this.article.id,
                body: this.article.content,
                title: this.article.title,
                image: this.articleImageFile
            });
          }
          this.showDetail(false);
        } else {
          this.isEmptyImage = false;
          this.showDetail(false);
        }
    },
    /**
     * Ẩn form chi tiết
     */
    hideDetail() {
      if (!this.$compareObjects(this.article, this.oldArticle)) {
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
  width: 800px;
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
.quill-editor {
  width: 100%;
  height: 400px;
  box-sizing: border-box;
  margin-bottom: 24px;
}
.mgb-20 {
  margin-bottom: 6px;
}
</style>
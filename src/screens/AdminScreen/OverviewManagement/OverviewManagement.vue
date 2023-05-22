<template>
  <div class="quill-editor">
    <QuillEditor
      ref="myQuillEditor"
      theme="snow"
      toolbar="full"
      :modules="modules"
      placeholder="Nhập văn bản tại đây"
      v-model:content="content"
    />
  </div>
  <div class="button" @click="saveBlog">
    <BaseButton buttonName="Lưu" buttonType="regular-square" />
  </div>
  <div class="quill-editor">
    <QuillEditor
      ref="secondQuillEditor"
      theme="snow"
      toolbar="full"
      :modules="modules"
      placeholder="Nhập văn bản tại đây"
      v-model:content="secondContent"
    />
  </div>
  <div id="content" v-html="quillHtml"></div>
</template>

<script>
import Delta from "quill-delta";
import BlotFormatter from "quill-blot-formatter";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";
import { mapGetters, mapMutations, mapActions } from "vuex";

export default {
  data() {
    return {
      content: "",
      secondContent: "",
      delta: undefined,
      quillHtml: null,
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
  },
  watch: {
    articleSelected: function (value) {
      console.log(value);
      let delta = new Delta(JSON.parse(value[0].content));
      this.$refs.secondQuillEditor.setContents(delta);
      const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
      const html = converter.convert();
      this.quillHtml = html;
      console.log(delta.ops, html);
    },
  },
  methods: {
    ...mapMutations(["setArticle"]),
    ...mapActions(["createArticle", "getArticle"]),
    saveBlog() {
      let jsonString = JSON.stringify(this.$refs.myQuillEditor.getContents());
      try {
        this.createArticle({ text: jsonString });
      } catch (error) {
        console.log(error);
      }
      try {
        this.getArticle(15);
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style >
.quill-editor {
  width: 800px;
  height: 100px;
  box-sizing: border-box;
  margin-top: 20px;
}
.button {
  width: 120px;
  margin-top: 80px;
}
#content {
  margin-top: 80px;
  width: 100%;
}
.ql-align-center {
  text-align: center;
}
.ql-align-right {
  text-align: right;
}
</style>
<template>
  <div class="intro-container flex">
    <div id="content" v-html="quillHtml"></div>
  </div>
</template>
<script>
import { mapActions, mapGetters } from "vuex";
import Delta from "quill-delta";
import { QuillDeltaToHtmlConverter } from "quill-delta-to-html";

export default {
  data() {
    return {
      quillHtml: null,
    };
  },
  computed: {
    ...mapGetters(["showArticleSelected"]),
  },
  created() {
    this.getShowArticleSelected(29);
  },
  watch: {
    showArticleSelected: function (value) {
      let delta = new Delta(JSON.parse(value[0].content));
      const converter = new QuillDeltaToHtmlConverter(delta.ops, {});
      const html = converter.convert();
      this.quillHtml = html;
    },
  },
  methods: {
    ...mapActions(["getShowArticleSelected"]),
  },
};
</script>
<style scoped>
.intro-container {
  width: 100%;
  min-height: 100vh;
  padding: 0 10%;
  align-items: baseline;
  position: relative;
  overflow-x: hidden;
  overflow-y: auto;
  padding-top: 24px;
}
#content {
  width: 100%;
}

</style>
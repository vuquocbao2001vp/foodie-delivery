import { createApp } from 'vue'
import App from './App.vue'
import 'devextreme/dist/css/dx.light.css';
import router from '../src/router/router.js'
import store from '../src/store/store.js'

import DxSelectBox from "devextreme-vue/select-box"
import DxTextBox from "devextreme-vue/text-box"
import DxCheckBox from "devextreme-vue/check-box"
import DxRangeSlider from 'devextreme-vue/range-slider';
import DxGallery from 'devextreme-vue/gallery';
import DxRadioGroup from 'devextreme-vue/radio-group';
import DxButton from 'devextreme-vue/button';
import DxValidationSummary from 'devextreme-vue/validation-summary';
import {
  DxValidator,
  DxRequiredRule,
  DxEmailRule,
  DxCompareRule,
  DxStringLengthRule,
} from 'devextreme-vue/validator';

import {QuillEditor} from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import '@vueup/vue-quill/dist/vue-quill.core.css'

import BaseButton from '../src/components/base/BaseButton.vue'
import BaseProduct from '../src/components/base/BaseProduct.vue'
import BaseTable from '../src/components/base/BaseTable.vue'
import BasePopup from '../src/components/base/BasePopup.vue'
import BaseLoader from '../src/components/base/BaseLoader.vue'
import BaseToast from '../src/components/base/BaseToast.vue'

import {Enum} from '../src/constants/enums/enum.js'
import compareObjects from './constants/functions/compareObjects'
import formatDate from './constants/functions/formatDate'

const app = createApp(App);

app.component("DxSelectBox", DxSelectBox);
app.component("DxTextBox", DxTextBox);
app.component("DxCheckBox", DxCheckBox);
app.component("DxButton", DxButton);
app.component("DxRadioGroup", DxRadioGroup);
app.component("DxRangeSlider", DxRangeSlider);
app.component("DxGallery", DxGallery);
app.component("DxValidationSummary", DxValidationSummary);
app.component("DxValidator", DxValidator);
app.component("DxRequiredRule", DxRequiredRule);
app.component("DxEmailRule", DxEmailRule);
app.component("DxCompareRule", DxCompareRule);
app.component("DxStringLengthRule", DxStringLengthRule);

app.component("QuillEditor", QuillEditor);

app.component("BaseButton", BaseButton);
app.component("BaseProduct", BaseProduct);
app.component("BaseTable", BaseTable);
app.component("BasePopup", BasePopup);
app.component("BaseLoader", BaseLoader);
app.component("BaseToast", BaseToast);

app.use(store);

app.config.globalProperties.$compareObjects = compareObjects
app.config.globalProperties.$formatDate = formatDate

app.provide('Enum', Enum);

app.use(router).mount('#app')
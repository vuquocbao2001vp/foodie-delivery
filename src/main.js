import { createApp } from 'vue'
import App from './App.vue'
import 'devextreme/dist/css/dx.light.css';
import {createRouter, createWebHistory} from 'vue-router'
import routers from '../src/router/router.js'
import store from '../src/store/store.js'

import DxSelectBox from "devextreme-vue/select-box"
import DxTextBox from "devextreme-vue/text-box"
import DxCheckBox from "devextreme-vue/check-box"
import DxRangeSlider from 'devextreme-vue/range-slider';
import DxGallery from 'devextreme-vue/gallery';
import DxRadioGroup from 'devextreme-vue/radio-group';

import BaseButton from '../src/components/base/BaseButton.vue'
import BaseProduct from '../src/components/base/BaseProduct.vue'
import BaseTable from '../src/components/base/BaseTable.vue'
import BasePopup from '../src/components/base/BasePopup.vue'
import BaseLoader from '../src/components/base/BaseLoader.vue'
import BaseToast from '../src/components/base/BaseToast.vue'

import {Enum} from '../src/constants/enums/enum.js'
import axiosPlugin from './constants/api/axiosInstance'

const router = createRouter({
    history: createWebHistory(),
    routes: routers,
})

const app = createApp(App);

app.component("DxSelectBox", DxSelectBox);
app.component("DxTextBox", DxTextBox);
app.component("DxCheckBox", DxCheckBox);
app.component("DxRadioGroup", DxRadioGroup);
app.component("DxRangeSlider", DxRangeSlider);
app.component("DxGallery", DxGallery);

app.component("BaseButton", BaseButton);
app.component("BaseProduct", BaseProduct);
app.component("BaseTable", BaseTable);
app.component("BasePopup", BasePopup);
app.component("BaseLoader", BaseLoader);
app.component("BaseToast", BaseToast);

app.use(store);

app.config.globalProperties.$axios = axiosPlugin

app.provide('Enum', Enum);

app.use(router).mount('#app')
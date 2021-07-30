// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: MIT-0

import Vue from "vue";
import App from "./App.vue";
import vueCustomElement from "vue-custom-element";
import "document-register-element/build/document-register-element";

Vue.use(vueCustomElement);
// Vue.config.productionTip = false;

new Vue({
  render: h => h(App)
}).$mount("#app");

Vue.customElement("vue-widget", App);

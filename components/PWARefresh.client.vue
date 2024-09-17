<template>
  <div v-if="applicationNeedsRefresh">
    <div class="bg-black/20 fixed top-0 z-[2] left-0 w-full h-full"></div>
    <div class="w-full fixed bottom-0 z-[3] left-0 bg-white rounded-lg shadow p-5 flex flex-col gap-3">
      <span class="text-secondary font-bold">برای اعمال تغییرات جدید اپلیکیشن خود را بروزرسانی نمایید</span>
      <button class="main-button" type="button" @click="updateApplication">بروزرسانی</button>
      <button class="secondary-button" type="button" @click="applicationNeedsRefresh = false">بعدا</button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import {onMounted} from "vue";
import type {PwaInjection} from "@vite-pwa/nuxt/dist/runtime/plugins/types";
//@ts-ignore
let pwa: PwaInjection = useNuxtApp().$pwa
let applicationNeedsRefresh = ref<boolean>(false)
onMounted(() => {
  if (pwa.isPWAInstalled) {

    if (pwa.needRefresh) {
      applicationNeedsRefresh.value = true
    }else{
    }
  }
})

function updateApplication() {
  pwa.updateServiceWorker(true)
}
</script>

<style scoped>

</style>
<script setup lang='ts'>
const { t } = useI18n()
const router = useRouter()
const go = () => {
  router.push('/')
}
</script>

<template>
  <main class="px-4 py-10 text-center text-gray-700 dark:text-gray-200">
    <Footer />
    <div text-5>
      <div
        id="your-class"
        inline-block
        @click="go"
      />
      <p>
        <a
          rel="noreferrer"
          target="_blank"
        >
          Frontend BR
        </a>
      </p>
      <p>
        <em
          text-sm
          opacity-75
        >{{ t('intro.desc') }}</em>
      </p>
    </div>

    <RouterView />

    <!-- <div class="mt-5 mx-auto text-center opacity-75 dark:opacity-50 text-sm">
      [Home Layout]
    </div> -->
  </main>
</template>

<script setup lang="ts">import axios from 'axios';

const user = useUserStore()
const name = $ref(user.savedName)
const vacanciesCount = ref(0)

const router = useRouter()
const go = () => {
  router.push('/vacancy/')
}

onMounted(async () => {
  const github = await axios.get('https://api.github.com/repos/frontendbr/vagas')
  vacanciesCount.value = github.data.open_issues_count
})


const { t } = useI18n()
</script>

<template>
  <div>
    <div
      py-4
      m-10
    >
      <p text-4xl>
       {{vacanciesCount}} Vagas
      </p>
    </div>

    <label
      class="hidden"
      for="input"
    >{{ t('intro.whats-your-name') }}</label>

    <div>
      <button
        btn
        m-10
        text-lg
        bg="#00FFB8 hover:#00C991"
        @click="go"
      >
        {{ t('button.see') }}
      </button>
    </div>
  </div>
</template>

<route lang="yaml">
meta:
  layout: home
</route>

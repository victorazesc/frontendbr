<script setup lang="ts">
import { Icon } from '@iconify/vue'
import { onMounted, ref } from 'vue'
import axios from 'axios'
import { marked } from 'marked'
import type { LoadAction } from '@ts-pro/vue-eternal-loading'
import { VueEternalLoading } from '@ts-pro/vue-eternal-loading'
import { a } from '@unocss/preset-mini/dist/utilities-a77178bb'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import Multiselect from '@vueform/multiselect'

import '@vueform/multiselect/themes/default.css'

const router = useRouter()
const keyUp = ref(0)
const page = ref(1)
const utilLinks = ref([])
const apply = ref('')
const limit = ref(0)
const vacancies = ref([])
const grid = ref(false)
const favorites = ref(false)
const body = ref('')
const searchTags = ref([])
const vacancy = ref({})
const favoriteVacancies = ref([])
const { t } = useI18n()

const options = ref([])

const value = ref([])

const loadUsers = async (page: number) => {
  const res = await axios.get(`https://api.github.com/repos/frontendbr/vagas/issues?state=open&page=${page}&per_page=20&labels=${value.value.map(e => e.value).join(',')}`)
  return res.data
}

const load = async ({ loaded }: LoadAction): Promise<any> => {
  const loadedUsers = await loadUsers(page.value)

  const savedData = JSON.parse(window.localStorage.getItem('favoriteVacancies') as string)

  vacancies.value.push(...loadedUsers)

  if (!body.value)
    getVacancy(vacancies.value[0])

  if (router.currentRoute.value.query.id) {
    const affectedRoute = await axios.get(`https://api.github.com/repos/frontendbr/vagas/issues/${router.currentRoute.value.query.id}`)
    getVacancy(affectedRoute.data)
  }

  vacancies.value.map((e: { favorite: boolean; id: any }) => {
    e.favorite = false
    if (savedData && savedData.find((i: { id: any }) => { return e.id === i.id }))
      e.favorite = true
  })

  if (savedData)
    favoriteVacancies.value = savedData

  page.value += 1
  loaded(loadedUsers.length)
}

const searchLink = () => {
  const str = window.document.getElementById('corpo')?.getElementsByTagName('a')
  const links = []
  apply.value = ''
  for (const o of str) {
    if (o.href.match(/mailto:/))
      apply.value = o.href
    links.push({ link: o.href, value: o.innerHTML })
  }

  utilLinks.value = links
}

const loadvacancies = async () => {
  page.value = 1
  keyUp.value += 1
  const loadedUsers = await loadUsers(page.value)

  const savedData = JSON.parse(window.localStorage.getItem('favoriteVacancies') as string)
  vacancies.value = []
  vacancies.value.push(...loadedUsers)

  if (!body.value)
    getVacancy(vacancies.value[0])

  vacancies.value.map((e: { favorite: boolean; id: any }) => {
    e.favorite = false
    if (savedData && savedData.find((i: { id: any }) => { return e.id === i.id }))
      e.favorite = true
  })

  if (savedData)
    favoriteVacancies.value = savedData

  page.value += 1
}

const getVacancy = (data) => {
  vacancy.value = data
  body.value = marked.parse(data.body)
  setTimeout(() => {
    searchLink()
  }, 0)
}

const toggleFavorite = async () => {
  favorites.value = !favorites.value
}

const removeTag = async (index) => {
  options.value.concat(value.value[index])
  value.value.splice(index, 1)
  await loadvacancies()
}

const favoriteVacancy = (data: { favorite: boolean; id: any }) => {
  data.favorite = true

  const teste = favoriteVacancies.value.findIndex((e: any) => { return e.id === data.id })

  if (teste !== -1) {
    data.favorite = false
    favoriteVacancies.value.splice(teste, 1)
  }

  else {
    favoriteVacancies.value.push(data)
  }

  window.localStorage.setItem('favoriteVacancies', JSON.stringify(favoriteVacancies.value))
}

const share = () => {
  const link = `${window.location.protocol}//${window.location.host + window.location.pathname}?id=${vacancy.value.number}`
  navigator.clipboard.writeText(link).then(() => {
    alert(`texto copiado: \r \r ${link}`) // success
  })
    .catch(() => {
      alert('err') // error
    })
}


onMounted(async () => {
  const github = await axios.get('https://api.github.com/repos/frontendbr/vagas')
  const labels = await axios.get('https://api.github.com/repos/frontendbr/vagas/labels?per_page=100')
  const tres = []
  labels.data.map((e) => { tres.push({ value: e.name, color: e.color, label: e.name, name: e.name }) })
  options.value = tres
  limit.value = github.data.open_issues_count
})
</script>

<template overflow-hidden>
  <nav text-xl text-right flex justify-between pb-6 mb-6 fixed left-0 bg="white dark:#121212" w-full z-1 p-6 top-0
    items-center border-b="1px #E5E7EB dark:gray-700">
    <div flex items-center justify-between w-full>
      <div flex items-center>
        <div id="your-class" inline-block mr-5 @click="go" />
        <Multiselect important-w-300px placeholder="Selecione alguma tag" mode="multiple" v-model="value" dark:text-gray-700
          :close-on-select="false" :searchable="true" :object="true" :resolve-on-load="false" :delay="0" :min-chars="1"
          :options=options @select=loadvacancies()>
          <template v-slot:multiplelabel="{ values }">
            <div class="multiselect-multiple-label">
              {{ values.length }} tags selecionadas
            </div>
          </template>
        </Multiselect>
        <div v-if="value.length > 0" text-left ml-16px>
          <span text-12px m-0 leading-none>Tags Buscadas</span>
          <div style="width: auto" leading-none gap-1 flex>
            <button v-for="(tag, tagIndex) of value" :key="tagIndex" className="!outline-none" m-0 p-0
              :title="t('button.toggle_dark')" @click="removeTag(tagIndex)">
              <span leading-none className="badge" m-0 pr-5px p-0
                :style="{ borderColor: `#${tag.color}`, color: `#${tag.color}` }"><span leading-none text-lg ml-5px
                  mr-5px> &times; </span> {{ tag.value }}</span>
            </button>
          </div>
        </div>
      </div>

      <div>
        <div flex items-center>
          <button className="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')"
            @click="favoriteVacancies.length === 0 ? null : toggleFavorite()">
            <Icon :icon="!favorites ? 'ant-design:heart-outlined' : 'ant-design:heart-filled'"
              style="font-size: 25px;" />
          </button>

          <button className="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="toggleDark()">
            <div i="carbon-sun dark:carbon-moon" />
          </button>

          <RouterLink class-name="icon-btn mx-2" to="/about" :title="t('button.about')">
            <div i-carbon-dicom-overlay />
          </RouterLink>

          <a className="icon-btn mx-2" rel="noreferrer" href="https://github.com/antfu/vitesse" target="_blank"
            title="GitHub">
            <div i-carbon-logo-github />
          </a>
        </div>
      </div>
    </div>
  </nav>

  <div>
    <div :style="!grid ? { gridTemplateColumns: '1fr' } : ''">
      <!-- {{ vacancy }} -->
      <template v-if="grid">
        <Box v-for="(vacancy, i) in vacancies" id="infinite-list" :key="i" :title="vacancy.title" :tags="vacancy.labels"
          :created_at="vacancy.created_at" />
      </template>
      <template v-else>
        <div id="teste" grid grid-cols-2 gap-2>
          <div id="teste2" flex flex-col overflow-scroll overflow-x-visible pt-1 pl-10px pr-32px
            style="height: calc(100vh - 8rem)">
            <template v-if="!favorites">
              <Line v-for="(vacancy, i) in vacancies" id="infinite-list" :key="i" mb-2 :title="vacancy.title"
                :tags="vacancy.labels" :created_at="vacancy.created_at" :favorite="vacancy.favorite"
                @save="favoriteVacancy(vacancy)" @mouseenter="getVacancy(vacancy)">
                <input type="hidden" :value="vacancy.favorite = false">
              </Line>
            </template>
            <template v-else>
              <Line v-for="(vacancy, i) in favoriteVacancies" id="infinite-list" :key="i" mb-2 :title="vacancy.title"
                :tags="vacancy.labels" :created_at="vacancy.created_at" :favorite="vacancy.favorite"
                @save="favoriteVacancy(vacancy)" @mouseenter="body = marked.parse(vacancy.body)">
                <input type="hidden" :value="vacancy.favorite = false">
              </Line>
            </template>
            <VueEternalLoading v-if="!favorites" :key="keyUp" :load="load">
              <template #loading>
                <div text="30px" text-center flex justify-center>
                  <Icon icon="line-md:loading-twotone-loop" />
                </div>
              </template>
            </VueEternalLoading>
          </div>

          <div>
            <Menu as="div" text-left ml-16px mr-32px border="1px #E5E7EB dark:gray-700" rounded-lg p-2
              bg="white dark:#121212" flex justify-between relative h-52px z-1>
              <div flex>
                <a v-if="apply" btn text-md mr-16px bg="#00FFB8 hover:#00C991" :href="apply">
                  {{ t('button.apply') }}
                </a>

                <MenuButton bg="#fff dark:#161b22" border="#E5E7EB dark:gray-700" text-gray-700 dark:text-gray-200
                  class="inline-flex justify-center rounded-md border border-gray-300 bg-white btn text-md font-medium hover:text-gray-100 hover:black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                  Links úteis
                  <Icon relative m-4px left-8px icon="akar-icons:chevron-down" />
                </MenuButton>
              </div>
              <button className="icon-btn mx-2 !outline-none" :title="t('button.toggle_dark')" @click="share()">
                <Icon icon="carbon:share" style="font-size: 25px;" />
              </button>
              <transition enter-active-class="transition ease-out duration-100"
                enter-from-class="transform opacity-0 scale-95" enter-to-class="transform opacity-100 scale-100"
                leave-active-class="transition ease-in duration-75" leave-from-class="transform opacity-100 scale-100"
                leave-to-class="transform opacity-0 scale-95">
                <MenuItems class="mt-2 rounded-md absolute top-50px focus:outline-none" bg="#fff dark:#161b22"
                  dark:text-gray-200 shadow-lg>
                  <div class="py-1" min-w-xs>
                    <MenuItem v-for="(link, index) of utilLinks" v-slot="{ active }" :key="index">
                    <a :href="link.link" target="_blank" mb-2 rounded-md class="block px-4 py-2 text-sm"
                      :class="[active ? ' dark:text-gray-200' : 'dark:text-gray-200']">{{ link.value }}</a>
                    </MenuItem>
                  </div>
                </MenuItems>
              </transition>
            </Menu>
            <div pt-1 mt="-48px" overflow-scroll scroll-p-2 overflow-x-visible style="height: calc(100vh - 8rem)" pr-6>
              <div rd="10px" className="markdown-body" pt-20 ml-4 sticky bg="#fff dark:#161b22"
                border="#E5E7EB dark:gray-700 1px solid">
                <span id="corpo" v-html="body" />
              </div>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<!-- <style src="@vueform/multiselect/themes/default.css"></style> -->
<!-- <route lang="yaml">
meta:
  layout: home
</route> -->

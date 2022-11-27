<script setup lang="ts">
import { Icon } from '@iconify/vue'
const props = defineProps({
  title: String,
  tags: Array,
  created_at: String,
  favorite: Boolean,
})

const emit = defineEmits<{
  (e: 'save', id: number): void
}>()
</script>

<template>
  <div className="line" bg="#fff dark:#161b22" border="#E5E7EB dark:gray-700">
    <div style="display: flex; justify-content: space-between">
      <div flex flex-col>
        <div className="tags" style="width: auto">
          <span v-for="(e, i) in props.tags" :key="i" className="badge" :style="{ borderColor: `#${e.color}`, color: `#${e.color}` }">{{ e.name }}</span>
        </div>
        <div flex>
          <p text-left dark:text-gray-200 text-gray-700 p-0>
            {{ props.title }}
          </p>
        </div>
      </div>
      <div>
        <button className="icon-btn mx-2 !outline-none" color="#05dca0" @click="$emit('save', 1)">
          <Icon
            :icon="!favorite ? 'ant-design:heart-outlined' : 'ant-design:heart-filled'"
            style="font-size: 25px; margin-left: 30px"
            hover="#333"
          />
        </button>
      </div>
    </div>
    <small style="color: #999; float: left">Pulicado em {{ new Intl.DateTimeFormat('pt-BR').format(new Date(props.created_at)) }}</small>
  </div>
</template>

<!--
 <div className='line'>
    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
      <span>{props.title}
    <br />
    <small style={{color:'#999'}}>Pulicado em {new Intl.DateTimeFormat('pt-BR').format(new Date(props.created_at))}</small>
    </span>
      <span className='labelsLine'>
      {
        props.tags.map((e, index) => {
          return  <span className='badge' key={index} style={{ borderColor: '#'+e.color }} >{e.name}</span>
        })
      }
      </span>
    </div>

  </div> -->

<script setup lang="ts">
const props = defineProps({
  title: String,
  tags: Array,
  created_at: String,
})
</script>

<template>
  <div class="box" bg="#fff dark:#161b22" border="#E5E7EB dark:gray-700">
    <h6 dark:text-gray-200 text-gray-700>
      {{ props.title }}
    </h6>
    <div class="tags">
      <span v-for="(e, i) in props.tags" :key="i" className="badge" :style="{ borderColor: `#${e.color}`, color: `#${e.color}` }">{{ e.name }}</span>
    </div>

    <small style="color: #999">Publicado em {{ new Intl.DateTimeFormat('pt-BR').format(new Date(props.created_at)) }}</small>
  </div>
</template>

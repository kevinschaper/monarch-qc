<!-- 
  This component is a dropdown menu that allows the user to select a report to view.
  It is a child component of the Dashboard component.
 -->

<template>
  <div>
    <h1>Select a report:</h1>
    <select v-model="selectedReport" :style="{ padding: '0.5rem', borderRadius: '0.25rem' }">
      <option v-for="[reportName, value] of reports" :key="reportName" :value="reportName">
        {{ reportName }}
      </option>
    </select>
    <div v-if="selectedReport">
      <h2>{{ selectedReport }}</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
  // import { selectReport } from "./SelectReport"
  import { watch } from "vue"
  import { processReport } from "../data"
  import { selectedReport } from "../data"

  defineProps<{
    reports: Map<string, Promise<string>>
  }>()

  watch(selectedReport, async () => {
    await processReport()
  })
</script>

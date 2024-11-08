<template>
    <div class="w-full h-full rounded-lg bg-white relative">
        <template v-if="selectedStopName">
            <div class="font-semibold">Bus Stop: {{ selectedStopName }}</div>
        </template>
        <div class="overflow-y-auto">
            <div v-for="(time, index) in times" :key="index" class="placeholder__item">
                {{ time }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue';

// Props
defineProps<{
    times: string[];
    selectedStopName: string | null;
}>();
</script>

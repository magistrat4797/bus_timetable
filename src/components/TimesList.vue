<template>
    <div class="w-full h-full rounded-lg bg-white relative">
        <div class="bus-list__header !pb-4 p-4 md:p-6 border-b border-gray-light">
            <template v-if="selectedStop && selectedStop.name && selectedStop.order !== null">
                <div class="selected-stop font-semibold text-sm leading-6 h-[40px]">
                    Bus Stop: {{ stopDisplay }}
                </div>
            </template>
            <div class="flex items-center gap-2 mt-3 md:mt-4">
                <div class="text-gray-darkest text-xs leading-4 font-semibold">Time</div>
            </div>
        </div>
        <div class="bus-list styled-scroll">
            <div v-for="(time, index) in times" :key="index" class="bus-list__item">
                {{ time }}
            </div>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import { useLists } from '@/composables/useLists';

const props = defineProps<{
    times: string[];
    selectedStop: { name: string; order: number } | null;
}>();

const { formatOrder } = useLists();

const stopDisplay = computed(() => {
    if (props.selectedStop && props.selectedStop.name && props.selectedStop.order !== null) {
        return `${props.selectedStop.name} ${formatOrder(props.selectedStop.order)}`;
    }
    return '';
});
</script>

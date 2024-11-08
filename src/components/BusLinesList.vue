<template>
    <BaseCard class="bus-lines p-4 md:p-6 mb-4">
        <template #label>
            <h2>Select Bus Line</h2>
        </template>
        <div class="bus-lines-list flex flex-wrap gap-2">
            <div
                v-for="line in allLines"
                :key="line"
                class="bus-line"
                :class="{ active: line === selectedLineNumber }"
                @click="selectLine(line)"
            >
                {{ line }}
            </div>
        </div>
    </BaseCard>
</template>

<script lang="ts" setup>
import { useBusStore } from '@/composables/useBusStore';
import BaseCard from '@/components/BaseCard.vue';

const { allLines, selectedLineNumber, selectLine } = useBusStore();
</script>

<style lang="scss" scoped>
.bus-line {
    @apply flex items-center justify-center text-center cursor-pointer text-xs leading-4 font-medium transition ease-in-out duration-300 bg-primary hover:bg-primary-dark text-white h-8 px-4 rounded min-w-[54px];
    &.active {
        @apply bg-secondary;
    }
}
</style>

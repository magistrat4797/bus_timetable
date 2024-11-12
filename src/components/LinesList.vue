<template>
    <BaseCard class="bus-lines p-4 md:p-6 mb-4">
        <template #label>
            <h2>Select Bus Line</h2>
        </template>
        <div class="bus-lines-list">
            <div
                v-for="line in sortedLines"
                :key="line"
                class="bus-lines-list__item"
                :class="{ active: line === selectedLineNumber }"
                @click="selectLine(line)"
            >
                {{ line }}
            </div>
        </div>
    </BaseCard>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/composables/useMainStore';
import BaseCard from '@/components/ui/BaseCard.vue';

const { sortedLines, selectedLineNumber, selectLine } = useMainStore();
</script>

<style lang="scss" scoped>
.bus-lines-list {
    @apply flex flex-wrap gap-2;
    &__item {
        @apply flex items-center justify-center text-center cursor-pointer text-xs leading-4 font-medium transition ease-in-out duration-300 bg-primary hover:bg-primary-dark text-white h-8 px-4 rounded min-w-[54px];
        &.active {
            @apply bg-secondary;
        }
    }
}
</style>

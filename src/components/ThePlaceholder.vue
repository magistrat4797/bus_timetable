<template>
    <BaseCard class="placeholder dashed-border w-full relative rounded">
        <div
            v-if="content.length"
            class="w-full h-full rounded-lg bg-white z-10 relative overflow-auto"
        >
            <div v-if="props.type === 'stops' && selectedLineNumber" class="font-bold">
                Bus line: {{ selectedLineNumber }}
            </div>
            <div v-else-if="props.type === 'times' && selectedStopName" class="font-bold">
                Bus Stop: {{ selectedStopName }}
            </div>

            <button
                v-if="props.type === 'stops' && selectedLineNumber"
                @click="toggleSortOrder"
                class="sort-button"
            >
                Sortuj
            </button>

            <div
                v-for="(item, index) in content"
                :key="index"
                class="placeholder__item"
                :class="{ active: isStopActive(item) }"
                @click="handleClick(item)"
            >
                {{ displayText(item) }}
            </div>
        </div>
        <div v-else class="placeholder__label">{{ label }}</div>
    </BaseCard>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref } from 'vue';
import { useBusStore } from '@/composables/useBusStore';
import BaseCard from '@/components/BaseCard.vue';

type PlaceholderType = 'stops' | 'times';
interface StopItem {
    stop: string;
    order: number;
    time?: string;
}

const props = defineProps<{ type: PlaceholderType }>();
const { activeStops, activeTimes, selectedLineNumber, selectedStopName, selectStop } =
    useBusStore();

const sortByOrder = ref(false);

const content = computed<StopItem[] | string[]>(() => {
    if (props.type === 'stops') {
        let stops = [...activeStops.value];
        if (sortByOrder.value) {
            stops.sort((a, b) => a.order - b.order);
        }
        return stops;
    }
    return activeTimes.value;
});

const label = computed(() => {
    if (!selectedLineNumber.value) {
        return 'Please select the bus line first';
    }
    if (props.type === 'times' && !selectedStopName.value) {
        return 'Please select the bus stop first';
    }
    return '';
});

const isStopActive = (item: StopItem | string): boolean => {
    if (props.type === 'stops' && typeof item !== 'string') {
        return item.stop === selectedStopName.value;
    }
    return false;
};

const handleClick = (item: StopItem | string) => {
    if (props.type === 'stops' && typeof item !== 'string') {
        selectStop(item.stop);
    }
};

const displayText = (item: StopItem | string): string => {
    if (props.type === 'stops' && typeof item !== 'string') {
        return `${item.stop} (Order: ${item.order})`;
    }
    return item as string;
};

const toggleSortOrder = () => {
    sortByOrder.value = !sortByOrder.value;
};
</script>

<style lang="scss" scoped>
$placeholder-min-height: 444px;
.placeholder {
    @apply h-placeholder md:h-placeholder-tablet lg:h-placeholder-desktop;
    &__label {
        @apply flex items-center justify-center text-sm leading-6 text-gray-dark rounded p-4 md:p-6 text-center h-full;
        background-image: repeating-linear-gradient(
                90deg,
                #9a9da4,
                #9a9da4 28px,
                transparent 28px,
                transparent 59.5px
            ),
            repeating-linear-gradient(
                180deg,
                #9a9da4,
                #9a9da4 28px,
                transparent 28px,
                transparent 59.5px
            ),
            repeating-linear-gradient(
                90deg,
                #9a9da4,
                #9a9da4 28px,
                transparent 28px,
                transparent 59.5px
            ),
            repeating-linear-gradient(
                180deg,
                #9a9da4,
                #9a9da4 28px,
                transparent 28px,
                transparent 59.5px
            );
        background-position:
            left top,
            right top,
            left bottom,
            left top;
        background-repeat: repeat-x, repeat-y, repeat-x, repeat-y;
        background-size:
            100% 2px,
            2px 100%,
            100% 2px,
            2px 100%;
    }
}
</style>

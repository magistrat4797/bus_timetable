<template>
    <div class="w-full h-full rounded-lg bg-white relative">
        <div class="bus-stops__header !pb-4 p-4 md:p-6 border-b border-gray-light">
            <template v-if="showLineNumber && selectedLineNumber">
                <div class="font-semibold h-[40px]">Bus line: {{ selectedLineNumber }}</div>
            </template>
            <template v-if="showSearch">
                <BaseInput
                    v-model="searchQuery"
                    placeholder="Search"
                    class="search-input max-w-[288px]"
                    :icon="searchIcon"
                />
            </template>
            <template v-if="stops.length">
                <div class="flex items-center gap-2 mt-2 md:mt-4">
                    <div class="text-gray-darkest text-xs leading-4 font-semibold">Bus Stops</div>
                    <button
                        @click="toggleSortOrder"
                        :class="['sort-btn', 'has-tooltip', { active: sortByOrder }]"
                        :data-tooltip-text="tooltipText"
                    >
                        <span class="icon" v-html="sortIcon" />
                    </button>
                </div>
            </template>
        </div>
        <template v-if="filteredStops.length">
            <div class="bus-stops">
                <div
                    v-for="(item, index) in filteredStops"
                    :key="index"
                    class="bus-stop"
                    :class="{
                        'bus-stop--action': props.clickable,
                        active: isStopActive(item)
                    }"
                    @click="handleClick(item)"
                >
                    {{ displayText(item) }}
                </div>
            </div>
        </template>
        <template v-else>
            <div class="no-results">No stops found for the given search.</div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { computed, defineProps, ref, watch } from 'vue';
import { useBusStore } from '@/composables/useBusStore';
import { searchIcon, sortIcon } from '@/assets/icons/icons';
import BaseInput from '@/components/BaseInput.vue';

type StopItem = {
    stop: string;
    order: number;
    time?: string;
};

// Props
const props = defineProps<{
    stops: StopItem[];
    showLineNumber?: boolean;
    selectedLineNumber?: number | null;
    clickable?: boolean;
    showSearch?: boolean;
}>();

const { selectedLineNumber, selectedStopName, selectStop } = useBusStore();
const sortByOrder = ref(false);
const searchQuery = ref('');

// Watcher to reset sortByOrder when selectedLineNumber changes
watch(selectedLineNumber, () => {
    sortByOrder.value = false; // Reset sort order when line changes
});

// Sorted stops computed property
const sortedStops = computed(() => {
    let stops = [...props.stops];

    // Default sorting by asc
    stops.sort((a, b) => a.stop.localeCompare(b.stop));

    // Sorting by order if sort button is active
    if (sortByOrder.value) {
        stops.sort((a, b) => a.order - b.order);
    }

    return stops;
});

// Filtered stops computed property
const filteredStops = computed(() => {
    if (!searchQuery.value) {
        return sortedStops.value;
    }
    return sortedStops.value.filter((stop) =>
        stop.stop.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
});

// Toggle sort order
const toggleSortOrder = () => {
    sortByOrder.value = !sortByOrder.value;
};

const tooltipText = computed(() => {
    return sortByOrder.value ? 'Sort by name' : 'Sort by order';
});

// Check if a stop is active
const isStopActive = (item: StopItem) => {
    return item.stop === selectedStopName.value;
};

// Handle item click
const handleClick = (item: StopItem) => {
    if (props.clickable) {
        selectStop(item.stop);
    }
};

// Display text
const displayText = (item: StopItem) => {
    return `${item.stop} (Order: ${item.order})`;
};
</script>

<style lang="scss" scoped>
@import '@/assets/styles/modules/_breakpoints.scss';

$header-height: 96px;
$header-height-tablet: 120px;

$item-height: 48px;
$item-height-tablet: 56px;
.bus-stops {
    @apply overflow-auto max-h-[500px];
    height: calc(100% - $header-height);
    @include md {
        height: calc(100% - $header-height-tablet);
    }
    &__header {
        height: $header-height;
        @include md {
            height: $header-height-tablet;
        }
    }
}
.bus-stop {
    @apply flex items-center px-4 md:px-6;
    height: $item-height;
    @include md {
        height: $item-height-tablet;
    }
}
.sort-btn {
    @apply inline-flex text-gray-dark;
    .icon {
        @apply transition-transform duration-300;
    }
    &:hover,
    &:active {
        @apply text-primary;
    }
    &.active {
        .icon {
            @apply rotate-180;
        }
    }
}
</style>

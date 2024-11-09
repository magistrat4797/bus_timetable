<template>
    <div class="w-full h-full rounded-lg bg-white relative">
        <div
            class="bus-list__header !pb-4 p-4 md:p-6 border-b border-gray-light"
            :class="{ 'md:pl-2 md:pt-2': showSearch }"
        >
            <template v-if="showLineNumber && selectedLineNumber">
                <div class="font-semibold text-sm leading-6">
                    Bus line: {{ selectedLineNumber }}
                </div>
            </template>
            <template v-if="showSearch">
                <BaseInput
                    v-model="searchQuery"
                    placeholder="Search"
                    class="search-input w-full sm:max-w-[288px]"
                    :icon="searchIcon"
                />
            </template>
            <template v-if="stops.length">
                <div
                    class="flex items-center gap-2 mt-4 md:mt-8"
                    :class="{ 'md:pl-4': showSearch }"
                >
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
            <div class="bus-list styled-scroll">
                <div
                    v-for="(item, index) in filteredStops"
                    :key="index"
                    class="bus-list__item"
                    :class="{
                        'bus-list__item--action': props.clickable,
                        active: isStopActive(item)
                    }"
                    @click="handleClick(item)"
                >
                    {{ displayText(item) }}
                </div>
            </div>
        </template>
        <template v-else>
            <div class="p-4 md:py-4 md:px-6">
                <div class="no-results text-sm leading-6">No stops found for the given search.</div>
            </div>
        </template>
    </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import { useBusStore } from '@/composables/useBusStore';
import { useLists } from '@/composables/useLists';
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

const { formatOrder } = useLists();
const { selectedLineNumber, selectedStop, selectStop } = useBusStore();

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

    const search = searchQuery.value.toLowerCase();

    return sortedStops.value.filter((stop) => {
        const formattedOrder = formatOrder(stop.order);
        const fullNameWithOrder = `${stop.stop} ${formattedOrder}`.toLowerCase();
        return (
            stop.stop.toLowerCase().includes(search) ||
            formattedOrder.includes(search) ||
            fullNameWithOrder.includes(search)
        );
    });
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
    return item.stop === selectedStop.value?.name;
};

// Handle item click
const handleClick = (item: StopItem) => {
    if (props.clickable) {
        if (selectedStop.value?.name === item.stop) {
            selectStop(null);
        } else {
            selectStop(item.stop);
        }
    }
};

// Display stop name with formatted order
const displayText = (item: StopItem) => {
    return `${item.stop} ${formatOrder(item.order)}`;
};
</script>

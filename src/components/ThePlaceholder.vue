<template>
    <BaseCard class="placeholder relative">
        <StopsList
            v-if="type === 'stops' && content.length"
            :stops="content"
            :show-line-number="true"
            :selected-line-number="selectedLineNumber"
            :clickable="true"
        />
        <TimesList
            v-else-if="type === 'times' && content.length && isSelectedStop"
            :times="content"
            :selected-stop="{ name: selectedStop.name ?? '', order: selectedStop.order ?? 0 }"
        />
        <div v-else class="placeholder__label">{{ label }}</div>
    </BaseCard>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import StopsList from '@/components/StopsList.vue';
import TimesList from '@/components/TimesList.vue';
import { useMainStore } from '@/composables/useMainStore';

const props = defineProps<{ type: 'stops' | 'times' }>();

const { activeStops, activeTimes, selectedLineNumber, selectedStop } = useMainStore();

// Check if the selected stop is valid (not null)
const isSelectedStop = computed(() => {
    return selectedStop.value.name !== null && selectedStop.value.order !== null;
});

// Determining content based on type (stops or times)
const content = computed(() => {
    return props.type === 'stops' ? activeStops.value : activeTimes.value;
});

// Determining the label based on condition and type
const label = computed(() => {
    if (props.type === 'stops' && !selectedLineNumber.value) {
        return 'Please select the bus line first';
    }
    if (props.type === 'times') {
        if (!selectedLineNumber.value) {
            return 'Please select the bus line first';
        }
        if (!isSelectedStop.value) {
            return 'Please select the bus stop first';
        }
    }
    return '';
});
</script>

<style lang="scss" scoped>
$placeholder-min-height: 444px;
.placeholder {
    @apply h-placeholder md:h-placeholder-desktop;
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

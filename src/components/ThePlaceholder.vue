<template>
    <BaseCard class="placeholder relative">
        <template v-if="props.type === 'stops' && content.length">
            <BusStopsList
                :stops="content"
                :show-line-number="true"
                :selected-line-number="selectedLineNumber"
                :clickable="true"
            />
        </template>
        <template v-else-if="props.type === 'times' && content.length">
            <BusTimesList :times="content" :selected-stop-name="selectedStopName" />
        </template>
        <template v-else>
            <div class="placeholder__label">{{ label }}</div>
        </template>
    </BaseCard>
</template>

<script lang="ts" setup>
import { computed, defineProps } from 'vue';
import BaseCard from '@/components/BaseCard.vue';
import BusStopsList from '@/components/BusStopsList.vue';
import BusTimesList from '@/components/BusTimesList.vue';
import { useBusStore } from '@/composables/useBusStore';

const props = defineProps<{ type: 'stops' | 'times' }>();
const { activeStops, activeTimes, selectedLineNumber, selectedStopName } = useBusStore();

const content = computed(() => (props.type === 'stops' ? activeStops.value : activeTimes.value));

const label = computed(() => {
    if (props.type === 'stops' && !selectedLineNumber.value) {
        return 'Please select the bus line first';
    }
    if (props.type === 'times') {
        if (!selectedLineNumber.value) {
            return 'Please select the bus line first';
        }
        if (!selectedStopName.value) {
            return 'Please select the bus stop first';
        }
    }
    return '';
});
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

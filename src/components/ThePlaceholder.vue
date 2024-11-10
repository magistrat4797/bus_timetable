<template>
    <BaseCard class="placeholder relative">
        <template v-if="props.type === 'stops' && content.length">
            <StopsList
                :stops="content"
                :show-line-number="true"
                :selected-line-number="selectedLineNumber"
                :clickable="true"
            />
        </template>
        <template v-else-if="props.type === 'times' && content.length && isSelectedStop">
            <!-- Przekazujemy selectedStop tylko wtedy, gdy name i order nie są null -->
            <TimesList
                :times="content"
                :selected-stop="{ name: selectedStop.name!, order: selectedStop.order! }"
            />
        </template>
        <template v-else>
            <div class="placeholder__label">{{ label }}</div>
        </template>
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

const isSelectedStop = computed(() => {
    return selectedStop.value.name !== null && selectedStop.value.order !== null;
});

const content = computed(() => (props.type === 'stops' ? activeStops.value : activeTimes.value));

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

<template>
    <MainContainer>
        <template v-if="isLoading || error">
            <div class="mb-4">
                <template v-if="isLoading">
                    <div class="flex items-center justify-center min-h-[60px]">
                        <TheLoader />
                    </div>
                </template>
                <template v-if="error">
                    <p class="error-message">{{ error }}</p>
                </template>
            </div>
        </template>
        <template v-else>
            <BaseCard class="stops-page relative">
                <BusStopsList :stops="filteredStops" :show-search="true" />
            </BaseCard>
        </template>
    </MainContainer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import MainContainer from '@/components/MainContainer.vue';
import BaseCard from '@/components/BaseCard.vue';
import BusStopsList from '@/components/BusStopsList.vue';
import TheLoader from '@/components/common/TheLoader.vue';
import { useBusStore } from '@/composables/useBusStore';

const { allStops, isLoading, error } = useBusStore();

// Create a computed property to filter unique stops
const uniqueStops = computed(() => {
    const stopNames = new Set();
    return allStops.value.filter((stop) => {
        if (stopNames.has(stop.stop)) {
            return false;
        }
        stopNames.add(stop.stop);
        return true;
    });
});

const filteredStops = computed(() => uniqueStops.value);
</script>

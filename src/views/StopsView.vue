<template>
    <MainContainer>
        <template v-if="isLoading || error">
            <div class="mb-4">
                <template v-if="isLoading">
                    <div class="flex items-center justify-center min-h-[120px]">
                        <TheLoader />
                    </div>
                </template>
                <template v-if="error">
                    <p class="error-message">{{ error }}</p>
                </template>
            </div>
        </template>
        <template v-else>
            <BaseCard class="relative">
                <StopsList :stops="uniqueStops" :show-search="true" />
            </BaseCard>
        </template>
    </MainContainer>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import MainContainer from '@/components/ui/MainContainer.vue';
import BaseCard from '@/components/ui/BaseCard.vue';
import StopsList from '@/components/StopsList.vue';
import TheLoader from '@/components/common/TheLoader.vue';
import { useMainStore } from '@/composables/useMainStore';

const { allStops, isLoading, error } = useMainStore();

// Computed property to filter unique stops
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
</script>

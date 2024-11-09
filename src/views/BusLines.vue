<template>
    <MainContainer>
        <template v-if="isLoading || error">
            <div class="mb-4">
                <template v-if="isLoading">
                    <div class="flex items-center justify-center min-h-[136px]">
                        <TheLoader />
                    </div>
                </template>
                <template v-if="error">
                    <p class="error-message">{{ error }}</p>
                </template>
            </div>
        </template>
        <template v-else>
            <BusLinesList />
            <div class="flex flex-col md:flex-row gap-4">
                <ThePlaceholder class="md:w-1/2" type="stops" />
                <ThePlaceholder class="md:w-1/2" type="times" />
            </div>
        </template>
    </MainContainer>
</template>

<script lang="ts" setup>
import { useBusStore } from '@/composables/useBusStore';
import MainContainer from '@/components/MainContainer.vue';
import ThePlaceholder from '@/components/ThePlaceholder.vue';
import TheLoader from '@/components/common/TheLoader.vue';
import BusLinesList from '@/components/BusLinesList.vue';

const { isLoading, error } = useBusStore();
</script>

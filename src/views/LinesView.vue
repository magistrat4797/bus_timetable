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
            <LinesList />
            <div class="flex flex-col md:flex-row gap-4">
                <ThePlaceholder class="md:w-1/2" type="stops" />
                <ThePlaceholder class="md:w-1/2" type="times" />
            </div>
        </template>
    </MainContainer>
</template>

<script lang="ts" setup>
import { useMainStore } from '@/composables/useMainStore';
import MainContainer from '@/components/ui/MainContainer.vue';
import ThePlaceholder from '@/components/ThePlaceholder.vue';
import TheLoader from '@/components/common/TheLoader.vue';
import LinesList from '@/components/LinesList.vue';

const { isLoading, error } = useMainStore();
</script>

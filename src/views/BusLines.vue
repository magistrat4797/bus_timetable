<template>
    <MainContainer>
        <div v-if="isLoading" class="loader">Loading...</div>
        <div v-else>
            <BusLinesList />
            <div class="flex flex-col md:flex-row gap-4">
                <ThePlaceholder class="md:w-1/2" type="stops" />
                <ThePlaceholder class="md:w-1/2" type="times" />
            </div>
        </div>
    </MainContainer>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useBusStore } from '@/composables/useBusStore';
import MainContainer from '@/components/MainContainer.vue';
import ThePlaceholder from '@/components/ThePlaceholder.vue';
import BusLinesList from '@/components/BusLinesList.vue';

const { loadLines, isLoading } = useBusStore();

onMounted(() => {
    loadLines();
});
</script>

<style scoped>
.loader {
    text-align: center;
    font-size: 1.5em;
    color: #333;
    margin: 20px 0;
}
</style>

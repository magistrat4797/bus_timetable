<template>
    <section class="py-5 md:py-10">
        <TheHeader />
        <main>
            <RouterView />
        </main>
    </section>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue';
import { useBusStore } from '@/composables/useBusStore';
import TheHeader from '@/components/common/TheHeader.vue';

const { loadLines } = useBusStore();

onMounted(() => {
    loadLines();
});
</script>

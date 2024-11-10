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
import { useRouter } from 'vue-router';
import { useMainStore } from '@/composables/useMainStore';
import TheHeader from '@/components/common/TheHeader.vue';

const { loadLines, resetSelection } = useMainStore();
const router = useRouter();

onMounted(() => {
    loadLines();

    router.beforeEach((_, __, next) => {
        resetSelection();
        next();
    });
});
</script>

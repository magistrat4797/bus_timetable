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
import { useBusStore } from '@/composables/useBusStore';
import TheHeader from '@/components/common/TheHeader.vue';

const { loadLines, resetSelection } = useBusStore();
const router = useRouter();

onMounted(() => {
    loadLines();

    router.beforeEach((_, __, next) => {
        resetSelection();
        next();
    });
});
</script>

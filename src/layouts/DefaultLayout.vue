<template>
    <section class="py-5 md:py-10">
        <TheHeader />
        <main>
            <RouterView />
        </main>
    </section>
</template>

<script lang="ts" setup>
import TheHeader from '@/components/common/TheHeader.vue';
</script>

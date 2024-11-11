<template>
    <header>
        <MainContainer>
            <BaseHeading>
                <h1>{{ pageName }}</h1>
            </BaseHeading>
            <MainNavigation :links="navLinks" />
        </MainContainer>
    </header>
</template>

<script lang="ts" setup>
import BaseHeading from '@/components/ui/BaseHeading.vue';
import MainContainer from '@/components/ui/MainContainer.vue';
import MainNavigation from '@/components/ui/MainNavigation.vue';

defineProps<{
    pageName: string;
}>();

const navLinks = [
    { name: 'LinesView', label: 'Bus Lines' },
    { name: 'StopsView', label: 'Stops' }
];
</script>

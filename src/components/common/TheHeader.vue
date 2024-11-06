<template>
    <header>
        <MainContainer>
            <BaseHeading>
                <h1>Timetable</h1>
            </BaseHeading>
            <MainNavigation :links="links" />
        </MainContainer>
    </header>
</template>

<script lang="ts" setup>
import BaseHeading from '@/components/BaseHeading.vue';
import MainContainer from '@/components/MainContainer.vue';
import MainNavigation from '@/components/MainNavigation.vue';

const links = [
    { name: 'BusLines', label: 'Bus Lines' },
    { name: 'BusStops', label: 'Stops' }
];
</script>

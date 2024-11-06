<template>
    <BaseCard class="px-4 md:px-6 !py-0 mb-4">
        <nav class="nav">
            <div class="nav-links" ref="navLinksContainer">
                <RouterLink
                    v-for="link in links"
                    :key="link.name"
                    :to="{ name: link.name }"
                    class="nav-link"
                    active-class="active"
                    @click="setIndicatorPosition"
                >
                    {{ link.label }}
                </RouterLink>
                <div class="nav-indicator" :class="animationClasses" :style="indicatorStyle"></div>
            </div>
        </nav>
    </BaseCard>
</template>

<script lang="ts" setup>
import { defineProps, ref, computed, onMounted, nextTick, watch } from 'vue';
import { useRoute } from 'vue-router';
import BaseCard from '@/components/BaseCard.vue';

defineProps<{
    links: { name: string; label: string }[];
}>();

const indicatorWidth = ref(0);
const indicatorOffset = ref(0);
const navLinksContainer = ref<HTMLElement | null>(null);
const isIndicatorVisible = ref(false);
const animationClasses = ref('');

const indicatorStyle = computed(() => ({
    width: `${indicatorWidth.value}px`,
    transform: `translateX(${indicatorOffset.value}px)`,
    opacity: isIndicatorVisible.value ? 1 : 0
}));

const setIndicatorPosition = () => {
    nextTick(() => {
        const activeLink = navLinksContainer.value?.querySelector('.active') as HTMLElement;
        if (activeLink) {
            indicatorWidth.value = activeLink.offsetWidth;
            indicatorOffset.value = activeLink.offsetLeft;
            isIndicatorVisible.value = true;
        }
    });
};

const route = useRoute();
onMounted(() => {
    window.onload = setIndicatorPosition;

    setTimeout(() => {
        animationClasses.value = 'transition-all duration-300 ease-in-out';
    }, 100);

    watch(
        () => route.name,
        () => setIndicatorPosition()
    );
});
</script>

<style lang="scss" scoped>
.nav {
    &-links {
        @apply relative;
    }

    &-link {
        @apply relative inline-flex items-center justify-center text-center h-nav md:h-nav-desktop text-sm font-medium leading-6 text-gray hover:text-gray-dark px-6;

        &.active {
            @apply text-gray-darkest;
        }
    }

    &-indicator {
        @apply absolute bottom-0 h-[2px] bg-primary;
    }
}
</style>

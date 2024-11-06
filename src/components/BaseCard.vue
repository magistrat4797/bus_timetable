<template>
    <div class="card bg-white rounded">
        <template v-if="slots.label">
            <div class="card__label mb-6 md:mb-8 font-semibold text-sm leading-6">
                <slot name="label" />
            </div>
        </template>
        <slot />
    </div>
</template>

<script lang="ts" setup>
import { useSlots } from 'vue';

const slots = useSlots();
</script>

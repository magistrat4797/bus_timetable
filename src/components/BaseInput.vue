<template>
    <div class="input-box">
        <label :class="['form-group', { focused: isFocused || internalValue }]">
            <template v-if="placeholder">
                <span class="label">{{ placeholder }}</span>
            </template>
            <template v-if="icon">
                <span class="input-icon icon" v-html="icon" />
            </template>
            <input :type="type" v-model="internalValue" @focus="onFocus" @blur="onBlur" />
        </label>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';

const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void;
}>();

const props = defineProps<{
    modelValue: string;
    type?: string;
    placeholder?: string;
    icon?: string;
}>();

const type = props.type || 'text';
const internalValue = ref(props.modelValue);
const isFocused = ref(false);

watch(internalValue, (newValue) => {
    emit('update:modelValue', newValue);
});

const onFocus = () => {
    isFocused.value = true;
};

const onBlur = () => {
    isFocused.value = false;
};
</script>

<style lang="scss" scoped>
input {
    @apply block w-full border border-gray-light hover:border-[#BDBDBD] focus:border-primary rounded bg-white text-xs leading-4 transition-colors duration-300 ease-in-out outline-none px-4 h-10;
}
.form-group {
    @apply block relative;
    .label {
        @apply absolute top-3 left-3 m-0 px-1 text-gray-dark bg-transparent text-xs leading-4 whitespace-nowrap pointer-events-none transition-all duration-300 ease-in-out will-change-transform z-1 text-ellipsis overflow-hidden;
        max-width: calc(100% - 24px);
    }
    &.focused {
        .label {
            transform: translateY(-20px);
            font-size: 10px;
            @apply bg-white;
        }
        .input-icon {
            @apply opacity-0 invisible;
        }
    }
}
.input-icon {
    @apply transition-all duration-200 absolute top-0 right-4 w-4 h-10 text-gray-dark pointer-events-none;
}
</style>

<template>
    <div class="loader"></div>
</template>

<style lang="scss" scoped>
.loader {
    @apply rounded-full bg-gray-dark w-[35px] p-[5px];
    aspect-ratio: 1;
    mask:
        conic-gradient(#0000 10%, #000),
        linear-gradient(#000 0 0) content-box;
    mask-composite: subtract;
    animation: spinner 1s infinite linear;
}
@keyframes spinner {
    to {
        transform: rotate(1turn);
    }
}
</style>

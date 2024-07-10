<script setup>
    import { defineProps } from 'vue';

    const props = defineProps({
        ariaLabel: String,
    });
</script>

<template>
    <button :aria-label="props.ariaLabel">
        <slot></slot>
    </button>
</template>

<style lang="scss" scoped>
  button{
    $transition: .1s ease-in;
    transition: $transition;
    color: grey;
    font-weight: 700;
    border: 1px solid white;
    padding: 10px 35px;
    border-radius: 5px;
    background-color: transparent;
    min-width: max-content;

    &:hover, &:focus, &:active{
        color: white;
        outline: none;
        background-image: linear-gradient(to bottom right, rgb(205,116,0), rgb(253,157,34));
    }
    &:hover{
        cursor: pointer;
    }
    }
</style>
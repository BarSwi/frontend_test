<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  modifierClass: String
});
</script>

<template>
        <div :class="['block-wrapper', props.modifierClass]" id="first-block-wrapper">
            <div id="block-wrapper-title">
                <strong>{{ props.title }}</strong>
            </div>
            <slot></slot>
        </div>
      
</template>

<style lang="scss" scoped>
    .block-wrapper{
        width: 25vw;
        font-size: 1rem;
        #block-wrapper-title{
            font-size: 0.75em;
            margin: 5vh 0 7vh 0;
        }
        margin: 5vh 0 5vh 0;
        &:first-of-type{
            margin: 5vh 1vw 5vh 5vw;
        }
        &:last-of-type{
            margin: 5vh 5vw 5vh 1vw;
        }
    }

    .too-long #block-wrapper-title{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
</style>
<script setup>
import { defineProps } from 'vue';

const props = defineProps({
  title: String,
  modifierClass: String
});
</script>

<template>
        <div :class="['block-wrapper-inside', props.modifierClass]">
            <div class="block-wrapper-title">
                <strong>{{ props.title }}</strong>
            </div>
            <slot></slot>
        </div>
      
</template>

<style lang="scss" scoped>
    .block-wrapper-inside{
        text-align: center;
        font-size: 1rem;
        .block-wrapper-title{
            font-size: 0.75em;
            margin: 5vh 0 7vh 0;
        }
    }
    .too-long .block-wrapper-title{
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }

    @media (max-width: 1025px) {
       .block-wrapper-title{
        margin: 5vh 0 !important;
       }
    }
</style>
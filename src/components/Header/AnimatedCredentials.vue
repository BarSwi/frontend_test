<script setup>
    import EventBus from '@/EventBus';
    import {ref} from 'vue';
    const shown = ref(false);

    EventBus.$on("showCredentials", (flag) => {
        shown.value = flag;
    });
</script>

<template>
    <div id="animated-credentials-title">
        Zadanie <strong>rekrutacyjne</strong>
    </div>
    <div v-if="shown" id="animated-credentials-name">
        Bartosz Świtała
    </div>
</template>

<style lang="scss" scoped>
    #animated-credentials-name{
        text-align: right;
    }

    @media (max-width: 370px) {
        #animated-credentials-title{
            text-align: right;
        }
    }
</style>
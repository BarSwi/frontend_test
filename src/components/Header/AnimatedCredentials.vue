<script setup>
    import EventBus from '@/EventBus';
    import {onMounted, onUnmounted, ref} from 'vue';
    const shown = ref(false);

    const addShowCredentialsListener = () =>{
        EventBus.$on('showCredentials', handleShowCredentials);
    }

    const handleShowCredentials = (flag) =>{
        shown.value = flag;
    }

    onMounted(()=>{
        addShowCredentialsListener();
    })
    onUnmounted(() =>{
        EventBus.$off('showCredentials', handleShowCredentials);
    })
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
<script setup>
import { onMounted,onUnmounted, ref } from 'vue';
import MenuSettings from './MenuSettings.vue';
import EventBus from '@/EventBus';
    const isBodyScrollable = ref(false);
    const checkScrollability = () => {
        const bodyHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        isBodyScrollable.value = bodyHeight > windowHeight;
    };

    EventBus.$on("windowSizeChanged", () => {
        window.requestAnimationFrame(() => {
            checkScrollability();
        });
    });

    onMounted(() => {
        checkScrollability();
        window.addEventListener('resize', checkScrollability);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', checkScrollability);
    });


</script>

<template>
    <footer :class="{'__fixed': !isBodyScrollable}">
        <div id="footer-left">
            <div class = "inner-text">
                CSS<br>IS<br>AWESOME
            </div>
        </div>
        <div id = "footer-middle">
            <span id = "footer-middle-text">nabthat</span>
        </div>
        <menu-settings></menu-settings>
    </footer>
</template>

<style lang="scss" scoped>
    footer{
        $color: rgb(42, 45, 50);
        padding: 15px 3vw;
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 50px;
        background-color: rgb(21,22,26);
        width: 94vw;
        #footer-left{
            border: 1px solid $color;
            //Niecodzienne, ale zachowa stosunek do tego overflow
            width: 3.5rem;
            .inner-text {
                padding: 0 10px;
                color: $color; 
                font-size: 0.8rem; 
                font-weight: 400;
            }
        }
        &.__fixed{
            position: fixed;
            bottom: 0;
        }

        #footer-middle{
               color: $color;
               position: relative;
               text-align: center;
               &:after, &:before{
                    content: '';
                    height: 1px;
                    background-color: $color;
                    width: 3vw;
                    display: block;
                    position: absolute;
                    bottom: 14px;
               }
               &:after{
                left: 105%;
               }
               &:before{
                right: 105%;
               }
        }

    }
</style>
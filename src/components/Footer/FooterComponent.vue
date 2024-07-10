<script setup>
import { onMounted,onUnmounted, ref } from 'vue';
import MenuSettings from './MenuSettings.vue';
import EventBus from '@/EventBus';
    const isBodyScrollable = ref(false);
    const checkScrollability = () => {
        const bodyHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        const footerHeight = document.getElementsByTagName("footer")[0].clientHeight;
        isBodyScrollable.value = isBodyScrollable.value ? bodyHeight > windowHeight : bodyHeight > windowHeight - footerHeight;
        console.log(windowHeight, bodyHeight, footerHeight);
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
        height: 85px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        background-color: rgb(21,22,26);
        width: 94vw;
        min-width: 370px;
        #footer-left{
            $trainsition: .5s ease-in-out;
            border: 1px solid $color;
            transition: $trainsition;
            //Not the most usual solution but easiest way to achieve desired effect
            width: 3.5rem;
            .inner-text {
                transition: $trainsition;
                padding: 0 10px;
                color: $color; 
                font-size: 0.8rem; 
                font-weight: 400;
            }

            &:hover{
                transform: rotate(360deg);
                border-color: rgb(158,125,82);
                .inner-text{
                    transform: rotate(-360deg);
                }
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

    @media (max-width: 960px) {
            #footer-middle{
                display: none;
            }
        }
    @media (max-width: 450px){
        footer{
            justify-content: space-around;
            width: 100vw;
            row-gap: 20px;
            padding: 15px 0 !important;
        }
    }
</style>
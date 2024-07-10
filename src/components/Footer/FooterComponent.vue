<script setup>
import { onMounted,onUnmounted, ref } from 'vue';

    const isBodyScrollable = ref(false);
    const checkScrollability = () => {
        const bodyHeight = document.body.scrollHeight;
        const windowHeight = window.innerHeight;
        isBodyScrollable.value = bodyHeight > windowHeight;
    };

    onMounted(() => {
        checkScrollability();
        window.addEventListener('resize', checkScrollability);
    });

    onUnmounted(() => {
        window.removeEventListener('resize', checkScrollability);
    });
</script>

<template>
    <footer :class="['', isBodyScrollable ? '' : '__fixed']">
        <div id="footer-left">
            <div class = "inner-text">
                CSS<br>IS<br>AWESOME
            </div>
        </div>
        <div id = "footer-middle">
            <span id = "footer-middle-text">nabthat</span>
        </div>
        <div id = "footer-right">
                <div id="footer-right-menu">
                    <input type ="checkbox" id = "toggle-menu"/>
                    <div id = "toggle-menu-wrapper">
                        <label for="toggle-menu" id = "toggle-menu-label">
                            <span id = "toggle-label-text">
                            POKAŻ
                            </span>
                            <font-awesome-icon aria-hidden="true" :icon="['fas', 'angle-up']" class = "icon icon__main" />
                        </label>
                        <ul>
                                <li>
                                    <button id = "reset-settings-btn"></button>
                                    <label for="reset-settings-btn">
                                        <font-awesome-icon aria-hidden="true" :icon="['fas', 'angle-up']" class = "icon icon__right" />
                                        <span>ZRESETUJ USTAWIENIA</span>
                                    </label>
                                </li>
                                <li>
                                    <button id = "show-credentials"></button>
                                    <label for="show-credentials">
                                        <font-awesome-icon aria-hidden="true" :icon="['fas', 'angle-up']" class = "icon icon__right" />
                                        <span>POKAŻ DANE OSOBOWE</span>
                                    </label>
                                </li>
                        </ul>
                    </div>
                 
                </div>
        </div>
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

        #footer-right{
            font-size: 0.65rem;
            display: flex;
            margin-left: -10vw;

            label{
                display: block;
                padding: 1vh 0vw;
                width: 13vw;
                text-align: center;
                border: 1px solid $color;

                &:hover{
                cursor: pointer;
            }
            }
            input{
                opacity: 0;
                position: absolute;
            }
            .icon{
                transition: .1s ease-in;

                &__right{
                    transform: rotate(90deg);
                }
            }
            #toggle-label-text{
                padding: 0 10px 0 0;
            }
            input:checked{
                + #toggle-menu-wrapper .icon__main{
                    transform: rotate(180deg);
                }
                + #toggle-menu-wrapper{
                    ul{
                        display: block;
                    }
                }
            }
            #toggle-menu-wrapper{
                ul{
                    display: none;
                    border-radius: 3px 3px 0 0;
                    list-style: none;
                    font-size: 0.5rem;
                    padding: 0;
                    position: absolute;
                    bottom: 90%;
                    width: 11vw;
                    padding: 2vh 1vw;
                    background-color: white;
                    color: black;
                    text-align: left;

                    li{
                        font-weight: 400;
                        padding: 2px;
                        word-wrap: break-word;
                        label{
                            width: 11vw;
                            word-wrap: break-word;
                            border: none;
                            padding: 0;  
                            text-align: left;
                        }
                        span{
                            padding: 0 0 0 5px;
                        }
                        button{
                            opacity: 0;
                            position: absolute;
                            border: none;
                            outline: none;

                            &:focus, &:active{
                                + label{
                                    color: orange;
                                }
                            }
                        }
                        &:hover{
                            color: orange;
                            cursor: pointer;
                        }
                    }
                }
                
            }
        }
    }
</style>
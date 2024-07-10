<script setup>
    import EventBus from '@/EventBus';
    import {ref, watchEffect, onMounted, onUnmounted} from 'vue';

    const credentialsFlag = ref(false);
    const isMenuOpen = ref(false);

    //Once again I am using EventBus because the task is small so additional store would be an overkill
    const resetSettings = () => {
        credentialsFlag.value=false;
        EventBus.$emit('resetSettings');
        EventBus.$emit("windowSizeChanged");
    }
    const toggleCredentials = () =>{
        credentialsFlag.value = !credentialsFlag.value;
    }

    const handleCheckboxChange = (event) => {
        isMenuOpen.value = event.target.checked;
    };
    watchEffect(() => {
        EventBus.$emit('showCredentials', credentialsFlag.value);
    });


    onMounted(() => {
        const toggleMenu = document.getElementById('toggle-menu');
        if (toggleMenu) {
            toggleMenu.addEventListener('change', handleCheckboxChange);
        }
    });

    onUnmounted(() => {
        const toggleMenu = document.getElementById('toggle-menu');
        if (toggleMenu) {
            toggleMenu.removeEventListener('change', handleCheckboxChange);
        }
    });

</script>

<template>
<div id = "footer-right">
    <div id="footer-right-menu">
        <input type ="checkbox" id = "toggle-menu" aria-controls="toggle-menu-wrapper" :aria-expanded="isMenuOpen"/>
        <div id = "toggle-menu-wrapper">
            <label for="toggle-menu" id = "toggle-menu-label">
                <span id = "toggle-label-text">
                POKAŻ
                </span>
                <font-awesome-icon aria-hidden="true" :icon="['fas', 'angle-up']" class = "icon icon__main" />
            </label>
            <ul>
                    <li>
                        <button id = "reset-settings-btn" @click ="resetSettings" aria-label="Zresetuj ustawienai strony"></button>
                        <label for="reset-settings-btn">
                            <font-awesome-icon aria-hidden="true" :icon="['fas', 'angle-up']" class = "icon icon__right" />
                            <span>ZRESETUJ USTAWIENIA</span>
                        </label>
                    </li>
                    <li>
                        <button id = "show-credentials" @click="toggleCredentials" aria-label="Pokaz dane osobowe"></button>
                        <label for="show-credentials">
                            <font-awesome-icon aria-hidden="true" :icon="['fas', 'angle-up']" class = "icon icon__right" />
                            
                            <span>{{!credentialsFlag ?  "POKAŻ DANE OSOBOWE" : "SCHOWAJ DANE OSOBOWE"}}</span>
                        </label>
                    </li>
            </ul>
        </div>
    </div>
</div>

</template>

<style lang = "scss" scoped>
  #footer-right{
        position: relative;
        $color: rgb(42, 45, 50);
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

            &:checked{
                + #toggle-menu-wrapper .icon__main{
                transform: rotate(180deg);
                }
                + #toggle-menu-wrapper{
                    ul{
                        display: block;
                        opacity: 1;
                        bottom: 155%;
                    }
                }
            }
            
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
        #toggle-menu-wrapper{
            ul{

                //Since I cannot do that with JS it is harder to achieve desired stacking context for my ul to be BEHIND the footer itself. 
                //So it does not look as good as it could.
                transition: .2s ease-in-out;
                position: absolute;
                z-index: -5;
                display: block;
                opacity: 0;
                border-radius: 3px 3px 0 0;
                list-style: none;
                font-size: 0.5rem;
                bottom: 70%;
                left: 1px;
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
</style>
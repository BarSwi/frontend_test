<script setup>
    import AnimatedCredentials from './AnimatedCredentials.vue';
</script>

<template>
    <header>
        <div id="header-wrapper">
            <div>
                <a href="/" id="icon-wrapper">
                    <font-awesome-icon :icon="['fab', 'html5']" class="icon icon__html5" />
                </a>
            </div>
            <div id="animated-credentials-wrapper">
                <animated-credentials/>
            </div>
        </div>
    </header>

</template>

<style lang="scss" scoped>
    #header-wrapper{
        position: sticky;
        display: flex;
        gap: 1vw;
        justify-content: space-between;
        align-items: center;
        background-color: black;
        width: 100vw;   
        min-height: calc(5vh + 1rem);
        margin: 0;
        #icon-wrapper{      
            display: block;
            transition: background-color .2s ease-in;
            margin: 10px 0 10px 30px;  
            height: 40px;
            width: 40px;
            position: relative;

            background-color: rgb(43, 38, 38);
            border-radius: 50%;
            padding: 15px;
            .icon{
                position: absolute;
                inset: 13px 15px;
                &__html5{
                    font-size: 2rem;
                    color: white;

                }
            }   
            &:hover{
                cursor: pointer;
                background-color: orange;
            }
        }
      
    }

    #animated-credentials-wrapper{
        margin: 10px 30px 10px 0;  
    }
</style>
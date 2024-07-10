<script setup>
    import BaseBlock from './BaseBlock.vue'
    import FirstBlock from './FirstBlock.vue'
    import SecondBlock from './SecondBlock.vue'
    import ThirdBlock from './ThirdBlock.vue'
</script>

<template>
    <h1 id ="header" class ="header header--home">
        Nagłówek H1
    </h1>

    <main>
        <div id = "blocks-wrapper">
            <div class="block-wrapper">
                <base-block title="BLOK PIERWSZY">
                    <first-block/>
                </base-block>
            </div>
            <div class="block-wrapper">
                <base-block title="BLOK DRUGI">
                    <second-block/>
                </base-block>
            </div>
            <div class="block-wrapper">
                <base-block title="BLOK Z DŁUGĄ NAZWĄ KTÓRA SAMA SIĘ PRZYTNIE" class="too-long">
                    <third-block/>
                </base-block>
            </div>
        </div>
    </main>
</template>

<style lang="scss" scoped>
    .header{
        text-align: center; 
        &--home{
            margin: 0 auto;
            width: max-content;
            font-weight: normal;
            font-size: 1.5rem;
            position: relative; 
            display: block; 
            padding: 15px 0;
            &:after{
                position: absolute;
                bottom: 0;
                right: 10%;
                content: '';
                width: 80%;
                height: 1px;
                background-color: white;
            
            }
        }
    }

    #blocks-wrapper{
        display: flex;
        justify-content: space-between;
        flex-wrap: wrap;
        
        .block-wrapper{
            width: 25vw;
            min-width: 250px;
            margin: 5vh 0 5vh 0;
            &:first-of-type{
            margin: 5vh 1vw 5vh 5vw;
            }
            &:last-of-type{
                margin: 5vh 5vw 5vh 1vw;
            }
        }

        
    }

    @media (max-width: 1025px) {
        #blocks-wrapper{
            justify-content: space-evenly;

            .block-wrapper{
                width: 30vw;
                margin: 3vh 2vw !important;
                &:last-of-type{
                    width: 50vw;
                }
            }
        }

    }

    @media (max-width: 370px) {
        #blocks-wrapper{
            justify-content: center;
        }
    }
</style>
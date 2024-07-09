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
            <base-block title="BLOK PIERWSZY">
                <first-block/>
            </base-block>
            <base-block title="BLOK DRUGI">
                <second-block/>
            </base-block>
            <base-block title="BLOK Z DŁUGĄ NAZWĄ KTÓRA SAMA SIĘ PRZYTNIE" class="too-long">
                <third-block/>
            </base-block>
        </div>
    </main>
</template>

<style lang="scss" scoped>
    .header{
        color: white;
        &--home{
            font-weight: normal;
            font-size: 1.5rem;
            position: relative; 
            display: inline-block; 
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
    }
</style>
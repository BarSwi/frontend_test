<script setup>
    import EventBus from '@/EventBus';
    import {ref} from 'vue';


    const selectedOption = ref('');

    //EventBus zamiast centralizowanego Vuex, ze względu na w miarę szybki setup i mały rozmiar zadania
    EventBus.$on('optionChanged', (newOption) => {
        selectedOption.value = newOption;
    });
    
    const validator = () =>{
        if(selectedOption.value===''){
            alert("Nie wybrano żadnej opcji! (Blok pierwszy)");
            return;
        }
    }
    const addSentenceToThird = () => {
        validator();
        EventBus.$emit('addSentence', selectedOption.value);
    }

    const switchSentencesThird = () =>{
        validator();
        EventBus.$emit('switchSentence', selectedOption.value);
    }
</script>

<template>
    <div id="btn-wrapper">
        <button @click="switchSentencesThird">
            ZASTĄP
        </button>
        <button @click="addSentenceToThird">
            DOKLEJ
        </button>
    </div>
</template>

<style lang="scss" scoped>
    $transition: .1s ease-in;
    #btn-wrapper{
        display: flex;
        justify-content: center;
        gap: 2vw;
        flex-wrap: wrap;

        button{
            transition: $transition;
            color: grey;
            font-weight: 700;
            border: 1px solid white;
            padding: 10px 35px;
            border-radius: 5px;
            background-color: transparent;
            min-width: max-content;

            &:hover, &:focus, &:active{
                color: white;
                background-image: linear-gradient(to bottom right, rgb(205,116,0), rgb(253,157,34));
            }
            &:hover{
                cursor: pointer;
            }
        }
    }

</style>
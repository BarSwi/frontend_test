<script setup>
    import EventBus from '@/EventBus';
    import {ref} from 'vue';


    const selectedOption = ref('');

    //Once again I am using EventBus because the task is small so additional store would be an overkill
    EventBus.$on('optionChanged', (newOption) => {
        selectedOption.value = newOption;
    });
    
    const validator = () =>{
        if(selectedOption.value===''){
            alert("Nie wybrano żadnej opcji! (Blok pierwszy)");
            return false;
        }
        return true;
    }
    const addSentenceToThird = () => {
        if (validator()) EventBus.$emit('addSentence', selectedOption.value);
      
    }

    const switchSentencesThird = () =>{
        if (validator())  EventBus.$emit('switchSentence', selectedOption.value);
       
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
                outline: none;
                background-image: linear-gradient(to bottom right, rgb(205,116,0), rgb(253,157,34));
            }
            &:hover{
                cursor: pointer;
            }
        }
    }

</style>
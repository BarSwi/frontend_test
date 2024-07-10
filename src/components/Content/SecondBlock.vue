<script setup>
    import CustomButton from '@/components/Utils/CustomButton.vue'
    import EventBus from '@/EventBus';
    import {onMounted, onUnmounted, ref} from 'vue';


    const selectedOption = ref('');

    //Once again I am using EventBus because the task is small so additional store would be an overkill
    const addOptionChangeListener = () => {
        EventBus.$on('optionChanged', handleChangeOption)
    }

    const handleChangeOption = (newOption) =>{
        selectedOption.value = newOption;
    }


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

    onMounted(() =>{
        addOptionChangeListener();
    });

    onUnmounted(() =>{
        EventBus.$off('optionChanged', handleChangeOption)
    })
</script>

<template>
    <div id="btn-wrapper">
        <custom-button @click="switchSentencesThird" aria-label="Zastąp zdanie w bloku trzecim, wybranym zdaniem">
            ZASTĄP
        </custom-button>
        <custom-button @click="addSentenceToThird" aria-label="Doklej do trzeciego bloku wybrane zdanie">
            DOKLEJ
        </custom-button>
    </div>
</template>

<style lang="scss" scoped>
    #btn-wrapper{
        display: flex;
        justify-content: center;
        gap: 2vw;
        flex-wrap: wrap;
    }

</style>
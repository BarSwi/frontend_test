<script setup>
import EventBus from '@/EventBus';
import { ref, computed } from 'vue';
const sentences = ref([]);

    const getItemByIndex = (index, storage) => {
        return storage[index];
    };

    const getRandomItem = (storage) => {
        if (sentences.value.length >= storage.length) {
            alert("Nie ma z czego losować.");
            return;
        }

        let newItem = '';
        let foundFlag = false;

        while (!foundFlag) {
            const randomIndex = Math.floor(Math.random() * storage.length);
            newItem = storage[randomIndex];
            foundFlag = !sentences.value.includes(newItem);
        }

        return newItem;
    };

    const getItem = (option) =>{
        const sentencesStorage = JSON.parse(localStorage.getItem('sentences'));
        let newItem = '';

        if (option === 'option1') {
            newItem = getItemByIndex(0, sentencesStorage);
        } else if (option === 'option2') {
            newItem = getItemByIndex(1, sentencesStorage);
        } else if (option === 'option3') {
            newItem = getRandomItem(sentencesStorage);
        }

        return newItem;
    }
    
    //Once again I am using EventBus because the task is small so additional store would be an overkill
    EventBus.$on('addSentence', (option) => {
        let newItem = getItem(option);
        if(!newItem) return;
        
        if(sentences.value.includes(newItem)){
            alert(`Zdanie: ${newItem} znajduje się w bloku trzecim!`)
            return;
        }
        sentences.value.push(newItem);
    });

    EventBus.$on("switchSentence", (option) =>{
        sentences.value.splice(0, sentences.value.length); 
        let newItem = getItem(option);
        sentences.value.push(newItem); 
    });

    EventBus.$on("resetSettings", () =>{
        sentences.value.splice(0, sentences.value.length); 
    }); 


    const sortedSentences = computed(() =>
    sentences.value.slice().sort((a, b) => a.localeCompare(b))
    );



</script>

<template>
     <div v-for="(sentence, index) in sortedSentences" :key="index" class="sentence-item">
      {{ sentence }}
    </div>
</template>

<style lang="scss" scoped>
    .sentence-item{
        color: grey;
        font-size: 0.6rem;
    }
</style>
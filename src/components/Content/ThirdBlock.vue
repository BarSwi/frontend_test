<script setup>
import EventBus from '@/EventBus';
import { ref, computed } from 'vue';
const sentences = ref([]);

const getItem = (option) =>{
    let newItem = '';
    const sentencesStorage = JSON.parse(localStorage.getItem('sentences'));
    if(option==='option1'){
        newItem = sentencesStorage[0];
    }
    else if(option==='option2'){
        newItem = sentencesStorage[1];
    }
    if(option==='option3'){
        let firstFlag = true;
        const secondFlag = sentences.value.length < sentencesStorage.length;

        if(!secondFlag){
            alert("Nie ma z czego losować");
            return;
        }
        while(firstFlag){
            const randomIndex = Math.floor(Math.random() * sentencesStorage.length);
            newItem = sentencesStorage[randomIndex];
            firstFlag = sentences.value.includes(newItem) ? true : false;
        }
    }
    return newItem;
}
//EventBus zamiast centralizowanego Vuex, ze względu na w miarę szybki setup i mały rozmiar zadania
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
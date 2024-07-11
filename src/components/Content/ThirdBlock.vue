<script setup>
import EventBus from '@/EventBus';
import { ref, computed, onUnmounted, onMounted } from 'vue';
const sentences = ref([]);

    const getItemByIndex = (index, storage) => {
        if(!storage[index]) alert(`LocalStorage nie zawiera elementu numer: ${index+1}`);
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


    const handleAddSentence = (option) => {
        let newItem = getItem(option);
        if (!newItem) return;

        if (sentences.value.includes(newItem)) {
            alert(`Zdanie: ${newItem} znajduje się w bloku trzecim!`);
            return;
        }
        sentences.value.push(newItem);
        EventBus.$emit('windowSizeChanged');
    };

    const handleSwitchSentence = (option) => {
        sentences.value.splice(0, sentences.value.length);
        let newItem = getItem(option);
        sentences.value.push(newItem);
        EventBus.$emit('windowSizeChanged');
    };

    const handleResetSettings = () => {
        sentences.value.splice(0, sentences.value.length);
    };

    //Once again I am using EventBus because the task is small so additional store would be an overkill
    const addSentenceListener = () => {
        EventBus.$on('addSentence', handleAddSentence);
    };

    const switchSentenceListener = () => {
        EventBus.$on('switchSentence', handleSwitchSentence);
    };

    const resetSettingsListener = () => {
        EventBus.$on('resetSettings', handleResetSettings);
    };


    const sortedSentences = computed(() =>
        sentences.value.slice().sort((a, b) => a.localeCompare(b))
    );

    onUnmounted(() => {
        EventBus.$off('addSentence', handleAddSentence);
        EventBus.$off('switchSentence', handleSwitchSentence);
        EventBus.$off('resetSettings', handleResetSettings);
    });

    onMounted(() => {
        addSentenceListener();
        switchSentenceListener();
        resetSettingsListener();
    });

</script>

<template>
    <div v-for="(sentence, index) in sortedSentences" :key="index" class="sentence-item">
        <p>{{ sentence }}</p>
    </div>
</template>

<style lang="scss" scoped>
    .sentence-item{
        color: grey;
        font-size: 0.6rem;
    }
</style>
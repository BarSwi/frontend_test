<script setup>
    import {ref, onMounted} from 'vue';
    import CustomButton from '@/components/Utils/CustomButton.vue';
    const storageList = ref([]);
    const selectedIndex = ref(0);
    const savedSelectedIndex = ref(0);
    const textarea = ref("");
    const editSentenceMode = ref(false);
    const getItems = () => {
        let counter = 0;
        const tryRetrieve = () => {
            const storedItems = localStorage.getItem('sentences');
            if (storedItems) {
            storageList.value = JSON.parse(storedItems);
            } else if (counter < 3) { 
                counter++;
                setTimeout(tryRetrieve, 1000); 
            } else {
                alert("Failed to fetch data");
            }
        };
        tryRetrieve();
    }
    const validator = (tekst) =>{
        const message = editSentenceMode.value ? "Tekst edytowany nie może być pusty" : "Tekst do dodania nie może być pusty";
        if(tekst.length === 0 ){
            alert(message);
            return false;
        }

        const index = storageList.value.indexOf(tekst);
        if(index>=0 && !(editSentenceMode.value === true && index === savedSelectedIndex.value)){
            alert(`Zdanie ${tekst} znajduje się w magazynie pod numerem: ${index+1}`);
            return false;
        }

        return true;
    }
    const saveToStorage = (array) => {
        localStorage.setItem("sentences", JSON.stringify(array));
    }
    const handleAddSentence = () =>{
        if(!validator(textarea.value)) return;

        storageList.value.push(textarea.value);
        saveToStorage(storageList.value);
        textarea.value = '';
    }

    const handleRemoveSentence = () =>{
        storageList.value.splice(selectedIndex.value, 1);
        saveToStorage(storageList.value);
    }

    const handleEditSentence = () => {
        //Safety reasons
        savedSelectedIndex.value = selectedIndex.value;

        editSentenceMode.value = true;
        textarea.value = storageList.value[selectedIndex.value];
    }

    const editSentenceExecutor = () =>{
        if(!validator(textarea.value)){
            textarea.value = storageList.value[selectedIndex.value];
            return;
        }

        storageList.value[savedSelectedIndex.value] = textarea.value;
        saveToStorage(storageList.value);
        editSentenceRollback();
    }

    const editSentenceRollback = () =>{
        editSentenceMode.value = false;
        textarea.value = '';
    }
    onMounted(() => {
        getItems();
    });
</script>

<template>
    <div id = "editor-wrapper">
        <div id = "editor-content-list" class = "editor-menu-element">
            <h3>Lista tekstu z local storage</h3>
            <ol>
                <li v-for="(sentence, index) in storageList" :key="index">
                    <input
                        type="radio"
                        :id="'sentence'+ (index+1)"
                        name="sentences"
                        :value="index"
                        v-model="selectedIndex"
                        :aria-label="'Wybór zdania: ' + sentence"
                    />
                    <label :for="'sentence'+(index+1)">
                        {{ sentence }}
                    </label>
                </li>
            </ol>
        </div>
        <div id ="editor-content-configurator" class = "editor-menu-element">
            <div v-if="!editSentenceMode" id="main-btn-panel">
                <custom-button @click="handleAddSentence">Dodaj</custom-button>
                <custom-button @click="handleEditSentence">Edytuj</custom-button>
                <custom-button @click="handleRemoveSentence">Usuń</custom-button>
            </div>
            <div v-else id="main-btn-panel">
                <custom-button @click="editSentenceExecutor">Zapisz</custom-button>
                <custom-button @click="editSentenceRollback">Cofnij</custom-button>
            </div>
            <div id="editor-text-field">
                <textarea placeholder = "Wprowadź tekst do dodania" v-model="textarea"></textarea>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    #editor-wrapper{
        font-size: 1rem;
        display: flex;
        justify-content: space-around;    
        margin-top: 30px;
        gap: 2vw;
        flex-wrap: wrap;
        #editor-content-list{
            text-align: center;
            input{
                opacity: 0;
                position: fixed;
            }
            ol{
                height: 50vh;
                font-size: 1em;
                overflow-y: auto;
            }
            li{
                opacity: 0.6;
                border-radius: 5px;
                &:nth-of-type(odd){
                    background-color: rgb(50, 53, 61);
                }
                &:has(input:checked){
                    opacity: 1;
                }


                label{
                    padding: 10px 5px;
                    display: block;
                    width: calc(100% - 10px);
                    &:hover{
                        cursor: pointer;
                    }
                }

            }
        }

        #main-btn-panel{
            margin-top: 30px;
            display: flex;
            justify-content: center;
            gap: 2vw;
            flex-wrap: wrap;
        }

        .editor-menu-element{
            min-width: 300px;
            width: 45vw;
        }

        #editor-text-field{
            textarea{
                resize: none;
                font-size: 1em;    
                opacity: 0.6;
                width: 70%;
                height: 20vh;
                margin: 5vh auto;
                display: block;

                &:focus, &:hover, &:active{
                    outline: none;
                    opacity: 1;

                }
            }

        }
    }
    @media (max-width: 960px) {
        #editor-wrapper{
            font-size: 0.8rem;
        }
        textarea{
            width: 90% !important;
        }
        .editor-menu-element{
            width: 75vw !important;
        }
    }
</style>
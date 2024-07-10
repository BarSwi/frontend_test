<script setup>
    import {ref, onMounted} from 'vue';
    import CustomButton from '@/components/Utils/CustomButton.vue';
    const storageList = ref([]);
    const selectedIndex = ref(0);
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
    
    onMounted(() => {
        getItems();
    });
</script>

<template>
    <div id = "editor-wrapper">
        <div id = "editor-content-list" class = "editor-menu-element">
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
            <div id="main-btn-panel">
                <custom-button>Dodaj</custom-button>
                <custom-button>Edytuj</custom-button>
                <custom-button>Usuń</custom-button>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
    #editor-wrapper{
        display: flex;
        justify-content: space-around;    
        margin-top: 30px;
        gap: 2vw;
        flex-wrap: wrap;
        #editor-content-list{
            input{
                opacity: 0;
                position: fixed;
            }
            ol{
                height: 50vh;
                overflow-y: scroll;
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
    }

    .editor-menu-element{
        min-width: 300px;
        width: 45vw;
    }
</style>
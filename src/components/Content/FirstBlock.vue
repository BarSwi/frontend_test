<script setup>
import EventBus from '@/EventBus';
import { ref, watchEffect } from 'vue';

const options = [
  { value: 'option1', text: 'Opcja pierwsza' },
  { value: 'option2', text: 'Opcja druga' },
  { value: 'option3', text: 'Opcja losowa' }
];

const selectedOption = ref('');
watchEffect(() => {
    EventBus.$emit('optionChanged', selectedOption.value);
});
</script>

<template>
        <div v-for="option in options" :key="option.value" class="radio-option">
            <input
                type="radio"
                :id="option.value"
                name="options"
                :value="option.value"
                v-model="selectedOption"
            />
            
            <label :for="option.value">
                {{ option.text }}
                <span class = "checkmark"></span>
            </label>
        </div>
</template>

<style lang="scss" scoped>

    $transition: 0.1s ease-in;
    .radio-option{
        font-size: 0.7em;
        font-weight: 300;
        padding: 0 0 20px 10px;
        position: relative;
        display: flex;
        justify-content: left;
        align-items: center;
        gap: 1vw;
        
        label{
            &:hover{
                cursor: pointer;
                font-weight: 400;
                .checkmark::after{
                    opacity: 1;
                }
            }
        }
        &:last-of-type{
            padding: 0 0 0 10px;  
        }
        input{
            opacity: 0; 
            &:focus-visible, &:checked{
                + label {
                    font-weight: 400;
                    .checkmark::after{
                        opacity: 1;
                    }
                }
            } 
        }

        .checkmark{
            position: absolute;
            top: 0;
            left: 0;
            height: 20px;
            width: 20px;
            border: 4px solid white;
            border-radius: 50%;
                
            //Tutaj perfekcjonizm mi nakazuje zrobić pixel perfect
            &::after{
                transition: opacity $transition;
                position: absolute;
                opacity: 0;
                content: '';
                top: 3px;
                left: 3.5px;
                border-radius: 50%;
                background-color: white;
                width: 13px;
                height: 13px;
            }

        }
    }
</style>
<template>
  <HomePage />
</template>

<script>
import HomePage from './pages/HomePage.vue';
import sentencesData from '@/zdania.json';

const storeSentencesInLocalStorage = (sentences) => {
  localStorage.setItem('sentences', JSON.stringify(sentences));
};

storeSentencesInLocalStorage(sentencesData);
export default {
  name: 'App',
  components: {
    HomePage
  }
}
</script>

<style lang="scss">
html{
  font-size: 25px;
}
body{
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
  font-family: 'Open Sans', sans-serif;


  background-color: rgb(42, 45,54);
  margin: 0;
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: white;
}
</style>

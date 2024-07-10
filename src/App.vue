<template>
  <header-component/>
  <RouterView />
  <footer-component/>
</template>

<script>
import FooterComponent from './components/Footer/FooterComponent.vue';
import HeaderComponent from './components/Header/HeaderComponent.vue';
import sentencesData from '@/zdania.json';

const storeSentencesInLocalStorage = (sentences) => {
  localStorage.setItem('sentences', JSON.stringify(sentences));
};

storeSentencesInLocalStorage(sentencesData);
export default {
  name: 'App',
  components: {
    FooterComponent,
    HeaderComponent
  }
}
</script>

<style lang="scss">
html{
  font-size: 25px;
  @media (max-width: 960px) {
    font-size: 23px;
  }
}
body{
  @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');
  font-family: 'Open Sans', sans-serif;

  overflow-x: hidden;
  background-color: rgb(42, 45,54);
  margin: 0;
  min-width: 370px;

  @media (max-width: 370px) {
    overflow-x: visible;
  }
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  //text-align: center;
  color: white;
}
</style>

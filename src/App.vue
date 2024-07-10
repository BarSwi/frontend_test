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
  @media (max-width: 370px) {
    font-size: 20px;
  }
}
body{
  font-family: 'Open Sans', sans-serif;
  overflow-x: hidden;
  background-color: rgb(42, 45,54);
  margin: 0;
  min-width: 320px;

  @media (max-width: 370px) {
    overflow-x: visible;
  }
}
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: white;
}
</style>

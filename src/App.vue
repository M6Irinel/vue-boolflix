<template>
  <div id="app">
    <div class="myNavbar">
      <div class="container navbar">
        <img class="c-pointer" src="./assets/logo1.png" alt="BOOLFLIX">
        <div class="text-end">
          <input class="form-control" v-model="query" @keyup.enter="request" type="text" placeholder="search...">
        </div>
      </div>
    </div>

    <cardsMovie />
  </div>
</template>


<script>
import store from './store.js';
import axios from 'axios';
import cardsMovie from './components/cards-movie.vue';

export default {
  name: 'App',

  components: {
    cardsMovie
  },

  data () {
    return {
      query: 'avengers'
    }
  },

  methods: {

    request () {
      this.requestAPI( 'movie' );
      this.requestAPI( 'tv' );
    },

    requestAPI ( typeSearch ) {
      if ( this.query.trim() === '' ) return;
      axios.get( `${ store.baseURL }${ typeSearch }`, {
        params: {
          api_key: store.api_key,
          query: this.query.trim()
        }
      } ).then( r => store[ typeSearch ] = r.data.results );
    }
  },

  beforeMount () {
    this.requestAPI( 'movie' );
    this.requestAPI( 'tv' );
  }
}
</script>


<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');

body {
  background-color: #141414 !important;
  color: #fff !important;
  font-family: 'Oswald', sans-serif;
}

.myNavbar {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  background: linear-gradient(#000000 20%, #000000ba 75%, #00000000);
}

.c-pointer {
  cursor: pointer;
}
</style>
<template>
  <div id="app">
    <div class="myNavbar">
      <div class="container navbar">
        <h1 class="text-center fw-bold">BOOLFLIX</h1>
        <div class="text-end">
          <input class="form-control mb-3" v-model="query" @keyup.enter="request" type="text" placeholder="search...">
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

  watch: {
    query () { store.query = this.query }
  },

  methods: {

    request () {
      this.requestApi( 'movie' );
      this.requestApi( 'tv' );
    },

    requestApi ( typeSearch ) {
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
    this.requestApi( 'movie' );
    this.requestApi( 'tv' );
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
  background-color: #00000087;
}

ul {
  padding: 0 !important;
}

.cards {
  position: relative;
  cursor: pointer;

  .myInfo {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;

    &:hover {
      background-color: #000000d3;
      opacity: 1;
    }

    .overview {
      height: 70%;
      overflow: auto;

      &::-webkit-scrollbar {
        appearance: none;
        width: 6px;
      }

      &::-webkit-scrollbar-track {
        appearance: none;
        background-color: #00000087;
      }

      &::-webkit-scrollbar-thumb {
        appearance: none;
        background-color: #fff;
        border-radius: 100px;
      }
    }
  }
}

h1 {
  color: #e50914;
}

h2 {
  font-size: 1.2rem;
}

.solidStars {
  color: #efcb00;
}

.regularStars {
  color: #b79b00;
}

.fs-7 * {
  font-size: 0.8rem;
}
</style>
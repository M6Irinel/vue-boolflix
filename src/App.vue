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


    <div class="container">
      <h3>Movie</h3>
      <ul class="row">
        <li class="cards col-6 col-md-4 col-lg-3 col-xl-2 overflow-hidden p-2" v-for="el in resultMovie" :key="el.id">
          <div class="height-block-img">
            <img class="img-fluid" :src="srcPoster(el)" :alt="el.title">
          </div>
          
          <div class="myInfo p-3 fs-7">
            <h2> <b>Titolo:</b> {{el.title}} </h2>
            <h4 v-if="el.title !== el.original_title"> <b>Titolo originale:</b> {{el.original_title}} </h4>

            <div class="d-flex gap-2">
              <div>
                <img :src="srcFlag(el.original_language)" width="16" height="12" :alt="el.original_language">
              </div>
            
              <div>
                <b>Voto: </b> 
                <span class="solidStars" v-for="star in starsVote(el)" :key="star">
                  <font-awesome-icon icon="fa-solid fa-star" />
                </span>
            
                <span class="regularStars" v-for="star2 in starsRest(el)" :key="(star2 + 5)">
                  <font-awesome-icon icon="fa-regular fa-star" />
                </span>
              </div>
            </div>

            <p class="overview">
              <b>Overview:</b> 
              {{el.overview}}
            </p>
          </div>
        </li>
      </ul>
    </div>

    <div class="container">
      <h3>Serie TV</h3>
      <ul class="row">
        <li class="cards col-6 col-md-4 col-lg-3 col-xl-2 overflow-hidden p-2" v-for="el in resultTV" :key="el.id">
          <div class="height-block-img">
            <img class="img-fluid" :src="srcPoster(el)" :alt="el.title">
          </div>
          
          <div class="myInfo p-3 fs-7">
            <h2> <b>Titolo:</b> {{el.name}} </h2>
            <h4 v-if="el.name !== el.original_name"> <b>Titolo originale:</b> {{el.original_name}} </h4>

            <div class="d-flex gap-2">
              <div>
                <img :src="srcFlag(el.original_language)" width="16" height="12" :alt="el.original_language">
              </div>
            
              <div>
                <b>Voto: </b> 
                <span class="solidStars" v-for="star in starsVote(el)" :key="star">
                  <font-awesome-icon icon="fa-solid fa-star" />
                </span>
            
                <span class="regularStars" v-for="star2 in starsRest(el)" :key="(star2 + 5)">
                  <font-awesome-icon icon="fa-regular fa-star" />
                </span>
              </div>
            </div>

            <p class="overview">
              <b>Overview:</b> 
              {{el.overview}}
            </p>
          </div>
        </li>
      </ul>
    </div>

  </div>
</template>


<script>
import store from './store.js';
import axios from 'axios';

export default {
  name: 'App',

  data () {
    return {
      query: 'avengers'
    }
  },

  watch: {
    query () { store.query = this.query }
  },

  computed: {
    resultMovie () { return store.movie },
    resultTV () { return store.tv },
  },

  methods: {
    srcFlag ( el ) {
      if ( el.toLowerCase() === 'en' ) el = 'gb';
      if ( el.toLowerCase() === 'el' ) el = 'gr';
      return `https://flagcdn.com/16x12/${ el.toLowerCase() }.png`;
    },

    starsVote ( el ) {
      return Math.floor( el.vote_average / 2 );
    },

    starsRest ( el ) {
      return ( 5 - this.starsVote( el ) );
    },

    srcPoster ( el ) {
      return `https://image.tmdb.org/t/p/w342${ el.poster_path }`;
    },

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

      &::-webkit-scrollbar {appearance: none;width: 6px;}
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
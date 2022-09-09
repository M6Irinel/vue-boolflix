<template>
  <div id="app" class="container mt-2">
    <h1 class="text-center fw-bold">BOOLFLIX</h1>
    <div class="text-end">
      <input class="form-control mb-3" v-model="query" @keyup.enter="request" type="text" placeholder="search...">
    </div>

    <div class="row">
      <ul class="list-group my-3 col-6">
        <h3>Movie</h3>
        <li class="list-group-item list-group-item-action" v-for="el in resultMovie" :key="el.id">
          <h2 class="fs-4 fw-bold"> Title: "{{el.title}}" </h2>
          <h3 v-if="el.title !== el.original_title"> Original title: "{{el.original_title}}" </h3>
          <div class="fw-bold text-uppercase"><span> Language: {{el.original_language}} <img :src="src(el.original_language)" width="16" height="12" :alt="el.original_language"> - </span> <span> Vote:
              {{el.vote_average}} </span></div>
        </li>
      </ul>

      <ul class="list-group my-3 col-6">
        <h3>Serie TV</h3>
        <li class="list-group-item list-group-item-action" v-for="el in resultTV" :key="el.id">
          <h2 class="fs-4 fw-bold"> Title: "{{el.name}}" </h2>
          <h3 v-if="el.name !== el.original_name"> Original title: "{{el.original_name}}" </h3>
          <div class="fw-bold text-uppercase"><span> Language: {{el.original_language}} <img :src="src(el.original_language)" width="16" height="12" :alt="el.original_language"> - </span> <span> Vote:
              {{el.vote_average}} </span></div>
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
      query: 'bella'
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
    src ( el ) {
      return `https://flagcdn.com/16x12/${el.toLowerCase()}.png`;
    },
    request () {
      this.requestApi( 'movie' );
      this.requestApi( 'tv' );
    },
    requestApi ( typeSearch ) {
      axios.get( `${ store.baseURL }${ typeSearch }`, {
        params: {
          api_key: store.api_key,
          query: this.query
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

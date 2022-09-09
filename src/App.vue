<template>
  <div id="app" class="container mt-2">
    <div class="text-end">
      <input class="form-control mb-3" v-model="query" @keyup.enter="requestApi" type="text" placeholder="search...">
    </div>
    <ul class="list-group">
      <li class="list-group-item list-group-item-action" v-for="el in resultAPI" :key="el.id">
        <h2 class="fs-4 fw-bold"> Title: "{{el.title}}" </h2>
        <h3 v-if="el.title !== el.original_title"> Original title: "{{el.original_title}}" </h3>
        <div class="fw-bold text-uppercase"><span> Language: {{el.original_language}} - </span> <span> Vote: {{el.vote_average}} </span></div>
      </li>
    </ul>
  </div>
</template>

<script>
import store from './store.js';
import axios from 'axios';

export default {
  name: 'App',

  data () {
    return {
      query: 'avengers',
      whatSearch: 'movie'
    }
  },

  watch: {
    query () { store.query = this.query }
  },

  computed: {
    resultAPI () { return store.resultAPI },
  },

  methods: {
    requestApi () {
      axios.get( `${ store.baseURL }${ this.whatSearch }`, {
        params: {
          api_key: store.api_key,
          query: this.query
        }
      } ).then( r => store.resultAPI = r.data.results );
    }
  },

  beforeMount () {
    this.requestApi();
  }
}
</script>

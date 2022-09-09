<template>
  <div id="app">
    
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'App',

  methods: {
    requestApi () {
      axios.get( 'https://developers.themoviedb.org/3/search/movie?api_key=ee490867376da94e7a75a9c4520d56a1&query=future' )
        .then( r => console.log( r ) );
    }
  },

  beforeMount () {
    this.requestApi();
  }
}
</script>

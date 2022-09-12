import Vue from 'vue';
export default Vue.observable( {
    baseURL: 'https://api.themoviedb.org/3/search/',
    api_key: 'ee490867376da94e7a75a9c4520d56a1',
    movie: [],
    tv: []
} );
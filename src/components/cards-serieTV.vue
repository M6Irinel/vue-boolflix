<template>
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
</template>


<script>
export default {
  name: 'my-cards',

  props: {
    resultTV: Array
  },

  methods: {
    srcPoster ( el ) {
      return `https://image.tmdb.org/t/p/w342${ el.poster_path }`;
    },

    starsVote ( el ) {
      return Math.floor( el.vote_average / 2 );
    },

    starsRest ( el ) {
      return ( 5 - this.starsVote( el ) );
    },

    srcFlag ( el ) {
      if ( el.toLowerCase() === 'en' ) el = 'gb';
      if ( el.toLowerCase() === 'el' ) el = 'gr';
      return `https://flagcdn.com/16x12/${ el.toLowerCase() }.png`;
    }
  }
}
</script>
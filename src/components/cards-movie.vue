<template>
  <div class="container mb-5">

    <div v-for="(result, i) in results" :key="i">
      <h3> {{titles[i].type}} </h3>

      <ul class="row">
        <li class="cards col-6 col-md-4 col-lg-3 col-xl-2 overflow-hidden p-2" v-for="el in result" :key="el.id">

          <div class="height-block-img">
            <img class="img-fluid" :src="srcPoster(el)" :alt="el.title">
          </div>

          <div class="myInfo p-3 fs-7">
            <h2> <b>Titolo:</b> {{el[titles[i].t]}} </h2>
            <h4 v-if="el[titles[i].t] !== el[titles[i].ot]"> <b>Titolo originale:</b> {{el[titles[i].ot]}} </h4>
            
            <div class="d-flex pb-1">
              <b>Voto: </b>

              <span class="solidStars" v-for="star in starsVote(el)" :key="star">
                <font-awesome-icon icon="fa-solid fa-star" />
              </span>
              
              <span class="regularStars" v-for="star2 in starsRest(el)" :key="(star2 + 5)">
                <font-awesome-icon icon="fa-regular fa-star" />
              </span>

              <span class="ms-auto">
                <img :src="srcFlag(el.original_language)" width="16" height="12" :alt="el.original_language">
              </span>
            </div>
            
            <p class="overview"> <b>Overview:</b> {{el.overview}} </p>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
import store from '../store.js';
import { srcPoster, starsVote, starsRest, srcFlag } from '../js-components/function-card.js';

export default {
  name: 'cards-movie',

  computed: {
    results () { return [ store.movie, store.tv ] },
    titles () {
      return [
        { t: 'title', ot: 'original_title', type: 'Movie' },
        { t: 'name', ot: 'original_name', type: 'Serie TV' }
      ]
    }
  },

  methods: { srcPoster, starsVote, starsRest, srcFlag }
}
</script>
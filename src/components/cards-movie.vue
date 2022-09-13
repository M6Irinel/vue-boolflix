<template>
  <div class="container mb-5">

    <div v-for="(result, i) in results" :key="i">
      <h3> {{titles[i].type}} </h3>

      <ul class="row">
        <li class="cards col-6 col-md-4 col-lg-3 col-xl-2 overflow-hidden p-2" v-for="el in result" :key="el.id">

          <img class="img-fluid height-block-img" :src="srcPoster(el)" :alt="el.title">

          <div class="myInfo h-100 p-3 fs-7">

            <h2 class="p-0"> <b>Titolo:</b> {{el[titles[i].t]}} </h2>

            <h4 v-if="el[titles[i].t] !== el[titles[i].ot]"> <b>Titolo originale:</b> {{el[titles[i].ot]}} </h4>

            <div class="d-flex">
              <b class="voto">Voto: </b>

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


<style lang="scss">
ul {
  padding: 0 !important;
}

.cards {
  position: relative;
  cursor: pointer;

  h2 {
    font-size: 1.2rem;
  }

  .height-block-img {
    object-fit: cover;
    object-position: center;
    height: 100%;
  }

  .fs-7 * {
    font-size: 0.8rem;
  }

  .myInfo {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;

    display: flex;
    flex-direction: column;
    gap: 10px;

    .voto {
      margin-right: 4px;
    }

    .solidStars {
      color: #efcb00;
    }

    .regularStars {
      color: #b79b00;
    }

    &:hover {
      background-color: #000000d3;
      opacity: 1;
    }

    .overview {
      overflow: auto;
      flex-grow: 1;

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
</style>
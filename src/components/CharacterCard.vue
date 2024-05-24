<script>
import axios from 'axios';

export default {
  props: {
    character: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      firstEpisodeName: ''
    };
  },
  computed: {
    statusIconClass() {
      return {
        'status__icon--alive': this.character.status === 'Alive',
        'status__icon--dead': this.character.status === 'Dead',
        'status__icon--unknown': this.character.status === 'unknown'
      };
    }
  },
  mounted() {
    this.fetchFirstEpisode();
  },
  methods: {
    async fetchFirstEpisode() {
      if (this.character.episode && this.character.episode.length > 0) {
        try {
          const firstEpisodeUrl = this.character.episode[0];
          const response = await axios.get(firstEpisodeUrl);
          this.firstEpisodeName = response.data.name;
        } catch (error) {
          console.error('Error fetching the first episode:', error);
        }
      }
    }
  }
}
</script>

<template>
  <article class="characterCard">
    <div class="characterCard__ImgWrapper">
      <img :alt="character.name" :src="character.image">
    </div>
    <div class="characterCard__ContentWrapper">
      <div class="section">
        <h2>{{ character.name }}</h2>
        <span class="status">
          <span :class="statusIconClass" class="status__icon"></span> {{ character.status }} - {{ character.species }}
        </span>
      </div>
      <div class="section">
        <span class="text-gray">Last known location:</span>
        <span>{{ character.location.name }}</span>
      </div>
      <div class="section">
        <span class="text-gray">First seen in:</span>
        <span>{{ firstEpisodeName }}</span>
      </div>
    </div>
  </article>
</template>

<style scoped>
.characterCard {
  width: 600px;
  height: 220px;
  display: flex;
  overflow: hidden;
  background: rgb(60, 62, 68);
  border-radius: 0.5rem;
  margin: 0.75rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0 4px 6px -1px, rgba(0, 0, 0, 0.06) 0 2px 4px -1px;
}

.characterCard__ImgWrapper {
  flex: 2 1 0;
  width: 100%;
}

.characterCard__ImgWrapper img {
  width: 100%;
  height: 100%;
  object-position: center center;
  object-fit: cover;
  display: block;
}

.characterCard__ContentWrapper {
  flex: 3 1 0;
  position: relative;
  padding: 0.75rem;
  color: rgb(255, 255, 255);
  display: flex;
  flex-direction: column;
}

.characterCard__ContentWrapper .section:first-child {
  -webkit-box-pack: start;
  justify-content: flex-start;
}

.characterCard__ContentWrapper .section {
  flex: 1 1 0;
  display: flex;
  flex-direction: column;
  -webkit-box-pack: center;
  justify-content: center;
  align-items: flex-start;
}

.characterCard__ContentWrapper .status {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  text-transform: capitalize;
}

.characterCard__ContentWrapper .status__icon {
  height: 0.5rem;
  width: 0.5rem;
  margin-right: 0.375rem;
  border-radius: 50%;
}

.status__icon--alive {
  background-color: rgb(85, 204, 68);
}

.status__icon--dead {
  background-color: rgb(214, 61, 46);
}

.status__icon--unknown {
  background-color: gray;
}

.characterCard__ContentWrapper .text-gray {
  color: rgb(158, 158, 158);
}

.characterCard__ContentWrapper span {
  font-size: 16px;
  font-weight: 500;
}


.characterCard__ContentWrapper span, .characterCard__ContentWrapper h2 {
  margin: 0;
  padding: 0;
}
</style>
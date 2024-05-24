<script>
import {ref, onMounted} from 'vue';
import axios from 'axios';
import CharacterCard from '../components/CharacterCard.vue';

export default {
  components: {
    CharacterCard,
  },
  setup() {
    const characters = ref([]);
    const page = ref(1);
    const name = ref('');
    const status = ref('');
    const hasNextPage = ref(true);

    const fetchCharacters = async () => {
      try {
        const response = await axios.get('https://rickandmortyapi.com/api/character', {
          params: {
            page: page.value,
            name: name.value,
            status: status.value,
          },
        });
        characters.value = response.data.results;
        hasNextPage.value = response.data.info.next !== null;
      } catch (error) {
        console.error('Error fetching characters:', error);
      }
    };

    const applyFilters = () => {
      page.value = 1;
      fetchCharacters();
    };

    const nextPage = () => {
      if (hasNextPage.value) {
        page.value++;
        fetchCharacters();
      }
    };

    const prevPage = () => {
      if (page.value > 1) {
        page.value--;
        fetchCharacters();
      }
    };

    onMounted(fetchCharacters);

    return {
      characters,
      page,
      name,
      status,
      hasNextPage,
      applyFilters,
      nextPage,
      prevPage,
    };
  },
};
</script>

<template>
  <div>
    <h1>Персонажи Рик и Морти</h1>
    <div class="search-form">
      <input v-model="name" class="search-input" placeholder="Имя">
      <select v-model="status" class="search-select">
        <option value="">Любой статус</option>
        <option value="alive">Жив</option>
        <option value="dead">Мертв</option>
        <option value="unknown">Неизвестно</option>
      </select>
      <button class="search-button" @click="applyFilters">Найти</button>
    </div>
    <div class="character-list">
      <CharacterCard v-for="character in characters" :key="character.id" :character="character"/>
    </div>
    <div class="pagination">
      <button :disabled="page === 1" class="pagination-button" @click="prevPage">Назад</button>
      <span class="pagination-info">Страница {{ page }}</span>
      <button :disabled="!hasNextPage" class="pagination-button" @click="nextPage">Вперед</button>
    </div>
  </div>
</template>

<style scoped>

.search-form {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.search-input, .search-select, .search-button {
  padding: 10px;
  margin: 0 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.search-input {
  width: 200px;
}

.search-button {
  background-color: #3498db;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.search-button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.character-list {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  flex-wrap: wrap;
  max-width: 1920px;
  padding: 4.5rem 0;
  background: rgb(39, 43, 51);
  min-height: calc(-60px + 50vh);
  margin-top: 50px;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 20px 0 20px 0;
}

.pagination-button {
  padding: 10px 20px;
  margin: 0 5px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #3498db;
  color: white;
  cursor: pointer;
  transition: background-color 0.3s;
}

.pagination-button:disabled {
  background-color: #95a5a6;
  cursor: not-allowed;
}

.pagination-info {
  margin: 0 10px;
  font-size: 1.1em;
  color: #2c3e50;
}
</style>

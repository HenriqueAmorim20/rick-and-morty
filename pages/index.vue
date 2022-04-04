<template>
  <div class="index">
    <h1>Search your character!</h1>
    <Filters :loading="loading" @fetch="getFilters" />
    <section class="characters">
      <Character
        v-for="(character, index) in characters"
        :key="index"
        :character="character"
      />
      <h3 v-if="characters.length === 0 && !loading">No results found...</h3>
    </section>
    <v-pagination
      v-model="page"
      :length="pages"
      total-visible="10"
      color="var(--secondaryText)"
      class="pagination"
    ></v-pagination>
  </div>
</template>

<script>
import Filters from "../components/Filters.vue";
import Character from "../components/Character.vue";

export default {
  name: "IndexPage",
  components: {
    Filters,
    Character,
  },
  data() {
    return {
      characters: [],
      loading: true,
      page: 1,
      pages: null,
      queryFilters: "",
    };
  },
  mounted() {
    this.fetchCharacters();
  },

  watch: {
    page() {
      this.fetchCharacters();
    },
  },

  methods: {
    getFilters(filters) {
      this.queryFilters = filters;
      this.fetchCharacters();
    },

    async fetchCharacters() {
      this.loading = true;

      try {
        const { info } = await this.$axios.$get(
          "/character/?" + this.queryFilters
        );
        this.pages = info.pages;
      } catch (error) {
        this.characters = [];
        this.page = 1;
        this.pages = null;
        this.loading = false;
        console.error(error);
        return;
      }

      this.page = this.page > this.pages ? this.pages : this.page;

      try {
        const { results } = await this.$axios.$get(
          "/character/?page=" + this.page + this.queryFilters
        );
        this.characters = results;
      } catch (error) {
        this.characters = [];
        this.page = 1;
        this.pages = null;
        console.error(error);
      }

      this.loading = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.index {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 1.5rem;
  position: relative;

  h1 {
    font-size: clamp(1.7rem, 3.5vw, 2.5rem);
    margin: 1rem 0 0;
    align-self: flex-start;
    font-weight: 300;
  }
  .filters {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 1.5rem;
    margin: 2rem 0;
  }

  .characters {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1.5rem;
  }

  .pagination {
    margin: 4rem 0;
  }
}

@media (max-width: 1100px) {
  .index {
    .characters {
      grid-template-columns: repeat(1, 1fr);
      max-width: 700px;
    }
  }
}

@media (max-width: 650px) {
  .index {
    .characters {
      grid-template-columns: repeat(1, 1fr);
      max-width: 300px;
    }

    .filters {
      grid-template-columns: repeat(1, 1fr);
      max-width: 300px;
    }

    h1 {
      align-self: center;
    }
  }
}
</style>

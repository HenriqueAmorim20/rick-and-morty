<template>
  <NuxtLink :to="`/${character.id}`" style="text-decoration: none;">
    <v-card class="character-card" color="var(--secondaryBackground)">
      <img :src="character.image" class="character-card-img" />
      <div class="character-info">
        <h2>{{ character.name }}</h2>
        <div class="status">
          <div :class="['status-indicator', character.status]" />
          <span class="status-condition">{{ character.status }} -&nbsp;</span>
          <span class="status-type">{{ character.species }}</span>
        </div>
        <div class="character-info-episodes">
          <div class="character-info-episodes-item">
            <span class="subtitle">First seen in</span>
            <span class="content">{{ firstEpisode.name }}</span>
          </div>
          <div class="character-info-episodes-item">
            <span class="subtitle">Last known location</span>
            <span class="content">{{ character.location.name }}</span>
          </div>
        </div>
      </div>
    </v-card>
  </NuxtLink>
</template>

<script>
export default {
  name: "CharacterComponent",
  props: ["character"],
  data() {
    return {
      firstEpisode: "",
    };
  },
  mounted() {
    this.fetchInfo();
  },
  methods: {
    async fetchInfo() {
      try {
        this.firstEpisode = await this.$axios.$get(this.character.episode[0]);
      } catch (error) {
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.character-card {
  display: flex;
  overflow: hidden;
  height: 100%;

  .character-card-img {
    width: 40%;
    aspect-ratio: 1;
    max-height: 250px;
    max-width: 250px;
  }

  .character-info {
    display: flex;
    flex-direction: column;
    padding: 0.5rem 1rem;

    .status {
      display: flex;
      align-items: center;

      .status-indicator {
        width: 10px;
        aspect-ratio: 1;
        border-radius: 50%;
        margin: 0 0.5rem 0 0;
      }

      .Alive {
        background-color: green;
      }

      .Dead {
        background-color: red;
      }

      .unknown {
        background-color: #c0c0c0;
      }
    }

    .character-info-episodes {
      display: flex;
      flex-direction: column;
      height: 100%;
      justify-content: space-around;

      .character-info-episodes-item {
        display: flex;
        flex-direction: column;
        margin: 0.5rem 0;

        .subtitle {
          color: var(--subtitleColor);
          font-size: 1.2rem;
        }

        .content {
          font-size: 1.1rem;
        }
      }
    }
  }
}

.character-card:hover h2 {
  color: var(--secondaryText);
}

@media (max-width: 650px) {
  .character-card {
    flex-direction: column;

    .character-card-img {
      width: 100%;
      aspect-ratio: 1;
      max-height: unset;
      max-width: unset;
    }
  }
}
</style>

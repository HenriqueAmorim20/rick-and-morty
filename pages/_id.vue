<template>
  <div class="main">
    <NuxtLink class="back" to="/">
      <v-btn class="back-btn">
        <v-icon color="#fff">mdi-arrow-left</v-icon>
        <span>Home</span>
      </v-btn>
    </NuxtLink>
    <v-progress-linear
      v-if="loading"
      color="var(--secondaryText)"
      indeterminate
    />
    <div v-if="!loading" class="character">
      <img class="character-img" :src="character.image" />
      <div class="character-content">
        <h1>{{ character.name }}</h1>
        <div class="character-status">
          <div :class="['character-status-indicator', character.status]" />
          <span class="character-status-condition"
            >{{ character.status }} -&nbsp;</span
          >
          <span class="character-status-type">{{ character.species }}</span>
        </div>
        <div class="character-content-info">
          <div class="character-content-info-section">
            <div class="character-content-info-section-item">
              <span class="subtitle">Gender</span>
              <span class="content">{{ character.gender }}</span>
            </div>
            <div class="character-content-info-section-item">
              <span class="subtitle">Origin</span>
              <span class="content">{{ character.origin.name }}</span>
            </div>
            <div class="character-content-info-section-item">
              <span class="subtitle">Species</span>
              <span class="content">{{ character.species }}</span>
            </div>
          </div>
          <div class="character-content-info-section">
            <div class="character-content-info-section-item">
              <span class="subtitle">Type</span>
              <span class="content">{{ character.type || "-" }}</span>
            </div>
            <div class="character-content-info-section-item">
              <span class="subtitle">First seen in</span>
              <span class="content"
                >{{ firstEpisode.name }} - {{ firstEpisode.episode }}</span
              >
            </div>
            <div class="character-content-info-section-item">
              <span class="subtitle">Last known location</span>
              <span class="content">{{ character.location.name }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "DynamicCharacterPage",
  async asyncData({ params }) {
    const characterId = params.id;
    return { characterId };
  },
  data() {
    return {
      character: {},
      loading: true,
      firstEpisode: {
        name: "",
      },
    };
  },
  mounted() {
    this.fetchCharacter();
  },
  methods: {
    async fetchCharacter() {
      try {
        this.character = await this.$axios.$get(
          "/character/" + this.characterId
        );
      } catch (error) {
        console.log(error);
      }
      this.fetchInfo();
      this.loading = false;
    },

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
.main {
  padding: 1rem;
  .back {
    display: flex;
    align-items: center;
    width: fit-content;
    text-decoration: none;

    .back-btn {
      background-color: var(--secondaryText);
      span {
        margin: 0 0 0 1rem;
        color: #fff;
        font-size: 1rem;
      }
    }
  }

  .back:hover {
    opacity: 0.7;
  }

  .character {
    display: flex;
    justify-content: space-between;
    margin: 2rem auto;
    max-width: 1200px;

    .character-img {
      object-fit: cover;
      object-position: center;
      border-radius: 10px;
      border: 3px solid var(--secondaryText);
    }
    .character-content {
      width: 65%;
      display: flex;
      flex-direction: column;
      align-items: flex-start;

      h1 {
        font-size: clamp(1.6rem, 3vw, 2.2rem);
        margin: 1rem 0;
      }
      .character-status {
        display: flex;
        align-items: center;

        .character-status-indicator {
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

      .character-content-info {
        display: flex;
        width: 100%;

        .character-content-info-section {
          display: flex;
          flex-direction: column;
          width: 50%;
          justify-content: space-around;

          .character-content-info-section-item {
            display: flex;
            flex-direction: column;
            margin: 0.5rem 0;

            .subtitle {
              color: var(--subtitleColor);
              font-size: clamp(0.9rem, 4vw, 1.2rem);
              margin-right: 0.5rem;
              text-align: left;
            }

            .content {
              font-size: clamp(0.8rem, 4vw, 1.2rem);
            }
          }
        }
      }
    }
  }
}

@media (max-width: 900px) {
  .character {
    flex-direction: column;
    max-width: 400px !important;

    .character-content {
      width: 100% !important;
      text-align: center !important;

      .character-content-info {
        flex-direction: column;
        width: 100% !important;

        .character-content-info-section {
          flex-direction: column;
          width: 100% !important;

          .character-content-info-section-item {
            flex-direction: row !important;
            justify-content: space-between;
            width: 100% !important;

            .content {
              text-align: right;
            }
          }
        }
      }
    }
  }
}
</style>

<template>
  <section class="filters">
    <v-text-field
      v-model="cName"
      :loading="loading"
      label="Character name"
      :light="!darkMode"
      clearable
      dense
      hide-details
      color="var(--secondaryText)"
      class="filters-field"
    />
    <v-select
      v-model="cStatus"
      :items="statusList"
      :loading="loading"
      label="Character status"
      :light="!darkMode"
      :menu-props="{
        light: !darkMode,
      }"
      clearable
      hide-details
      dense
      color="var(--secondaryText)"
      class="filters-field"
    />
    <v-select
      v-model="cGender"
      :items="genderList"
      :loading="loading"
      label="Character gender"
      :light="!darkMode"
      :menu-props="{
        light: !darkMode,
      }"
      clearable
      hide-details
      dense
      color="var(--secondaryText)"
      class="filters-field"
    />
  </section>
</template>

<script>
export default {
  name: "FiltersComponent",
  props: {
    loading: Boolean,
  },
  data() {
    return {
      genderList: ["Female", "Male", "Genderless", "unknown"],
      statusList: ["Alive", "Dead", "unknown"],
      cName: "",
      cStatus: null,
      cGender: null,
      darkMode: false,
    };
  },
  mounted() {
    this.darkMode = this.$store.state.theme.darkMode;
  },
  watch: {
    "$store.state.theme.darkMode"(newVal) {
      this.darkMode = newVal;
    },
    computedFilters() {
      this.$emit("fetch", this.computedFilters);
    },
  },
  computed: {
    computedFilters() {
      let filtros = "";

      if (this.cName) {
        filtros += `&name=${this.cName}`;
      }

      if (this.cStatus) {
        filtros += `&status=${this.cStatus}`;
      }

      if (this.cGender) {
        filtros += `&gender=${this.cGender}`;
      }

      return filtros;
    },
  },
};
</script>

<style lang="scss" scoped>
.filters {
  width: 100%;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin: 2rem 0;
}

@media (max-width: 650px) {
  .filters {
    grid-template-columns: repeat(1, 1fr);
    max-width: 300px;
  }
}
</style>

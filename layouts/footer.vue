<template>
  <!-- Footer -->
  <v-footer class="footer" color="transparent">
    <!-- Copyright data atual -->
    <span class="footer-text">
      All rights reserved Henrique Melo &copy;
      {{ new Date().getFullYear() }}
    </span>

    <!-- Icones de medias sociais -->
    <div class="footer-media">
      <a
        href="https://www.linkedin.com/in/henriqueamorim20/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <v-icon class="footer-media-icon">mdi-linkedin</v-icon>
      </a>
      <a
        href="https://github.com/HenriqueAmorim20"
        target="_blank"
        rel="noopener noreferrer"
      >
        <v-icon class="footer-media-icon">mdi-github</v-icon>
      </a>
      <a
        href="https://www.instagram.com/henriqueamorimcm/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <v-icon class="footer-media-icon">mdi-instagram</v-icon>
      </a>
    </div>
  </v-footer>
</template>

<script>
export default {
  name: "FooterLayout",
};
</script>

<style scoped lang="scss">
.footer {
  display: flex;
  align-items: center;
  padding: 3rem 1rem;

  .footer-text {
    width: 50%;
    text-align: center;
  }
  .footer-media {
    a {
      text-decoration: none;
      color: currentColor;
      margin: 0 0.7rem;
    }
    .footer-media-icon {
      font-size: 1.1rem;
      color: currentColor;
    }

    .footer-media-icon:hover {
      color: var(--secondaryText);
    }
  }
}

/* Inicio media query mobile */
@media (max-width: 750px) {
  .footer {
    flex-direction: column;
    .footer-text {
      width: 100%;
      margin: 0 0 1rem 0;
    }
  }
}
/* Fim media query mobile */
</style>

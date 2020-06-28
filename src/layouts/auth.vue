<template>
  <section class="section card">
    <nuxt-link to="/">
      <section class="is-size-2 has-text-weight-bold has-text-primary title">
        Slide-Share-Spot
      </section>
    </nuxt-link>
    <nuxt />
  </section>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.section {
  margin: 200px auto auto;
  width: 450px;
  .title {
    text-align: center;
    margin-bottom: 2rem;
  }
}
</style>

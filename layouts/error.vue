<template>
  <div>
    <div v-if="error.statusCode === 404">
      <h1>Page not found</h1>
      <div>{{ error }}</div>
    </div>
    <div v-else>
      <h1>An error occurred</h1>
      <div>{{ error }}</div>
    </div>
    <NuxtLink to="/">Home page</NuxtLink>
  </div>
</template>

<script>
export default {
    props: ["error"]
}
</script>

<template>
  <v-app>
    <v-card width="600px" elevation="0" class="mx-auto">
      <v-card-text :elevation="0" >
        <v-text-field
          v-model="keyword"
          hide-details
          :prepend-inner-icon="mdiMagnify"
          full-width
          solo
          dense
          background-color="#FAFAFA"
        />

        <SearchResults :keyword="keyword"  />
      </v-card-text>
    </v-card>
  </v-app>
</template>

<script >
import { mdiMagnify } from '@mdi/js'
import SearchResults from '@/components/SearchResults'

export default {
  components: {
    SearchResults,
  },
  data() {
    return {
      keyword: '',
      mdiMagnify,
    }
  },
}
</script>

<style>
html {
  overflow: hidden
}
</style>


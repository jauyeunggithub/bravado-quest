<template>
  <div>
    <v-card v-for="r of filteredSearchResults" :key="r.id">
      <v-card-text class="d-flex justify-space-between"> </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import users from '@/data/users.json'

export default {
  props: {
    keyword: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      usersWithId: users.map((u) => ({ ...u, id: uuidv4() })),
    }
  },
  computed: {
    filteredSearchResults() {
      console.log( this.usersWithId[0])
      const { keyword } = this
      if (!keyword){
        return this.usersWithId
      }
      return this.usersWithId.filter((u) => {
        const { address, avatar, city, email, name, title } = u
        return (
          address.toLowerCase().includes(keyword.toLowerCase()) ||
          avatar.toLowerCase().includes(keyword.toLowerCase()) ||
          city.toLowerCase().includes(keyword.toLowerCase()) ||
          email.toLowerCase().includes(keyword.toLowerCase()) ||
          name.toLowerCase().includes(keyword.toLowerCase()) ||
          title.toLowerCase().includes(keyword.toLowerCase())
        )
      })
    },
  },
}
</script>

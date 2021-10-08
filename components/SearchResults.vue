<template>
  <div>
    <v-card v-for="r of filteredSearchResults" :key="r.id" class="my-3">
      <v-card-text class="d-flex pa-0 ma-0">
        <img :src="r.avatar" class="avatar" />
        <div class="flex-grow-1 pa-3 d-flex flex-column justify-space-between">
          <div class="d-flex justify-space-between">
            <div>
              <h2>{{ r.name }}</h2>
              <p class="py-0 my-0">
                <b>{{ r.title }}</b>
              </p>
              <p class="py-0 my-0">{{ r.address }}</p>
            </div>
            <div>
              {{ r.email }}
            </div>
          </div>

          <div>
            <v-btn text color="#00897B">Mark as Suitable</v-btn>
          </div>
        </div>
      </v-card-text>
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
      const { keyword } = this
      if (!keyword) {
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

<style>
.avatar {
  background: lightgray;
  width: 150px;
}
</style>

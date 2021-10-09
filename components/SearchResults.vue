<template>
  <div id="scrollable" class="my-3">
    <v-card
      v-for="r of filteredSearchResultsWithHighlight"
      :key="r.id"
      class="my-3"
      :style="{
        border: highlightStatus[r.id] ? '2px solid lightblue' : undefined,
      }"
      @click="
        highlightStatus = {}
        $set(highlightStatus, r.id, !highlightStatus[r.id])
      "
    >
      <v-card-text class="d-flex pa-0 ma-0">
        <img :src="r.avatar" class="avatar" />
        <div
          class="flex-grow-1 pa-3 d-flex flex-column justify-space-between right-pane"
        >
          <div class="d-flex justify-space-between">
            <div>
              <h2 v-html="r.name"></h2>
              <p class="py-0 my-0">
                <b v-html="r.title"></b>
              </p>
              <p class="py-0 my-0" >
                <span v-html="r.address"></span>,
                <span v-html="r.city"></span>
              </p>
            </div>
            <div v-html="r.email"></div>
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
import db from '@/db'

export default {
  props: {
    keyword: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      highlightStatus: {},
      filteredSearchResults: [],
    }
  },
  computed: {
    filteredSearchResultsWithHighlight() {
      const { keyword } = this
      if (!Array.isArray(this.filteredSearchResults)) {
        return []
      }
      const highlighted = this.filteredSearchResults?.map((u) => {
        const highlightedEntries = Object.entries(u)?.map(([key, val]) => {
          if (key === 'avatar' || key === 'id') {
            return [key, val]
          }
          const highlightedVal = val?.replace(
            new RegExp(keyword, 'gi'),
            (match) => `<mark>${match}</mark>`
          )
          return [key, highlightedVal]
        })
        return Object.fromEntries(highlightedEntries)
      })
      return highlighted
    },
  },
  watch: {
    keyword: {
      immediate: true,
      handler() {
        this.search()
      },
    },
  },
  beforeMount() {
    this.loadData()
  },
  methods: {
    async search() {
      await this.$nextTick()
      const { keyword } = this
      if (keyword) {
        const filteredSearchResults = await db.avatars
          .filter((u) => {
            const { address, city, email, name, title } = u
            return (
              address?.toLowerCase()?.includes(keyword?.toLowerCase()) ||
              city?.toLowerCase()?.includes(keyword?.toLowerCase()) ||
              email?.toLowerCase()?.includes(keyword?.toLowerCase()) ||
              name?.toLowerCase()?.includes(keyword?.toLowerCase()) ||
              title?.toLowerCase()?.includes(keyword?.toLowerCase())
            )
          })
          .limit(10)
          .toArray()
        this.filteredSearchResults = filteredSearchResults
      } else {
        this.filteredSearchResults = await db.avatars
          ?.toCollection()
          ?.limit(10)
          .toArray()
      }
    },
    loadData() {
      const worker = this.$worker.createWorker()
      worker.onmessage = () => {
        this.search()
      }
      worker.postMessage('load')
    },
  },
}
</script>

<style>
.avatar {
  background: #bdbdbd;
  width: 150px;
}

.right-pane {
  background: #fafafa;
}

mark {
  background: yellow;
}

#scrollable {
  height: calc(100vh - 100px);
  overflow-y: auto;
}
</style>

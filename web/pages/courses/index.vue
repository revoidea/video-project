<template>
  <div>
    <div class="pa-3"><h4>热门课程</h4></div>
    <v-row>
      <v-col v-for="item in courses" :key="item._id" md="4">
        <v-card class="mx-auto" max-width="344">
          <router-link :to="`/courses/${item._id}`">
            <v-img
              src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
              height="200px"
            ></v-img>
          </router-link>
          <v-card-title>
            {{ item.name }}
          </v-card-title>
          <v-card-subtitle>
            {{ item.createdAt }}
          </v-card-subtitle>
          <v-card-actions>
            <like-btn type="Course" :object="item._id"></like-btn>
            <v-btn text>Share</v-btn>

            <v-btn color="purple" text>
              Explore
            </v-btn>
            <v-spacer></v-spacer>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import LikeBtn from '../../components/LikeBtn.vue'
export default {
  components: { LikeBtn },
  async asyncData({ $axios }) {
    const data = await $axios.$get('courses')

    return {
      courses: data.data,
    }
  },
}
</script>

<style></style>

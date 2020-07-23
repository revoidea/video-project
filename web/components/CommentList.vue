<template>
  <v-card flat tile class="pa-3">
    <v-form @submit.prevent="send">
      <v-text-field
        v-model="content"
        label="说点啥吧"
        required
        append-icon="mdi-send"
        @click:append="send"
      >
      </v-text-field>
    </v-form>
    <h4>评论列表</h4>
    <p>{{ comments }}</p>
  </v-card>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      required: true,
    },
    object: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      content: null,
      comments: [],
    }
  },
  methods: {
    async send() {
      await this.$axios.$post('comments', {
        type: this.type,
        object: this.object,
        content: this.content,
      })
      this.fetch()
    },
    async fetch() {
      this.comments = await this.$axios.$get('comments', {})
    },
  },
}
</script>

<style></style>

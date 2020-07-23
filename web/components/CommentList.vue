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
    <v-list two-line>
      <v-list-item v-for="(item, i) in comments" :key="i">
        <v-list-item-avatar color="blue">
          <!-- <v-img></v-img> -->
          <span class="white-text">{{
            item.user.username[0].toUpperCase()
          }}</span>
        </v-list-item-avatar>
        <v-list-item-content>
          <v-list-item-title>{{ item.content }}</v-list-item-title>
          <v-list-item-subtitle>
            <span>{{ item.user.username }}</span>
            <span>{{ item.createdAt }}</span>
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list>
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
      this.content = null
      this.fetch()
    },
    async fetch() {
      this.comments = await this.$axios.$get('comments', {
        params: {
          // 参考Nest的CRUD规范 , 方便以后扩展
          query: {
            where: {
              type: this.type,
              object: this.object,
            },
            // limit: 5,
            // skip: 10,
          },
        },
      })
    },
  },
  watch: {
    // object(){}
    object: {
      // handler(){

      // }
      handler: 'fetch', // 选择执行methods里的方法
      immediate: true, // 表示立即执行
    },
  },
  // created() {
  //   this.fetch()
  // },
}
</script>

<style></style>

<template>
  <div>
    <avue-crud
      v-if="option.column"
      :data="data.data"
      :option="option"
      :page.sync="page"
      @row-save="create"
      @row-update="update"
      @row-del="remove"
      @on-load="changePage"
      @sort-change="changeSort"
      @search-change="search"
      v-model="obj"
      :upload-before="uploadBefore"
      ref="avueCrud"
    ></avue-crud>
  </div>
</template>
<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'

@Component({})
export default class ResourceList extends Vue {
  @Prop(String) resource!: string
  data: any = {}
  option: any = {}
  page: any = {
    pageSize: 5,
    pageSizes: [5, 10],
    total: 0
  }
  query: any = {
    limit: 2
  }

  obj: any = {}

  async changePage({ pageSize, currentPage }) {
    this.query.page = currentPage
    this.query.limit = pageSize
    this.fetch()
  }

  //点击字段排序
  async changeSort({ prop, order }) {
    if (!order) {
      this.query.sort = null
    } else {
      this.query.sort = {
        [prop]: order === 'ascending' ? 1 : -1
      }
    }
    this.fetch()
  }

  async search(where, done) {
    //this.query.where = where
    //模糊查询
    for (let k in where) {
      const field = this.option.column.find(v => v.prop === k)
      if (field.regex) {
        where[k] = { $regex: where[k] }
      }
    }
    this.query.where = where
    this.fetch()
    done()
  }
  async fetchOption() {
    const res = await this.$http.get(`${this.resource}/option`)
    this.option = res.data
  }

  async fetch() {
    const res = await this.$http.get(`${this.resource}`, {
      params: {
        query: this.query
      }
    })
    this.page.total = res.data.total
    this.data = res.data
  }

  async create(row, done) {
    await this.$http.post(`${this.resource}`, row)
    this.$message.success('创建成功')
    this.fetch()
    done()
  }

  async update(row, index, done) {
    //删除row里面的$index
    const data = JSON.parse(JSON.stringify(row))
    delete data.$index
    await this.$http.put(`${this.resource}/${row._id}`, data)
    this.$message.success('更新成功')
    this.fetch()
    done()
  }

  async remove(row) {
    try {
      await this.$confirm('是否确认删除？')
    } catch (error) {
      return
    }

    await this.$http.delete(`${this.resource}/${row._id}`)
    this.$message.success('删除成功')
    this.fetch()
  }

  async uploadBefore(file, done) {
    let params = new FormData()
    params.append('file', file)
    const res = await this.$http.post('upload', params, {
      headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' }
    })
    this.obj.cover = res.data.url
    this.obj['cover'] = res.data.url
    done()
  }

  created() {
    this.fetch()
    this.fetchOption()
  }
}
</script>
<style></style>

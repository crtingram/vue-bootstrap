<template>
  <b-container class="bv-example-row">
    <b-row align-h="around ">
      <div class="mt-3">
        Items per Page:
        <select v-model="pageSize" @change="handlePageSizeChange($event)">
          <option v-for="size in pageSizes" :key="size" :value="size">{{ size }}</option>
        </select>
      </div>

      <div class="mt-3">
        <b-pagination v-model="page" :total-rows="count" :per-page="pageSize" prev-text="Prev" next-text="Next"
          @change="handlePageChange"></b-pagination>
      </div>
    </b-row>

    <b-list-group class="record-list">
      <b-list-group-item v-for="record in records" :key="record.id"
        v-bind:variant="record.risk_level == 1 ? 'danger' : 'primary'">
        <div class="d-flex w-100 justify-content-between">
          <h5 class="mb-1">{{ record.email }}</h5>
          <p>{{ record.id }}</p>
          <h5 class="mb-1">{{ record.created }}</h5>
        </div>
        <b-card>
          <b-card-text>
            <p>{{ record.fake_company_name }}</p>
            <p>{{ record.job_title }}</p>
            <p>{{ record.last_name }}, {{ record.first_name }}</p>
          </b-card-text>
        </b-card>
      </b-list-group-item>
    </b-list-group>
  </b-container>
</template>

<script>

import DataService from './services/DataService'

export default {
  name: "App",
  data() {
    return {
      records: [],
      currentIndex: -1,
      searchText: "",
      page: 1,
      count: 0,
      pageSize: 10,
      pageSizes: [10, 25, 50, 100],
    }
  },
  methods: {
    getParams(searchText, page, pageSize) {
      let params = {};
      if (searchText) {
        params["title"] = searchText;
      }
      if (page) {
        params["page"] = page;
      }
      if (pageSize) {
        params["size"] = pageSize;
      }
      return params;
    },
    retrieveRecords() {
      const params = this.getParams(
        this.searchText,
        this.page,
        this.pageSize,
      );

      DataService.getRecords(params)
        .then((response) => {
          this.records = response.data;
          this.count = response.headers["x-total-count"];
        })
        .catch((e) => {
          console.log(e);
        });
    },
    handlePageChange(value) {
      this.page = value;
      this.retrieveRecords();
    },
    handlePageSizeChange(event) {
      this.pageSize = event.target.value;
      this.page = 1;
      this.retrieveRecords();
    },
  },
  async created() {
    this.retrieveRecords();
  },
};

</script>

<style>
.record-list {
  height: 800px;
  overflow-y: scroll;
}
</style>

<template>
  <b-card class="container outlined mt-4">
    <div style="min-height: 400px">
    <b-table striped hover
             :items="items"
             :fields="fields"
             id="my-table"
             :per-page="perPage"
             :current-page="currentPage"
             @row-clicked="userDetail"
             style="cursor: pointer"
    >
    </b-table>
    </div>
    <b-button variant="outline-primary" class="float-right" router :to="{name: 'write'}"
      >글쓰기</b-button
    >
    <div>
      <b-pagination
          v-model="currentPage"
          :total-rows="rows"
          :per-page="perPage"
          aria-controls="my-table"
          align="center"
      ></b-pagination>
    </div>
  </b-card>
</template>

<script>
import DB from "@/api/getData"

export default {
  data() {
    return {
      // Note `isActive` is left out and will not appear in the rendered table
      fields: [
        { key: "board_no", label: "No" },
        { key: "board_title", label: "제목" },
        { key: "board_writer", label: "작성자" },
        { key: "board_date", label: "작성일" },
      ],
      items: [],
      perPage:7,
      currentPage:1,
    };
  },
  methods: {
    userDetail(item){
     this.$router.push({name:'BoardDetail', query:{board_no:item.board_no}})
    },
    write() {
      this.$router.push("/form");
    },
  },
  computed:{
    rows(){
      return this.items.length
    }
  },
  mounted() {

    DB.boardList()
      .then((res) => {
        console.log("보드마운트")
        this.items = res.data;
        console.log(this.items)
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
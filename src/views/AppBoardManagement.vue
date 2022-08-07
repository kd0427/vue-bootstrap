<template>
  <div>
    <h3 class="mt-3 ml-3">게시글 관리</h3>
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
          <template #cell(관리)="row">
            <b-button size="sm" @click="boardDelete(row.item.board_no)">
              삭제
            </b-button>
          </template>
        </b-table>
      </div>

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
  </div>
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
          '관리'
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
    boardDelete(board_no){
      if(confirm("게시글을 삭제 하시겠습니까?")){
        DB.boardDelete(board_no)
            .then(res=>{
              this.getBoardList()
              console.log(res)
            })
            .catch(err=>{
              console.log(err)
            })
      }
    },
    getBoardList(){
      DB.boardList()
          .then((res) => {
            console.log("보드마운트")
            this.items = res.data;
            console.log(this.items)
          })
          .catch((err) => {
            console.log(err);
          });
    }
  },
  computed:{
    rows(){
      return this.items.length
    }
  },
  mounted() {
    this.getBoardList()
  },
};
</script>
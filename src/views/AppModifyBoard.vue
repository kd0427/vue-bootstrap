<template>
  <div class="container" style="justify-content: space-around">
    <b-form
        @submit.prevent=""
        style="max-width: 40rem; margin: 0 auto; padding: 8px;"
        class="mt-5 table-bordered">
      <label for="title">제목</label>
      <b-form-input
          type="text"
          id="title"
          aria-describedby="content-help-block"
          v-model="data.board_title"
          style="max-width: 40rem"
      ></b-form-input>

      <b-form-textarea
          id="textarea-state"
          v-model="data.board_content"
          placeholder="내용을 입력해주세요."
          rows="3"
          class="mt-4"
          style="max-width: 40rem;min-height:20rem"
      ></b-form-textarea>
      <div style="text-align: right" class="mt-2">
        <b-button class="mr-2" variant="primary" @click="modifyBoard">수정</b-button>
        <b-button type="reset" variant="danger" @click="$router.go(-1)">취소</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import DB from "@/api/getData.js"
export default {
  name: "AppForm",
  data() {
    return {
      data:[]
    };
  },
  methods:{
    modifyBoard(){
      if(confirm("수정 하시겠습니까?")){
        DB.modifyBoard(this.$route.query.board_no,this.data)
            .then(res=>{
              console.log(res)
              this.$router.go(-1)
            }).catch(err=>{
          console.log(err)
        })
      }
    }
  },

  mounted() {
    DB.boardDetail(this.$route.query.board_no)
        .then(res=>{
          console.log(res)
          this.data=res.data
        })
        .catch(err=>{
          console.log(err)
        })
  }
};
</script>

<style>
</style>
<template>
  <div class="container" style="justify-content: space-around">
    <b-form
        style="max-width: 40rem; margin: 0 auto; padding: 8px;"
        class="mt-5 mb-5 table-bordered">
      <label for="title">제목</label>
      <b-form-input
          disabled
          type="text"
          id="title"
          aria-describedby="content-help-block"
          v-model="data.board_title"
          style="max-width: 40rem"
      ></b-form-input>
      <label class="mt-2" for="textarea-state">내용</label>
      <b-form-textarea
          disabled
          id="textarea-state"
          v-model="data.board_content"
          placeholder="내용을 입력해주세요."
          rows="3"
          style="max-width: 40rem;min-height:20rem"
      ></b-form-textarea>
      <div style="text-align: right" class="mt-2">
        <div v-if="data.board_writer===$store.state.userInfo.user_id || $store.state.userInfo.authorities==='ROLE_ADMIN'" >
          <b-button variant="primary" class="mr-2" router :to="{name:'modifyBoard',query:{board_no:$route.query.board_no}}">수정하기</b-button>
          <b-button variant="danger" class="mr-2"  @click="deleteBoard">삭제하기</b-button>
        </div>
        <div>
          <b-button type="reset" class="mr-2 mt-2" variant="danger" @click="$router.go(-1)">취소</b-button>
        </div>
      </div>
      <div>
        <AppCommentList :board_no="$route.query.board_no"/>
      </div>
    </b-form>
  </div>
</template>

<script>
import DB from "@/api/getData.js"
import AppCommentList from "@/views/AppCommentList";
export default {
  name: "AppForm",
  data() {
    return {
     data:[]
    };
  },
  components:{
    AppCommentList
  },
  methods:{
    deleteBoard(){
      if(confirm("삭제 하시겠습니까?")){
        DB.boardDelete(this.$route.query.board_no)
            .then(res=>{
              console.log(res)
              this.$router.push("/board")
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
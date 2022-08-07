<template>
  <div class="container" style="justify-content: space-around">
    <b-form
        @submit.prevent="write"
        style="max-width: 50rem; margin: 0 auto; padding: 8px;"
        class="mt-5 table-bordered">
      <label for="title">제목</label>
      <b-form-input
        type="text"
        id="title"
        aria-describedby="content-help-block"
        v-model="data.board_title"
        style="max-width: 50rem"
        :state="data.board_title.length >= 2"
        required
      ></b-form-input>
      <b-form-text id="content-help-block" class="text-danger">
        1자 이상 30자 이하로 입력해주세요.
      </b-form-text>

      <b-form-textarea
        id="textarea-state"
        v-model="data.board_content"
        :state="data.board_content.length >= 1"
        placeholder="내용을 입력해주세요."
        rows="3"
        class="mt-4"
        style="max-width: 50rem;min-height:30rem"
        required
      ></b-form-textarea>
     <div style="text-align: right" class="mt-2">
      <b-button type="submit" variant="primary" class="mr-2">글쓰기</b-button>
      <b-button type="reset" variant="danger" router :to="{name: 'board'}">취소</b-button>
     </div>
    </b-form>
    </div>
</template>

<script>
import router from "@/router";
import DB from "@/api/getData"

export default {
  name: "AppForm",
  data() {
    return {
      data:{
        board_title: "",
        board_content: "",
      },
      errors:[],
    };
  },
  methods:{
    validationCheck(){
      this.errors=[]
      if(!this.data.board_title){
        this.errors.push("제목을 입력해주세요.")
      }
      if(!this.data.board_content){
        this.errors.push("내용을 입력해주세요.")
      }
    },
    clearAll(){
      this.data.board_title =''
      this.data.board_content=''
    },
    write(){
      this.validationCheck()
      if(!(this.errors.length===0)){
       alert(this.errors)
      }
      DB.write(this.data)
          .then(res=>{
            console.log(res)
            this.clearAll()
            router.push({name: 'board'})
          })
          .catch(err=>{
            console.log(err)
          })

    }


  },

};
</script>

<style>
</style>
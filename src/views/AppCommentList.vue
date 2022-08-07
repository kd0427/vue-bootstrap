<template>
  <div>
    <b-button
        :class="visible ? null : 'collapsed'"
        :aria-expanded="visible ? 'true' : 'false'"
        aria-controls="collapse-4"
        @click="visible = !visible"
    >
      댓글 보기({{length}})
    </b-button>
    <b-collapse id="collapse-4" v-model="visible" class="mt-2">
      <b-card>
        <div :key="index" v-for="(item,index) in comments" class="mb-1">
          <b-row>
            <b-col cols="8">
              <div>{{ item.user_id }}: {{ item.comment_content }}</div>
            </b-col>
            <b-col cols="3" class="mr-1" v-if="item.user_id===data.user_id">
              <div>
                <b-button
                    :id="'modifyBtn'+index"
                    size="sm"
                    class="mr-1"
                    v-b-toggle="'collapse-'+index"
                >수정</b-button>
                <b-button size="sm" @click="commentDelete(item.comment_no)">삭제</b-button>
              </div>
            </b-col>
          </b-row>
          <b-collapse :id="'collapse-'+index">
            <b-form @submit.prevent="commentModify(item.comment_no,index)">
              <b-row>
                <b-col cols="9">
                  <b-form-input
                      type="text"
                      :id="'input'+index"
                      :value="item.comment_content"
                      required
                  >
                  </b-form-input>
                </b-col>
                <b-col cols="3">
                  <b-button size="sm" type="submit" variant="primary" >댓글수정</b-button>
                </b-col>
              </b-row>
            </b-form>
          </b-collapse>
        </div>
      </b-card>
        <b-form @submit.prevent="commentWrite">
          <b-row>
            <b-col cols="9">
              <b-form-input
                  type="text"
                  :placeholder="[data.user_id]+' (으)로 댓글 달기...'"
                  id="comment"
                  v-model="data.comment_content"
                  required
              >
              </b-form-input>
            </b-col>
            <b-col cols="3">
              <b-button type="submit" variant="primary" >댓글쓰기</b-button>
            </b-col>
          </b-row>
        </b-form>
    </b-collapse>
  </div>
</template>

<script>
import DB from '@/api/getData'
export default {
  data() {
    return {
      visible: false,
      comments:[],
      length:'',
      data:{
        user_id:this.$store.state.userInfo.user_id,
        comment_content:'',
        board_no:this.board_no
      },
    }
  },
  props:{
    board_no: null,
  },
  methods:{
    getComment(){
      DB.commentList(this.board_no)
          .then(res=>{
            this.comments = res.data
            this.length= this.comments.length
            console.log(this.comments)
          })
          .catch(err=>{
            console.log(err)
          })
    },
    // 댓글달기
    commentWrite(){
      console.log(":::::::::::::"+this.data.user_id)
      DB.commentWrite(this.board_no,this.data)
          .then(res=>{
            console.log(res)
            this.data.comment_content=''
            this.getComment()
          })
          .catch(err=>{
            console.log(err)
          })

    },
    //댓글 삭제
    commentDelete(comment_no){
      if(confirm("댓글을 삭제 하시겠습니까?")){
        DB.commentDelete(comment_no)
            .then(res=>{
              console.log(res)
              this.getComment()
            })
            .catch(err=>{
              console.log(err)
            })
      }
    },
    // 댓글 수정
    commentModify(comment_no,index){
      let modifyData={
        comment_content: document.getElementById("input"+index).value
      }
      if(confirm("댓글을 수정하시겠습니까?")){
        DB.commentModify(comment_no,modifyData)
            .then(res=>{
              console.log(res)
              document.getElementById("modifyBtn"+index).click()
              this.getComment()
            })
            .catch(err=>{
              console.log(err)
            })
      }
    }
  },
  mounted(){
    this.getComment()
  }
}
</script>
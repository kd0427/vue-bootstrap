<template>
  <div class="container">
    <b-form
        @submit.prevent="write"
        style="max-width: 30rem; margin: 0 auto; padding: 8px;"
        class="mt-5 mb-5 table-bordered">
      <label for="username">아이디</label>
      <b-form-input
          type="text"
          id="username"
          aria-describedby="id-feedback"
          v-model="data.username"
          style="max-width: 30rem"
          :state="username_state"
          required
      ></b-form-input>
      <b-form-invalid-feedback id="id-feedback">
        1자 이상 30자 이하로 입력해주세요.
      </b-form-invalid-feedback>

      <label for="password" class="mt-3">비밀번호</label>
      <b-form-input
          id="password"
          type="password"
          v-model="data.password"
          aria-describedby="password-feedback"
          :state="password_state"
          placeholder="비밀번호를 입력해주세요."
          rows="3"
          style="max-width: 30rem;"
          required
      ></b-form-input>
      <b-form-invalid-feedback id="password-feedback">
        비밀번호를 입력해주세요.
      </b-form-invalid-feedback>

      <label for="confirm_password" class="mt-3">비밀번호 확인</label>
      <b-form-input
          id="confirm_password"
          type="password"
          v-model="confirm_password"
          aria-describedby="confirm-password-feedback"
          :state="confirm_password_state"
          placeholder="비밀번호를 입력해주세요."
          rows="3"
          style="max-width: 30rem;"
          required
      ></b-form-input>
      <b-form-invalid-feedback id="confirm-password-feedback">
        비밀번호가 일치하지 않습니다.
      </b-form-invalid-feedback>

      <label for="user_name" class="mt-3">이름</label>
      <b-form-input
          type="text"
          id="user_name"
          aria-describedby="user-name-feedback"
          v-model="data.user_name"
          style="max-width: 30rem"
          :state="user_name_state"
          required
      ></b-form-input>
      <b-form-invalid-feedback id="user-name-feedback">
        1자 이상 30자 이하로 입력해주세요.
      </b-form-invalid-feedback>

      <label for="user_email" class="mt-3">이메일</label>
      <b-form-input
          type="text"
          id="user_email"
          aria-describedby="email-feedback"
          v-model="data.user_email"
          style="max-width: 30rem"
          :state="user_email_state"
          required
      ></b-form-input>
      <b-form-invalid-feedback id="email-feedback">
        이메일 형식이 아닙니다.
      </b-form-invalid-feedback>

      <label for="user_address" class="mt-3">주소</label>
      <b-form-input
          type="text"
          id="user_address"
          aria-describedby="address-feedback"
          v-model="data.user_address"
          style="max-width: 30rem"
          :state="user_address_state"
          required
      ></b-form-input>
      <b-form-invalid-feedback id="address-feedback">
        주소를 입력해 주세요.
      </b-form-invalid-feedback>

      <label for="user_phone" class="mt-3">연락처</label>
      <b-form-input
          type="text"
          id="user_phone"
          aria-describedby="phone-feedback"
          v-model="data.user_phone"
          style="max-width: 30rem"
          :state="user_phone_state"
          required
      ></b-form-input>
      <b-form-invalid-feedback id="phone-feedback">
        연락처를 입력해주세요.
      </b-form-invalid-feedback>

      <div style="text-align: right" class="mt-2">
        <b-button type="submit" variant="primary" class="mr-2">회원가입</b-button>
        <b-button type="reset" variant="danger" router :to="{name: 'home'}">취소</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
import router from "@/router";
import DB from "@/api/getData.js"

export default {
  name: "AppForm",
//sdfsdf
  data() {
    return {
      confirm_password:'',
      data:{
        username:'',
        password:'',
        user_name:'',
        user_email:'',
        user_address:'',
        user_phone:''
      },
      errors:[],
    };
  },
  computed:{
    username_state(){
      return this.data.username.length >= 1
    },
    password_state(){
      return this.data.password.length >= 1
    },
    confirm_password_state(){
      return this.data.password===this.confirm_password
    },
    user_name_state(){
      return this.data.user_name.length >= 1
    },
    user_email_state(){
      const regEmail = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/;

      return regEmail.test(this.data.user_email)
    },
    user_address_state(){
      return this.data.user_address.length >= 1
    },
    user_phone_state(){
      return this.data.user_phone.length >= 1
    },
  },

  methods:{
    validationCheck() {
      if(!this.username_state){
        this.errors.push("아이디를 입력해주세요.")
      }
      if(!this.password_state){
        this.errors.push("비밀번호를 입력해주세요.")
      }
      if(!this.confirm_password_state){
        this.errors.push("비밀번호가 일치하지 않습니다.")
      }
      if(!this.user_name_state){
        this.errors.push("이름 입력해주세요.")
      }
      if(!this.user_email_state){
        this.errors.push("이메일을 확인해주세요.")
      }
      if(!this.user_address_state){
        this.errors.push("주소를 입력해주세요.")
      }
      if(!this.user_phone_state){
        this.errors.push("연락처를 입력해주세요.")
      }
    },

    clearAll(){
      this.data.username =''
      this.data.password=''
      this.confirm_password=''
      this.data.user_name=''
      this.data.user_email=''
      this.data.user_address=''
      this.data.user_phone=''
    },
    write(){
      this.validationCheck()
      if(!(this.errors.length===0)){
        alert(this.errors)
      }
      DB.joinUser(this.data)
          .then(res=>{
            console.log(res)
            this.clearAll()
            router.push({name: 'login'})
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
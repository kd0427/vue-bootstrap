<template>
  <div class="container">
    <b-form
        style="max-width: 30rem; margin: 0 auto; padding: 8px;"
        class="mt-5 mb-5 table-bordered">
      <label for="username">아이디</label>
      <b-form-input
          disabled
          type="text"
          id="username"
          v-model="data.username"
          style="max-width: 30rem"
      ></b-form-input>

      <label for="user_name" class="mt-3">이름</label>
      <b-form-input
          disabled
          type="text"
          id="user_name"
          v-model="data.user_name"
          style="max-width: 30rem"
      ></b-form-input>
      <label for="user_email" class="mt-3">이메일</label>
      <b-form-input
          disabled
          type="text"
          id="user_email"
          v-model="data.user_email"
          style="max-width: 30rem"
      ></b-form-input>
      <label for="user_address" class="mt-3">주소</label>
      <b-form-input
          disabled
          type="text"
          id="user_address"
          v-model="data.user_address"
          style="max-width: 30rem"
      ></b-form-input>
      <label for="user_phone" class="mt-3">연락처</label>
      <b-form-input
          disabled
          type="text"
          id="user_phone"
          v-model="data.user_phone"
          style="max-width: 30rem"
      ></b-form-input>
      <div style="text-align: right" class="mt-2">
        <b-button variant="primary" class="mr-2" router :to="{name:'myPageModify'}">수정하기</b-button>
        <b-button variant="danger" @click="$router.go(-1)">취소</b-button>
      </div>
    </b-form>
  </div>
</template>

<script>
export default {
  name: "AppForm",
  data() {
    return {
      confirm_password:'',
      data:{
        username:this.$store.state.userInfo.user_id,
        user_name:this.$store.state.userInfo.user_name,
        user_email:this.$store.state.userInfo.user_email,
        user_address:this.$store.state.userInfo.user_address,
        user_phone:this.$store.state.userInfo.user_phone
      },
    };
  },
}
</script>

<style>
</style>
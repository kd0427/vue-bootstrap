<template>
  <main class="form-signin">
    <div class="card">
      <div class="card-body">
        <form>
          <h2 class="h3 mb-3 fw-normal text-center">로그인</h2>

          <div class="form-group">
            <label for="userid">ID</label>
            <input
                type="text"
                id="userid"
                class="form-control form-control-lg"
                placeholder="ID"
                v-model="username"
            />
          </div>

          <div class="form-group">
            <label for="password">Password</label>
            <input
                type="password"
                id="password"
                class="form-control form-control-lg"
                placeholder="Password"
                v-model="password"
            />
          </div>

          <b-button
              class="w-100 btn btn-lg btn-primary"
              variant="primary"
              @click="login({username, password})"
          >Sign in</b-button
          >
        </form>
      </div>
    </div>
    <p class="mt-3 mb-3 text-muted text-center">© 2020–2025</p>
  </main>
</template>

<script>
import { mapActions, mapState } from 'vuex'
export default{
  name: "AppHome",
  data(){
    return{
      username:"",
      password:"",

    }
  },
  computed:{
    ...mapState(['isLogin','isLoginError'])
  },
  methods:{
    ...mapActions(["login"]),
  }
}
</script>

<style lang="css" scoped>
body {
  display: flex;
  padding-top: 60px;
  padding-bottom: 60px;
  align-items: center;
  background-color: #f6f6f6;
}
.card {
  margin-top: 30%;
}
.form-signin {
  margin-top: 100px;
  width: 100%;
  max-width: 450px;
  margin: auto;
}
label {
  font-weight: 600;
}
</style>
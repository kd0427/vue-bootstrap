<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand @click="move">VueStudy</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav v-if="isLogin">
          <b-nav-item
              router :to="{name:'board'}"

          >
            게시판
          </b-nav-item>
          <b-nav-item
              router :to="{name:'management'}"
              v-if="userInfo.authorities==='ROLE_ADMIN'"
          >관리자페이지
          </b-nav-item>
        </b-navbar-nav>

        <!-- Right aligned nav items -->
        <b-navbar-nav class="ml-auto">
          <b-nav-item router :to="{name:'login'}" v-if="!isLogin">로그인</b-nav-item>
          <b-nav-item router :to="{name:'join'}" v-if="!isLogin">회원가입</b-nav-item>
          <b-nav-item-dropdown right v-if="isLogin">
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>User</em>
            </template>
            <b-dropdown-item router :to="{name:'myPage'}">MyPage</b-dropdown-item>
            <b-dropdown-item @click="logout">Log Out</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>
  </div>
</template>
<script>
import { mapState, mapActions} from "vuex";

export default {
  name: "AppHeader",
  computed: {
    ...mapState(['isLogin','userInfo']),
  },

  methods: {
    ...mapActions(['logout']),
    move() {
      this.$router.push({name: 'home'})
    }
  },

};
</script>

<style>
</style>
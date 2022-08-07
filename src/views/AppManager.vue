<template>
  <div class="container mt-5">
    <b-card-group deck style="justify-content: space-around">
      <b-card
        title="게시판"
        header-tag="header"
        footer-tag="footer"
        style="max-width: 25rem"
      >
        <template #header>
          <h6 class="mb-0">게시판 관리</h6>
        </template>
        <b-card-text>게시판 관리를 할 수 있습니다.</b-card-text>
        <b-button variant="primary" :to="{name:'boardManagement'}">Go somewhere</b-button>
        <template #footer>
          <em></em>
        </template>
      </b-card>

      <b-card
        title="회원"
        header-tag="header"
        footer-tag="footer"
        style="max-width: 25rem"
      >
        <template #header>
          <h6 class="mb-0">회원관리</h6>
        </template>
        <b-card-text>회원을 관리 할 수 있습니다.</b-card-text>
        <b-button variant="primary" :to="{name:'userManagement'}">Go somewhere</b-button>

        <template #footer>
          <em></em>
        </template>
      </b-card>
    </b-card-group>
  </div>
</template>

<script>
export default {
  name: "AppManager",
};
</script>

<style>
</style>
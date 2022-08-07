import Vue from 'vue';
import VueRouter from 'vue-router';
import AppHome from './views/AppHome';
import AppBoard from './views/AppBoard';
import AppManager from './views/AppManager';
import AppForm from './views/AppForm';
import AppLogin from "@/views/AppLogin";
import store from "@/store";
import AppJoin from "@/views/AppJoin";
import AppMyPage from "@/views/AppMyPage";
import AppMyPageModify from "@/views/AppMyPageModify";
import AppBoardDetail from "@/views/AppBoardDetail";
import AppModifyBoard from "@/views/AppModifyBoard";
import AppBoardManagement from "@/views/AppBoardManagement";
import AppUserManagement from "@/views/AppUserManagement";

Vue.use(VueRouter);



const router = new VueRouter({
  mode: 'history',
  routes: [{
      path: "/",
      name:"home",
      component: AppHome
    },
    // 유저
    {
      path: "/login",
      name:"login",
      component: AppLogin
    },
    {
      path: "/join",
      name:"join",
      component: AppJoin
    },
    {
      path:"/myPage",
      name:"myPage",
      component: AppMyPage
    },
    {
      path:"/myPageModify",
      name:"myPageModify",
      component: AppMyPageModify
    },
    // 게시판
    {
      path: "/board",
      name:"board",
      component: AppBoard

    },
    {
      path: "/write",
      name:"write",
      component: AppForm
    },
    {
      path: "/detail",
      name: "BoardDetail",
      component: AppBoardDetail
    },
    {
      path:"/modifyBoard",
      name:"modifyBoard",
      component: AppModifyBoard
    },

    // 관리자
    {
      path: "/management",
      name:"management",
      component: AppManager
    },
    {
      path:"/boardManagement",
      name:"boardManagement",
      component: AppBoardManagement
    },
    {
      path:"/userManagement",
      name:"userManagement",
      component: AppUserManagement
    }
  ],
});

router.beforeEach((to,from,next)=>{
  if(to.path==='/' || to.path==='/login' || to.path==='/join'){
    next()
  }else if(store.state.isLogin){
    next()
  }else{
    alert("로그인 해야 합니다.")
    next('/login')
  }
});
export default router;
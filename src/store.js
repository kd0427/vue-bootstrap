import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
import axios from 'axios'
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex)

export default new Vuex.Store({
    plugins: [
        createPersistedState()
    ],
    state: {
        userInfo:null,
        isLogin: false,
        isLoginError: false,
        token:"",
        user_name:"",
        user_auth:"",
    },
    mutations: {
        //로그인 성공했을 때,
        loginSuccess(state, payload){
            state.isLogin = true
            state.isLoginError=false
            state.userInfo = payload
            state.token =localStorage.getItem("access-token")
            console.log(state.token)
        },
        //로그인 실패했을 때
        loginError(state){
            state.isLogin=false
            state.isLoginError=true
        },
        logout(state){
            state.isLogin = false
            state.isLoginError = false
            state.userInfo = null
            state.token= null
            state.config= null
        },
    },
    actions: {
        // 로그인 시도
        login({ dispatch }, loginObj){
            axios
                // 로그인 -> 토큰 반환
                .post("http://localhost:9090/api/login", loginObj)
                .then(res => {
                    // 성공 시 token 이 온다. (토큰과 함께 실제로는 user_id 값을 받아온다)
                    // 토큰을 헤더에 포함시켜서 유저정보 요청
                    console.log("로그인했다")
                    console.log(res)
                    let token = "Bearer "+res.data.token
                    let username = res.data.username
                    // 토큰을 로컬 스토리지에 저장
                    localStorage.setItem("access-token",token)
                    localStorage.setItem("login_id",username)
                    dispatch("getMemberInfo")
                })
                .catch( ()=> {
                    alert('이메일과 비밀번호를 확인하세요.')
                })
        },

        logout({ commit }) {
            commit("logout")
            router.push({name: "home"})
        },

        getMemberInfo({ commit }){
            // 로컬 스토리지에 저장되어 있는 토큰을 불러온다.
            let config = {
                headers:{
                    "Authorization": localStorage.getItem("access-token")
                }
            }
            // 토큰 -> 유저정보 가져옴.
            // 새로 고침 -> 토큰만 가지고 멤버정보를 요청
            axios
                .get("http://localhost:9090/api/user", config)
                .then(response=>{
                    console.log(response)

                    let userInfo = {
                        user_id: response.data.user_id,
                        user_address: response.data.user_address,
                        user_date: response.data.user_date,
                        user_email: response.data.user_email,
                        user_name: response.data.user_name,
                        user_phone: response.data.user_phone,
                        authorities: response.data.authorities[0].authority_name
                    }
                    console.log(userInfo.authorities)
                    console.log(typeof userInfo.authorities)
                    commit('loginSuccess',userInfo)
                    router.push({name: "board"})
                })
                .catch(error=>{
                    console.log(error)
                })
        },
    }
})

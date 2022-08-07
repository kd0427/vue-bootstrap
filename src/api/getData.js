import interceptor from '@/utils/axiosIntercepter.js'

export default {
    //회원가입
    joinUser(data){
        return interceptor({
            url:'/signup',
            method:'post',
            data:data
        })
    },

    // 유저 정보 수정
    modifyUser(data){
        return interceptor({
            url:'modify',
            method:'put',
            data:data
        })
    },

    //게시글 리스트 불러오기
    boardList(){
        return interceptor({
            url:'/board',
            method:'get'
        })
    },

    //게시글 등록
    write(data){
        return interceptor({
            url:'/board',
            method:'post',
            data:data
        })
    },

    //게시글 상세보기
    boardDetail(board_no){
        return interceptor({
            url:'/board/'+board_no,
            method:'get'
        })
    },

    //게시글 수정
    modifyBoard(board_no,data){
        return interceptor({
            url:'/board/'+board_no,
            method:'put',
            data:data
        })
    },

    //게시글 삭제
    boardDelete(board_no) {
        return interceptor({
            // baseURL설정되어 있기 때문에 그 뒤의 URL만 작성합니다.
            url: '/board/'+board_no,
            method: 'delete'
        })
    },

    //댓글 불러오기
    commentList(board_no){
        return interceptor({
            url:'/board/comment/'+board_no,
            method: 'get'
        })
    },
    //댓글 작성
    commentWrite(board_no,data){
        return interceptor({
            url:'/board/comment/'+board_no,
            method:'post',
            data: data
        })
    },
    //댓글 수정
    commentModify(comment_no,data){
     return interceptor({
         url:'/board/comment/'+comment_no,
         method:'put',
         data: data
     })
    },
    //댓글 삭제
    commentDelete(comment_no){
        return interceptor({
            url:'/board/comment/'+comment_no,
            method:'delete'
        })
    },
    // 유저리스트 가져오기
    getAllUserList(){
        return interceptor({
            url:'/allUser',
            method:'get'
        })
    },

    userManagement(userActivated, user_id) {
        return interceptor({
            url:'/userManagement',
            method:'put',
            data:{
                user_activated:userActivated,
                username: user_id
            }
        })
    }
}
<template>
  <div>
    <b-card class="container outlined mt-4">
      <b-table striped hover :items="items" :fields="fields">
        <template #cell(Management)="row">
          <b-button
              size="sm"
              variant="danger"
              @click="userManagement(row.item.user_activated,row.item.user_id)"
              v-if="row.item.user_activated===true"
          >
            비활성
          </b-button>
          <b-button
              size="sm"
              variant="primary"
              @click="userManagement(row.item.user_activated,row.item.user_id)"
              v-if="row.item.user_activated===false"
          >
            활성
          </b-button>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import DB from '@/api/getData'

export default {
  data() {
    return {
      // Note 'isActive' is left out and will not appear in the rendered table
      fields: [
        {
          key: 'user_id',
        },
        {
          key: 'user_name',
        },
        {
          key: 'user_email',
          label: 'Person age',
        },
        {
          key:'user_address'
        },
        {
          key:'user_phone'
        },
        {
          key:'user_date'
        },
        {
          key:'user_activated'
        },
        {
          key:'user_address'
        },
        {
          key:"auth"
        },
        'Management'
      ],
      items: []
    }
  },

  methods:{
    getAllUserList() {
      DB.getAllUserList()
          .then(res=>{
            console.log(res)
            this.items=res.data
          })
          .catch(err =>{
            console.log(err)
            console.log("??")
          })
    },
    userManagement(userActivated,user_id){
      let msg =
          userActivated
              ? "유저를 비활성화 하시겠습니까?"
              :"유저를 활성화 하시겠습니까?"

      if(confirm(msg)){
        DB.userManagement(userActivated,user_id)
            .then(res=>{
              console.log(res)
              this.getAllUserList()
            })
            .catch(err=>{
              console.log(err)
            })
      }



    }
  },
  mounted() {
    this.getAllUserList()
  },
}
</script>
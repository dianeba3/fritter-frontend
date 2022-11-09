<template>
  <main>
    <div class="sidebyside">
      <img class="profilePic" :src="this.profile_pic" >
      <div class="bio">
        <h2>{{ this.userId }}</h2>
        <p>{{this.profile_bio}}</p>
      </div>
      <div v-if="$store.state.username !== this.userId"> 
        <button>
          Follow
        </button>
      </div>
    </div>
    <hr>
  
  <div class="flex-container" >
    <div class="flex-child">
      <div class="block">
      <CreateFreetForm />
      </div>
      <h1> Freets By You </h1>
      <div class="freets"
        v-if="this.freets.length">
        <FreetComponent
          v-for="freet in this.freets"
          :key="freet.id"
          :freet="freet"/>
      </div>
    </div>

    <div class="flex-child">
      <div class="flex-container">  
        <FollowForm />
        <DeleteFollowForm />
      </div>
      <hr>
        <UserListComponent :userId="this.userId"/>
    </div>
  </div>

  </main>
</template>

<script>

import FreetComponent from '@/components/Freet/FreetComponent.vue';
import CreateFreetForm from '@/components/Freet/CreateFreetForm.vue';
import GetFreetsForm from '@/components/Freet/GetFreetsForm.vue';
import UserListComponent from '@/components/Following/UserListComponent.vue';
import FollowForm from '@/components/Following/FollowForm.vue';
import DeleteFollowForm from '@/components/Following/DeleteFollowForm.vue';


export default {
  name: 'ProfileComponent',
  components: {
    FreetComponent, 
    GetFreetsForm, 
    CreateFreetForm, 
    UserListComponent,
    FollowForm,
    DeleteFollowForm},
  props: {
    userId: String,
  },
  data() {
    return {
      profile_bio: String,
      profile_pic: String,
      freets: Array,
    };
  },

  created() {
  this.getProfile();
  this.getFreets();
  },

  methods: {
    async getProfile(){
      const url = `/api/profile?userId=${this.userId}`;
      try {
      const r = await fetch(url);
      const res = await r.json();
      if(!r.ok) {
        throw new Error (res.error);
      }
      console.log(this.userId);
      console.log(res);
      this.profile_bio = res.bio;
      this.profile_pic = res.picture;
      console.log(this.profile_bio);
      } catch (e) {
        this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },

     async getFreets(){
      const url = `/api/freets?author=${this.userId}`;
      try {
      const r = await fetch(url);
      const res = await r.json();
      if(!r.ok) {
        throw new Error (res.error);
      }
      console.log(res);
      this.freets = res;
      // console.log(res);
      } catch (e) {
        this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
  }
};
</script>

<style scoped>
/* section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
} */

.sideButtons{
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 30px;

}

.profile-background {
  padding-top: 70%;
  width: 50%;
  padding-bottom: 0%;

}

.profilePic {
  width: 20%;
  border-radius: 50%;
}

.sidebyside {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  border: 1px solid #224414;
}

.btn{
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: white;
  border: 2px solid #224414;
  border-radius: 20px;
  border-width: 5px;
  font-size: 15px;
  padding: 10px;
  /* margin-top: 30px; */
}

.bio{
  /* width:20%; */
  margin-left: 70px ;
  border: 5px solid #224414;
  /* padding: 1%; */
  padding-left: 70px;
  padding-right: 70px;
  padding-top: 50px;
  padding-bottom: 50px;
}

hr{
  border: 1px solid #224414;
  background-color: #224414;
  width: 100%;
  padding-bottom: 20px;
}

button{
  margin-left: 15px;
  margin-right: 50px;
  background-color:#224414;
  color: white;
  font-size: 25px;

}

.flex-container {
    display: flex;
}

.flex-child {
    flex: 1;
    border: 2px solid #224414;
}  

.flex-child:first-child {
    margin-right: 20px;
} 

p {
  font-size: 25px;
  color: #224414;
  text-transform: capitalize;

}

header, h2, h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    color:#224414;
    text-transform: capitalize;
    font-size: 40px;
}

.freets{
  margin-left: 5%;
  width: 60%
}

.block{
  width:200%;
}

</style>

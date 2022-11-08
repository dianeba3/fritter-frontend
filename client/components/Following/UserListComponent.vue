<template>
  <main>
    <div class="sideButtons">
      <div>
        <h1> Following </h1>
        <ul>
          <li v-for="user in this.following" :key='user'>
            {{ user.following }}
          </li> 
        </ul>
      </div>

      <div>
        <h1> Followers </h1>
        <ul>
          <li v-for="userna in this.followers" :key='userna'>
            {{ userna.username }}
          </li> 
        </ul>
      </div>
    </div>

  </main>
</template>

<script>

export default {
  name: 'UserListComponent',
  props: {
    userId: String,
  },
  data() {
    return {
      following: Array,
      followers: Array,
    };
  },
  created() {
    this.getFollowers();
    this.getFollowing();
  },
  
  methods: {
    async getFollowers(){
      const url = `/api/following/followers?userId=${this.userId}`;
      try {
      const r = await fetch(url);
      const res = await r.json();
      if(!r.ok) {
        throw new Error (res.error);
      }
      this.followers = res.following;
      // console.log("here");
      // console.log(res.following);
      } catch (e) {
        this.$set(this.alerts, e, 'error');
          setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },

     async getFollowing(){
      const url = `/api/following/following?userId=${this.userId}`;
      try {
      const r = await fetch(url);
      const res = await r.json();
      if(!r.ok) {
        throw new Error (res.error);
      }
      // console.log("no here");
      // console.log(res.following);
      this.following = res.following;
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

header, h2, h1 {
    display: flex;
    justify-content: center;
    align-items: center;
    color:#224414;
    text-transform: capitalize;
    font-size: 40px;
}

li {
  color: #224414;
  font-size: 25px;
}

.sideButtons{
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;

  /* padding-top: 30px; */

}


</style>
<!-- Page for account sign-in and registration -->
<!-- User should be NOT authenticated in order to see this page -->

<template>
  <main>
    <section>
        <img class="profile-background" src="../../public/profile_background.jpg">
        <!-- <img src=> -->
    </section>
    <section>
        <h2>Profile for: {{ $store.state.username }}</h2>
        <h2>{{this.profile_bio}}</h2>
    </section>
  </main>
</template>

<script>


export default {
    name: 'ProfilePage',
    data() {
      return {
        profile_bio: String,
        profile_pic: String,
      };
    },
    created() {

    this.getProfile();
    },

    methods: {
        async getProfile(){
          const url = `/api/profile`;
          try {
          const r = await fetch(url);
          const res = await r.json();
          if(!r.ok) {
              throw new Error (res.error);
              }
          this.profile_bio = res.bio;
          this.profile_pic = res.pic;

          console.log(res);
          } catch (e) {
          this.$set(this.alerts, e, 'error');
              setTimeout(() => this.$delete(this.alerts, e), 3000);
              }
        },
    }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.profile-background {
  width: 50%;
}

header, h2 {
    display: flex;
    justify-content: space-between;
    align-items: center;
    color:#224414;
    text-transform: capitalize;

}

</style>

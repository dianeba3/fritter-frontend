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
    </section>
  </main>
</template>

<script>


export default {
    name: 'ProfilePage',

    created() {
    this.getProfilePic();
    },
    methods: {
        async getProfilePic(){
        const url = `/api/profile?author=${this.$store.state.username}`;
        try {
        const r = await fetch(url);
        const res = await r.json();
        if(!r.ok) {
            throw new Error (res.error);
            }
        this.contributions = res;
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
    color:#224414
}

</style>

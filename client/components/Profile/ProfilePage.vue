<template>
  <main>

    <ProfileComponent :userId="this.$store.state.username" />
  </main>
</template>

<script>

import ProfileComponent from '@/components/Profile/ProfileComponent.vue';

export default {
  components: { ProfileComponent },
  name: 'ProfilePage',

};
</script>

<style scoped>


</style>

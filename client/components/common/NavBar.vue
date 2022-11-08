<!-- A basic navigation bar component -->
<!-- Example of a component which is included on all pages (via App.vue) -->
<!-- This navbar takes advantage of both flex and grid layouts for positioning elements; feel free to redesign as you see fit! -->

<template>
  <nav>
    <div class="left">
      <img src="../../public/image.png">
      <router-link class="title" to="/home">
        Fritter
      </router-link>
    </div>
    <div class="right">
      <router-link class="link-tab" class-active="router-link-active"
        v-if="$store.state.username"
        to="/home"
      >
        Home
      </router-link>
      <router-link class="link-tab" class-active="router-link-active"
        v-if="$store.state.username"
        to="/profile"
      >
        Profile
      </router-link>
      <router-link class="link-tab" class-active="router-link-active"
        v-if="$store.state.username"
        to="/account"
      >
        Settings
      </router-link>
      <router-link class="login-link"
        v-else
        to="/login"
      >
        Sign In
      </router-link>
    </div>
    <section class="alerts">
      <article
        v-for="(status, alert, index) in $store.state.alerts"
        :key="index"
        :class="status"
      >
        <p>{{ alert }}</p>
      </article>
    </section>
  </nav>
</template>

<style scoped>
nav {
    padding: 1vw 2vw;
    color: white;
    background-color: #224414;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
}

.router-link{
    text-decoration: none !important;
}

.router-link-active{
  color: #689f38 !important;
}

.link-tab{
  color: white;
  text-decoration: none !important;
}

.login-link{
  color: white;
}

.link-tab:hover{
  background-color: #306844;
  cursor: pointer;
}

.title {
    color: white !important;
    font-size: 32px;
    margin: 0 5px;
    text-decoration: none !important;
}

img {
    height: 38px;
}

.left {
	display: flex;
	align-items: center;
}

.right {
    font-size: 20px;
    display: grid;
    gap: 16px;
    grid-auto-flow: column;
    align-items: center;
}

.right a {
    margin-left: 5px;
}

.alerts {
    width: 25%;
}

</style>

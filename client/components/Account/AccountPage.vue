<!-- Page for account settings and management -->
<!-- User should be authenticated in order to see this page -->

<template>
  <main>
    <section>
      <header>
        <h2>Profile settings for @{{ $store.state.username }}</h2>
      </header>
      <NewProfileForm />
      <NewProfileBioForm />
      <NewProfilePicForm />
      <header>
        <h2>Account settings for @{{ $store.state.username }}</h2>
      </header>
      
      <ChangeUsernameForm />
      <ChangePasswordForm />
    </section>

    <section>
    <header>
        <h2>Follower Barrier settings</h2>
    </header>
    <CreateFBForm />
    <ChangePasscodeForm />
    <DeleteFBForm />
    
    </section>

    <section>
      <header>
        <h2>Account management</h2>
      </header>
      <LogoutForm />
      <DeleteAccountForm />
    </section>
  </main>
</template>

<script>
import ChangeUsernameForm from '@/components/Account/ChangeUsernameForm.vue';
import ChangePasswordForm from '@/components/Account/ChangePasswordForm.vue';
import DeleteAccountForm from '@/components/Account/DeleteAccountForm.vue';
import LogoutForm from '@/components/Account/LogoutForm.vue';
import NewProfileForm from '@/components/Profile/NewProfileForm.vue';
import NewProfileBioForm from '@/components/Profile/NewProfileBioForm.vue';
import NewProfilePicForm from '@/components/Profile/NewProfilePicForm.vue';
import CreateFBForm from '@/components/FollowerBarrier/CreateFBForm.vue';
import DeleteFBForm from '@/components/FollowerBarrier/DeleteFBForm.vue';
import ChangePasscodeForm from '@/components/FollowerBarrier/ChangePasscodeForm.vue';

export default {
  name: 'AccountPage',
  components: {
    NewProfileForm,
    NewProfilePicForm,
    NewProfileBioForm,
    ChangeUsernameForm,
    ChangePasswordForm,
    DeleteAccountForm,
    LogoutForm,
    CreateFBForm,
    DeleteFBForm,
    ChangePasscodeForm
  }
};
</script>

<style scoped>
section {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #224414;
}

</style>


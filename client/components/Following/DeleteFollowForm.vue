<!-- Form for deleting account (block style) -->

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'DeleteFollowingForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/following',
      method: 'DELETE',
      hasBody: true,
      setUsername: false,
      fields: [
        {id: 'following', label: 'Unfollow', value: ''},
      ],
      title: 'Delete Following',
      callback: () => {
        this.$router.push({name: 'Profile'}); 
        this.$store.commit('alert', {
          message: 'Your following has been deleted!', status: 'success'
        });
      }
    };
  }
};
</script>

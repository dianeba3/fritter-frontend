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
        const message = 'Successfully unfollowed a user!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>


<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'DeleteFBForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/followerBarrier',
      method: 'DELETE',
      setUsername: false,
      title: 'Delete Follower Barrier',
      fields: [],
      content: 'You are deleting your FB',

      callback: () => {
        const message = 'Successfully deleted a follower barrier!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>

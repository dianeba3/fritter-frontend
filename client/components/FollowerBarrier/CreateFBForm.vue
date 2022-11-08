<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'CreateFBForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/followerBarrier',
      method: 'POST',
      hasBody: true,
      setUsername: false,
      fields: [
        {id: 'passcode', label: 'Passcode', value: ''},
      ],
      title: 'Create Follower Barrier',
      callback: () => {
        const message = 'Successfully created a follower barrier!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>



<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'ChangePasscodeForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/follower_barrier',
      method: 'PUT',
      hasBody: true,
      setUsername: false,
      fields: [
        {id: 'passcode', label: 'New Passcode', value: ''}
      ],
      title: 'Change Follower Barrier Passcode',
      callback: () => {
        const message = 'Successfully changed passcode!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>

<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'ChangePasscode',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/followerBarrier',
      method: 'PUT',
      hasBody: true,
      fields: [
        {id: 'passcode', label: 'Passcode', value: ''}
      ],
      title: 'Change passcode',
      callback: () => {
        const message = 'Successfully changed passcode!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>

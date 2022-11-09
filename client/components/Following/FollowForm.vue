<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'FollowForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/following',
      method: 'POST',
      hasBody: true,
      setUsername: false,
      fields: [
        {id: 'following', label: 'Follow', value: ''},
        {id: 'passcode', label: 'Passcode if you have a follower ', value: ''},
      ],
      title: 'Create Following',
      callback: () => {
        const message = 'Successfully followed a user!';
        this.$router.push({name: 'Profile'});
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>


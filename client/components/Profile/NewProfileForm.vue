
<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'NewProfileForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/profile',
      method: 'POST',
      hasBody: true,
      setUsername: false,
      fields: [
        {id: 'bio', label: 'Bio', value: ''},
        {id: 'picture', label: 'Picture', value: ''},
      ],
      title: 'Create Profile',
      callback: () => {
        const message = 'Successfully created a profile!';
        this.$router.push({name: 'Profile'});
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>


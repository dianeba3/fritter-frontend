
<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'NewProfilePicForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/profile',
      method: 'PUT',
      hasBody: true,
      setUsername: false,
      fields: [
        {id: 'picture', label: 'Picture (use image address url for pic - do not upload', value: ''}
      ],
      title: 'Change Picture',
      callback: () => {
        const message = 'Successfully changed picture!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>


<script>
import BlockForm from '@/components/common/BlockForm.vue';

export default {
  name: 'NewProfileBioForm',
  mixins: [BlockForm],
  data() {
    return {
      url: '/api/profile',
      method: 'PUT',
      hasBody: true,
      setUsername: false,
      fields: [
        {id: 'bio', label: 'Bio', value: ''}
      ],
      title: 'Change Bio',
      callback: () => {
        const message = 'Successfully changed bio!';
        this.$set(this.alerts, message, 'success');
        setTimeout(() => this.$delete(this.alerts, message), 3000);
      }
    };
  }
};
</script>

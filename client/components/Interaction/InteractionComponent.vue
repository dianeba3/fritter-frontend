<template>
  <div>
    <div class="flex">
      
      <ButtonInteractionComponent 
      :freet="freet"
      type="like" />

      <ButtonInteractionComponent 
      :freet="freet"
      type="dislike" />
    </div>
    

  </div>
</template>

<script>
import ButtonInteractionComponent from '@/components/Interaction/ButtonInteractionComponent.vue';

export default {
  name: 'InteractionComponent',
  components: {ButtonInteractionComponent},

  props: {
    freet: {
      type: Object,
      required: true
    }
  },
};
</script>

<style scoped>

.flex {
    display: flex;
}

</style>

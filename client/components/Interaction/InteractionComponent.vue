<template>
  <div>
    <button
      v-if="inter_type !== 'like' "
      v-bind:class="{'clicked': exists, 'notCicked': !exists}"
      @click="addInteraction('like')"
    >
      🤍
    </button>
    <button v-else 
    v-bind:class="{'clicked': exists, 'notCicked': !exists}"
    @click="deleteInteraction"
    >
      🤍
    </button>
  </div>
</template>

<script>
export default {
  name: 'InteractionComponent',
  props: {
    freet: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
    inter_id: "",
    inter_type: "",
    exists: false,
    };
  },

   mounted () {
    this.checkExists();
  },

  methods: {
    checkExists() {
      this.$store.commit('refreshInteractions');
      this.exists = false;
      this.inter_type = '';
      for (const i of this.$store.state.interactions) {
        if (i.freetId === this.freet._id && i.authorId === this.$store.state.username) {
          // interaction has same freet id as the freet and same author as user in session
          this.i_type = i.type;
          this.exists = true;
          this.inter_id = i._id;
        }
      }
    },
    addInteraction(interaction_type) {
      this.checkExists();
      if (this.exists) { // interaction already exists so change it - dont create
        this.updateInteraction(interaction_type);
        return;
      } else { // interaction doesnt exist so create it
        const params = {
          method: 'POST',
          body: JSON.stringify({
            type: interaction_type,
            authorId: this.$store.state.username,
            freetId: this.freet._id,
            content: ""
            }),
          callback: () => {
            this.inter_type = interaction_type;
            this.exists = true;
            this.$store.commit('alert', {
              message: 'Successfully added interaction!', status: 'success'
            });
          }
        }
        this.request_noId(params);
      }
    },

    updateInteraction(interaction_type) {
      this.deleteInteraction(); // need to first delete it and then add the new interaction
      // just because of how I made my backend work unfortunately
      // this.addInteraction(interaction_type);
    },  

    deleteInteraction() {
      console.log("delete");
      this.checkExists();
      const params = {
        method: 'DELETE',
        callback: () => {
          this.inter_type = '';
          this.exists = false;
          this.$store.commit('alert', {
            message: 'Successfully deleted interaction!', status: 'success'
          });
        }
      };
      this.request_Id(params)
    },

    async request_noId(params) {
      /**
       * Submits a request to the interaction endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };

      if (params.body) {
        options.body = params.body;
      }

      try {
        const r = await fetch (`/api/interaction`, options);
        if(!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        this.$store.commit('refreshInteractions');
        this.checkExists();
        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    },
  

  async request_Id(params) {
      /**
       * Submits a request to the interaction endpoint
       * @param params - Options for the request
       * @param params.body - Body for the request, if it exists
       * @param params.callback - Function to run if the the request succeeds
       */
      const options = {
        method: params.method, headers: {'Content-Type': 'application/json'}
      };

      if (params.body) {
        options.body = params.body;
      }

      try {
        console.log(this.inter_id);
        const r = await fetch (`/api/interaction/${this.inter_id} `, options);
        if(!r.ok) {
          const res = await r.json();
          throw new Error(res.error);
        }
        this.$store.commit('refreshInteractions');
        this.checkExists();
        params.callback();
      } catch (e) {
        this.$set(this.alerts, e, 'error');
        setTimeout(() => this.$delete(this.alerts, e), 3000);
      }
    }
  }
};
</script>

<style scoped>
button {
  background-color: #f1f8e9;
  border: 1px solid #224414;
  border-radius: 100px;
  border-width: 1px;
  font-size: 20px;
  margin-right: 0px;
  width: 2em;
}

.notClicked {
  background-color: #f1f8e9;     
}
.clicked {
  background-color: #224414;
}
</style>

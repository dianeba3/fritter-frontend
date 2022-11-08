<template>
  <div class="container">
    
    <button
      v-if="inter_type !==  type"
      v-bind:class="{'clicked': exists, 'notClicked': !exists}"
      @click="addInteraction(type)"
    >
      {{ type }}
    </button>
    
    <button v-else 
    v-bind:class="{'clicked': exists, 'notClicked': !exists}"
    @click="deleteInteraction"
    >
      {{ type }}
    </button>
    
    <div>
    <small class="num" > {{num}} </small>
    </div>

  </div>
 
</template>

<script>
export default {
  name: 'ButtonInteractionComponent',
  props: {
    freet: {
      type: Object,
      required: true
    },
    type: String
  },
  data() {
    return {
    inter_id: "",
    inter_type: "",
    colorExists: false,
    exists: false,
    num: 0,
    };
  },

  mounted () {
    this.checkExists();
  },

  methods: {
    async checkExists() {
      const url = '/api/interaction';
      const r = await fetch(url);
      if(!r.ok) {
        this.num = 0;
      }else{
        const res = await r.json();
        const interactions = res;
        this.exists = false;
        this.inter_type = '';
        this.inter_id = "";
        for (const i of interactions) {
          this.findNum();
          if (i.freetId === this.freet._id && i.authorId === this.$store.state.username && i.type === this.type) {
            // interaction has same freet id as the freet and same author as user in session
            console.log("check");
            // console.log(this.type);
            
            this.inter_type = i.type;
            this.exists = true;
            this.inter_id = i._id;
          }
        }
      }
    },

    async findNum() {
      const url = `/api/interaction?freetId=${this.freet._id}&interType=${this.type}`;
      const res = await fetch(url).then(async r => r.json());
       
      this.num = res;

    },

    addInteraction(interaction_type) {
      this.checkExists();
      if (this.exists) { // interaction already exists so change it - dont create
        this.deleteInteraction(interaction_type);
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

    deleteInteraction() {
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
          this.$store.commit('alert', {
            message: 'Error', status: 'error'
          });
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
          this.$store.commit('alert', {
            message: 'Error', status: 'error'
          });
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
.container {
  text-align: center;
}

button {
  color: white;
  border: 2px solid #224414;
  border-radius: 20px;
  /* border-width: 2px; */
  font-size: 15px;
}

.num {
  font-size: 12px;
}

.notClicked {
  color: #224414;
}
.clicked {
  background-color: #224414 !important;
}
</style>

<template>
    <div :class="[ isRegistrationActive ? 'is-active' : '', 'modal' ]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ modalTitle }}</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="text" placeholder="Full Name" v-model="input.fullName">
              <span class="icon is-small is-left">
                <i class="fas fa-user"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="email" placeholder="Email" v-model="input.email">
              <span class="icon is-small is-left">
                <i class="fas fa-envelope"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left">
              <input class="input" type="password" placeholder="Password" v-model="input.password">
              <span class="icon is-small is-left">
                <i class="fas fa-lock"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="text" placeholder="Phone" v-model="input.phone">
              <span class="icon is-small is-left">
                <i class="fas fa-phone"></i>
              </span>
            </p>
          </div>
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <input class="input" type="text" placeholder="Full Address" v-model="input.fullAddress">
              <span class="icon is-small is-left">
                <i class="fas fa-home"></i>
              </span>
            </p>
          </div>
        </section>
        <footer class="modal-card-foot">
          <button class="button is-success" @click="register()">{{ primaryBtnLabel }}</button>
        </footer>
      </div>
    </div>
</template>

<script>
const axios = require(axios);

export default {
  name: 'registration-component',
  props: ['isRegistrationActive'],

  data () {
        return {
            modalTitle: 'Sign up',
            primaryBtnLabel: 'Sign up',
            input: {
              fullName: '',
              email: '',
              password: '',
              phone: '',
              fullAddress: ''
            }
        }
    },

  methods: {
    closeModal () {
      this.$emit('update:isRegistrationActive', false);
    },
    register() {
      axios.post('http://localhost:8080/api/register', {
        Email: this.input.email,
        Password: this.input.password,
        Fullname: this.input.fullName,
        Phone: this.input.phone,
        FullAddress: this.input.fullAddress,
        CityCode: 1
      }).then(function(response) {
        console.log(response);
      });
    }
  }
}
</script>


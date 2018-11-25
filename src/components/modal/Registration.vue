<template>
    <div :class="[ isRegistrationActive ? 'is-active' : '', 'modal' ]">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">{{ modalTitle }}</p>
          <button class="delete" aria-label="close" @click="closeModal"></button>
        </header>
        <section class="modal-card-body">
          <p class="error-message">{{ errorMessage }}</p>
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
          <div class="field">
            <p class="control has-icons-left has-icons-right">
              <select id="city" class="input" v-model="input.city">
                <option value="" disabled hidden class="placeholder">Select your city</option>
                <option v-for="(city, index) in cities" :key="index" v-bind:value="city.Id" v-bind:class="{ select: input.city == '' }">
                  {{ city.Name }}
                </option>
              </select>
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
import { homeUrl } from '../../helper';
const axios = require('axios');

export default {
  name: 'registration-component',
  props: ['isRegistrationActive'],

  data() {
    return {
      modalTitle: 'Sign up',
      primaryBtnLabel: 'Sign up',
      input: {
        fullName: '',
        email: '',
        password: '',
        phone: '',
        fullAddress: '',
        city: ''
      },
      errorMessage: '',
      cities: []
    }
  },

  mounted() {
    axios.get(homeUrl + 'api/cities')
      .then((response) => {
        console.log(response);
        this.cities = response.data.Data;
      });
  },

  methods: {
    closeModal() {
      this.errorMessage = '';
      this.$emit('update:isRegistrationActive', false);
    },
    register() {
      axios.post('http://localhost:8080/api/users/register', {
        Email: this.input.email,
        Password: this.input.password,
        Fullname: this.input.fullName,
        Phone: this.input.phone,
        FullAddress: this.input.fullAddress,
        CityCode: Number(this.input.city)
      }).then((response) => {
        console.log(response);
        if (response.data.ErrorCode != 111) {
          this.closeModal();
        } else {
          this.errorMessage = 'Email has been used';
        }
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.error-message {
    text-align: center;
    color: rgb(219, 36, 36);
}
select {
  -webkit-appearance: menulist-button;
  padding-left: 2em !important;
}
.select {
  color: #a9a9a9;
}
option:not(:first-of-type) {
  color: black;
}
</style>
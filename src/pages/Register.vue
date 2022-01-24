<template>
  <q-layout class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="flex flex-center">
          <img
            alt="Quasar logo"
            src="~assets/laptop.png"
            style="width: 80px; height: 80px"
          />
        </div>

        <q-form @submit.prevent="register()">
          <q-input clearable v-model="first_name" label="FIRST NAME" />

          <q-input clearable v-model="last_name" label="LAST NAME" />

          <q-input v-model="email" label="EMAIL" placeholder="email@example.com"
            ><template v-if="email" v-slot:append>
              <q-icon
                name="cancel"
                @click.stop="email = null"
                class="cursor-pointer"
              /> </template
          ></q-input>
          <q-input
            v-model="file"
            @change="onFileSelected"
            class="q-mt-md"
            filled
            type="file"
            hint="Upload Image"
          />
          <q-input
            v-model="password"
            :type="isPwd ? 'password' : 'text'"
            label="PASSWORD"
            ><template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-input
            v-model="password_confirmation"
            :type="isPwd ? 'password' : 'text'"
            label="CONFIRM PASSWORD"
            ><template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </q-input>
          <q-btn
            type="submit"
            id="btn"
            class="q-ma-md"
            to="/"
            color="black"
            text-color="white"
            label="REGISTER"
          ></q-btn>
          <q-btn
            id="btn"
            class="q-ma-md"
            to="/"
            color="black"
            text-color="white"
            label="BACK TO LOGIN"
          ></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-layout>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      isPwd: true,
      admin: null,
      first_name: "",
      last_name: "",
      email: "",
      file: null,
      password: "",
      password_confirmation: "",
    };
  },
  methods: {
    onFileSelected(event) {
      // console.log(event.target.files);
      this.file = event.target.files[0];
    },
    register() {
      let fd = new FormData();
      fd.append("first_name", this.first_name);
      fd.append("last_name", this.last_name);
      fd.append("email", this.email);
      fd.append("image", this.file);
      fd.append("password", this.password);
      fd.append("password_confirmation", this.password_confirmation);
      const options = {
        method: "POST",
        url: "http://127.0.0.1:8000/api/admins/register",
        data: fd,
        headers: {
          Authorization: "Bearer 1|UgsIPHGbm9W0uyUZT81Tf7BD36UHO5jTlSfwAFWp",
        },
      };

      axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          this.admin = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
};
</script>
<style></style>

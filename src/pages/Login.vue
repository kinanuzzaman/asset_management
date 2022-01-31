<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="flex flex-center">
          <img
            alt="Quasar logo"
            src="~assets/laptop.png"
            style="width: 80px; height: 80px"
          />
        </div>
        <!--   -->
        <q-form @submit.prevent="login">
          <q-input
            clearable
            v-model="email"
            label="EMAIL"
            placeholder="email@example.com"
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
          <!--   to="/main/users"  -->
          <q-btn
            type="submit"
            id="btn"
            class="q-mt-md"
            color="black"
            text-color="white"
            label="Login"
          ></q-btn>
        </q-form>
        <q-list>
          <q-item>
            <q-item-section> Don't have account with us ? </q-item-section>
            <q-btn id="btn" to="/register" flat label="REGISTER"></q-btn>
          </q-item>
          <q-item>
            <q-item-section> Don't remember password ? </q-item-section>
            <q-btn id="btn" to="/reqpass" flat label="REQUEST PASSWORD"></q-btn>
          </q-item>
        </q-list>
      </q-card-section>
    </q-card>
  </q-page>
</template>
<script>
// import axios from "axios";
//import setToken from "../setToken.js";
export default {
  data() {
    return {
      id: "",
      email: "",
      password: "",
      isPwd: true,
      admin: null,
    };
  },
  created() {},
  methods: {
    login() {
      let fd = new FormData();
      fd.append("email", this.email);
      fd.append("password", this.password);

      const options = {
        method: "POST",
        url: "/login",
        data: fd,
        // headers: {
        //   //Authorization: "Bearer" + localStorage.getItem("token"),
        // },
        headers: {
          Authorization: "Bearer 7|LhUF7CqFjOqVePcvo9FQaGzfpKLU48xgkVvBfcGu",
        },
      };

      this.$axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          this.admin = response.data;
          this.id = response.data.data.id;
          // localStorage.setItem("userToken", response.data.token);
          this.$router.push("/main/users/" + this.id);
        })
        .catch(function (error) {
          console.error(error);
          // localStorage.removeItem("userToken");
        });
      //
    },
  },
};
</script>
<style></style>

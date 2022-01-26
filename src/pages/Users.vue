<template>
  <q-page container>
    <q-list bordered separator>
      <q-item
        :to="`/main/users/details/${user.id}`"
        clickable
        v-ripple
        v-for="user in listUser"
        :key="user.id"
      >
        <q-item-section avatar>
          <q-avatar>
            <img :src="user.image" alt="" />
          </q-avatar>
        </q-item-section>
        <q-item-section>{{ user.full_name }}</q-item-section>
      </q-item>
    </q-list>

    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn :to="`/main/users/add`" fab icon="add" color="primary" />
    </q-page-sticky>
  </q-page>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      file: null,
      prompt: false,
      listUser: [],
      address: "",
    };
  },
  created() {
    const options = {
      method: "GET",
      url: "http://127.0.0.1:8000/api/users",
      headers: {
        Authorization: "Bearer 3|e8jVTwx52A5yiSG49aWocTuWvBnrfc4NRL7TQEeL",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        this.listUser = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  },
  methods: {
    //Get data each time after update
    getData() {
      const options = {
        method: "GET",
        url: "http://127.0.0.1:8000/api/users",
        headers: {
          Authorization: "Bearer 1|UgsIPHGbm9W0uyUZT81Tf7BD36UHO5jTlSfwAFWp",
        },
      };

      axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          this.listEquipment = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
};
</script>
<style></style>

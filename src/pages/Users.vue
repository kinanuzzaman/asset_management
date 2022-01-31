<template>
  <q-page container>
    <q-list bordered separator>
      <q-item
        :to="`/users/details/${id}/${user.id}`"
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
      <q-btn :to="`/users/add/${id}`" fab icon="add" color="primary" />
    </q-page-sticky>
  </q-page>
</template>
<script>
//import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
      prompt: false,
      listUser: [],
      address: "",
    };
  },
  created() {
    const options = {
      method: "GET",
      url: "/users",
      // headers: {
      //   //Authorization: "Bearer 3|e8jVTwx52A5yiSG49aWocTuWvBnrfc4NRL7TQEeL",
      //   Authorization: "Bearer " + localStorage.getItem("token"),
      //   // Authorization: "Bearer 20|SP1OZFEvk1D3Rb1bsGVnZ8vA6cAoowVTyXqfY44L",
      // },
    };

    this.$axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        this.listUser = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  },
};
</script>
<style></style>

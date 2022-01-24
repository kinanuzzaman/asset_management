<template>
  <q-layout>
    <q-form @submit.prevent="EditUser()">
      <q-input v-model="first_name" type="text" label="First Name" />
      <q-input v-model="last_name" type="text" label="Last Name" />
      <q-input
        v-model="file"
        @change="onFileSelected"
        class="q-mt-md"
        filled
        type="file"
        hint="Upload Image"
      />
      <q-card-actions align="right">
        <q-btn
          :to="`/main/users/details/${this.id}`"
          class="q-mt-xl"
          color="gray"
          text-color="#ddd"
          unelevated
          label="Cancel"
          no-caps
        />
        <q-btn
          type="submit"
          class="q-mt-xl"
          color="blue"
          text-color="white"
          unelevated
          label="Save"
          no-caps
          v-close-popup
        />
      </q-card-actions>
    </q-form>
  </q-layout>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
      first_name: "",
      last_name: "",
      file: null,

      userDetails: [],
    };
  },
  // created() {
  //   const options = {
  //     method: "GET",
  //     url: "http://127.0.0.1:8000/api/users" + id,
  //     headers: {
  //       Authorization: "Bearer 3|e8jVTwx52A5yiSG49aWocTuWvBnrfc4NRL7TQEeL",
  //     },
  //   };

  //   axios
  //     .request(options)
  //     .then((response) => {
  //       console.log(response.data);
  //       this.userDetails = response.data;
  //     })
  //     .catch(function (error) {
  //       console.error(error);
  //     });
  // },
  methods: {
    onFileSelected(event) {
      // console.log(event.target.files);
      this.file = event.target.files[0];
    },
    EditUser() {
      let fd = new FormData();
      fd.append("first_name", this.first_name);
      fd.append("last_name", this.last_name);
      fd.append("image", this.file);
      fd.append("_method", "PUT");

      const options = {
        method: "POST",
        url: "http://127.0.0.1:8000/api/users/" + this.id,
        data: fd,
        headers: {
          Authorization: "Bearer 1|UgsIPHGbm9W0uyUZT81Tf7BD36UHO5jTlSfwAFWp",
        },
      };

      axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          this.userDetails = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
      this.getData();
    },
  },
};
</script>
<style scoped></style>

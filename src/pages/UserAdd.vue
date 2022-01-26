<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated>
      <q-toolbar>
        <q-btn flat dense round icon="arrow_back" to="/main/users" />

        <q-toolbar-title class="flex flex-center"> ADD USER</q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page class="q-ml-md">
        <q-form @submit.prevent="addUser">
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
              class="q-mt-xl"
              color="gray"
              text-color="#ddd"
              unelevated
              label="Cancel"
              no-caps
              v-close-popup
            />
            <q-btn
              type="submit"
              class="q-mt-xl"
              color="blue"
              text-color="white"
              unelevated
              label="Save"
            />
          </q-card-actions>
        </q-form>
      </q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      first_name: "",
      last_name: "",
      file: null,

      listUser: [],
    };
  },
  methods: {
    onFileSelected(event) {
      // console.log(event.target.files);
      this.file = event.target.files[0];
    },
    addUser() {
      let fd = new FormData();
      fd.append("first_name", this.first_name);
      fd.append("last_name", this.last_name);
      fd.append("image", this.file);

      const options = {
        method: "POST",
        url: "http://127.0.0.1:8000/api/users",
        data: fd,
        headers: {
          Authorization: "Bearer 1|UgsIPHGbm9W0uyUZT81Tf7BD36UHO5jTlSfwAFWp",
        },
      };

      axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          this.name = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
};
</script>
<style scoped></style>

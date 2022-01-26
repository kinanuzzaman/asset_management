<template>
  <q-page>
    <div>
      <q-list
        class="flex row justify-between"
        bordered
        v-for="list in listEquipment"
        :key="list.id"
      >
        <q-item
          class="col-10"
          clickable
          v-ripple
          :to="`/main/equipments/details/${list.id}`"
        >
          <q-item-section> {{ list.name }}</q-item-section>
        </q-item>

        <q-item class="col-2 flex-center">
          <q-btn round flat icon="more_vert">
            <q-menu auto-close :offset="[110, 0]">
              <q-list style="min-width: 150px">
                <q-item clickable @click="popEdit(list.id)">
                  <q-item-section>Edit</q-item-section>
                </q-item>
                <q-item clickable @click="popDel(list.id)">
                  <q-item-section>Delete</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </q-item>

        <!-- Edit Dialog -->
        <q-dialog v-model="eprompt" persistent>
          <q-card style="min-width: 350px">
            <q-card-section>
              <div class="text-h6">Category Name</div>
            </q-card-section>
            <q-form>
              <q-card-section class="q-pt-none">
                <q-input
                  dense
                  v-model="name"
                  autofocus
                  @keyup.enter="eprompt = false"
                ></q-input>
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="CANCEL" v-close-popup />
                <q-btn
                  v-model="name"
                  @click.prevent="editCategory(flag)"
                  type="submit"
                  color="primary"
                  flat
                  label="SAVE"
                  v-close-popup
                />
              </q-card-actions>
            </q-form>
          </q-card>
        </q-dialog>
        <!-- Delete Dialog -->
        <q-dialog v-model="alert">
          <q-card>
            <q-card-section>
              <div class="text-h6">Delete</div>
            </q-card-section>

            <q-card-section class="q-pt-none">
              Are you sure you want to delete this category and all equipment
              under it?
            </q-card-section>

            <q-card-actions id="right">
              <q-btn flat label="CANCEL" v-close-popup />
              <q-btn
                v-model="flag"
                @click="delCategory(flag)"
                color="red"
                flat
                label="DELETE"
                v-close-popup
              />
            </q-card-actions>
          </q-card>
        </q-dialog>
      </q-list>

      <q-page-sticky position="bottom-right" :offset="[18, 18]">
        <q-btn @click="aprompt = true" fab icon="add" color="primary" />
      </q-page-sticky>
      <q-dialog v-model="aprompt" persistent>
        <q-card style="min-width: 350px">
          <q-card-section>
            <div class="text-h6">Category Name</div>
          </q-card-section>
          <q-form @submit.prevent="addCategory">
            <q-card-section class="q-pt-none">
              <q-input
                dense
                v-model="name"
                autofocus
                @keyup.enter="aprompt = false"
              ></q-input>
            </q-card-section>

            <q-card-actions align="right" class="text-primary">
              <q-btn flat label="CANCEL" v-close-popup />
              <q-btn
                type="submit"
                color="primary"
                flat
                label="SAVE"
                v-close-popup
              />
            </q-card-actions>
          </q-form>
        </q-card>
      </q-dialog></div
  ></q-page>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      aprompt: false,
      eprompt: false,
      alert: false,
      listEquipment: [],
      name: "",
      flag: this.$route.params.id,
    };
  },
  created() {
    //Get data at start
    this.getData();
  },
  methods: {
    //Get data each time after update
    getData() {
      const options = {
        method: "GET",
        url: "http://127.0.0.1:8000/api/categories",
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

    //ADD
    addCategory() {
      const options = {
        method: "POST",
        url: "http://127.0.0.1:8000/api/categories",
        data: {
          name: this.name,
        },
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
      this.getData();
    },
    // EDIT
    popEdit(id) {
      this.eprompt = true;
      this.flag = id;
    },
    editCategory(flag) {
      const options = {
        method: "PATCH",
        url: "http://127.0.0.1:8000/api/categories/" + flag,
        data: {
          name: this.name,
        },
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
      this.getData();
    },
    //Delete
    popDel(id) {
      this.alert = true;
      this.flag = id;
    },

    delCategory(flag) {
      const options = {
        method: "DELETE",
        url: "http://127.0.0.1:8000/api/categories/" + flag,
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
      this.getData();
    },
  },
};
</script>
<style>
#right {
  position: absolute;
  right: 0px;
  width: 100px;
}
</style>

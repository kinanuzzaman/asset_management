<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="arrow_back"
          :to="`/main/equipments/${id}`"
        />

        <q-toolbar-title class="flex flex-center">
          {{ categories.name }}</q-toolbar-title
        >
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <div>
          <q-list
            bordered
            separator
            v-for="(product, index) in categories.products"
            :key="index"
          >
            <q-item>
              <q-item-section>
                <q-item-label
                  >{{ product["brand"] }} {{ product["model"] }}
                </q-item-label>
                <q-item-label>{{ product["description"] }}</q-item-label>
              </q-item-section>

              <q-btn round flat icon="more_vert">
                <q-menu auto-close :offset="[110, 0]">
                  <q-list style="min-width: 150px">
                    <q-item
                      clickable
                      :to="`/equipments/edit/${id}/${eqId}/${product['id']}`"
                    >
                      <q-item-section>Edit</q-item-section>
                    </q-item>
                    <q-item clickable @click="popDel(product['id'])">
                      <q-item-section>Delete</q-item-section>
                    </q-item>
                    <q-item clickable @click="popDiscard(product['id'])">
                      <q-item-section>Discard Item</q-item-section>
                    </q-item>
                    <q-item clickable @click="popDefect(product['id'])">
                      <q-item-section>Mark Defective</q-item-section>
                    </q-item>
                  </q-list>
                </q-menu>
              </q-btn>
            </q-item>
          </q-list>
          <!-- Delete -->
          <q-dialog v-model="alert">
            <q-card>
              <q-card-section>
                <div class="text-h6">Delete</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                Are you sure you want to delete this category and all equipment
                under it?
              </q-card-section>

              <q-card-actions align="right">
                <q-btn flat label="CANCEL" v-close-popup />
                <q-btn
                  @click="delProduct(flag)"
                  color="red"
                  flat
                  label="DELETE"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
            <!-- Defect Dialog -->
          </q-dialog>
          <q-dialog v-model="defprompt" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Explain the Defect</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input
                  dense
                  v-model="defect_details"
                  autofocus
                  @keyup.enter="defprompt = false"
                ></q-input>
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="CANCEL" v-close-popup />
                <q-btn
                  v-model="eqId"
                  @click.prevent="defectProduct(eqId)"
                  type="submit"
                  color="primary"
                  flat
                  label="SAVE"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>
          <!-- Discard Dialog -->
          <q-dialog v-model="disprompt" persistent>
            <q-card style="min-width: 350px">
              <q-card-section>
                <div class="text-h6">Reason For Discarding</div>
              </q-card-section>

              <q-card-section class="q-pt-none">
                <q-input
                  dense
                  v-model="discard_details"
                  autofocus
                  @keyup.enter="disprompt = false"
                ></q-input>
              </q-card-section>

              <q-card-actions align="right" class="text-primary">
                <q-btn flat label="CANCEL" v-close-popup />
                <q-btn
                  v-model="eqId"
                  @click.prevent="defectProduct(eqId)"
                  type="submit"
                  color="primary"
                  flat
                  label="SAVE"
                  v-close-popup
                />
              </q-card-actions>
            </q-card>
          </q-dialog>

          <q-page-sticky position="bottom-right" :offset="[18, 18]">
            <q-btn
              :to="`/equipments/add/${id}/${eqId}`"
              fab
              icon="add"
              color="primary"
            />
          </q-page-sticky></div
      ></q-page>
    </q-page-container>
  </q-layout>
</template>
<script>
//import axios from "axios";

export default {
  data() {
    return {
      id: this.$route.params.id,
      eqId: this.$route.params.eqId,
      flag: "",
      disprompt: false,
      defprompt: false,
      alert: false,
      categories: null,
      products: [],
      address: "",
      defect_details: "",
      discard_details: "",
    };
  },
  created() {
    this.getData();
  },
  methods: {
    getData() {
      const options = {
        method: "GET",
        url: "/categories/" + this.eqId,
        headers: {
          Authorization: "Bearer 3|e8jVTwx52A5yiSG49aWocTuWvBnrfc4NRL7TQEeL",
        },
      };

      this.$axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          this.categories = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
    },

    //Delete
    popDel(val) {
      this.alert = true;
      this.flag = val;
    },

    delProduct(flag) {
      const options = {
        method: "DELETE",
        url: "http://127.0.0.1:8000/api/products/" + flag,
        headers: {
          Authorization: "Bearer 1|UgsIPHGbm9W0uyUZT81Tf7BD36UHO5jTlSfwAFWp",
        },
      };

      this.$axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          this.categories = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
      this.getData();
    },
    // Discard product
    popDiscard(val) {
      this.disprompt = true;
      this.flag = val;
    },
    discardProduct(flag) {
      const options = {
        method: "PATCH",
        url: "/products/discard/" + flag,
        data: {
          discard_details: this.discard_details,
        },
        headers: {
          Authorization: "Bearer 1|UgsIPHGbm9W0uyUZT81Tf7BD36UHO5jTlSfwAFWp",
        },
      };

      this.$axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          this.categories = response.data;
          alert("Marked Discarded");
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    // Defect Product
    popDefect(val) {
      this.defprompt = true;
      this.flag = val;
    },
    defectProduct(flag) {
      const options = {
        method: "PATCH",
        url: "/products/defect/" + flag,
        data: {
          defect_details: this.defect_details,
        },
        headers: {
          Authorization: "Bearer 1|UgsIPHGbm9W0uyUZT81Tf7BD36UHO5jTlSfwAFWp",
        },
      };

      this.$axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          this.categories = response.data;
          alert("Marked Defected");
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
};
</script>
<style></style>

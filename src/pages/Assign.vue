<template>
  <q-layout view="lHh lpr lFf" class="shadow-2 rounded-borders">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="arrow_back"
          :to="`/users/details/${id}/${userId}`"
        />

        <q-toolbar-title class="flex flex-center">
          Assign Equipments</q-toolbar-title
        >
      </q-toolbar>
    </q-header>

    <q-page-container>
      <q-page>
        <div class="q-ml-md">
          <q-input
            label="Search"
            label-color="primary"
            class="q-mr-xl"
            v-model="search"
            type="text"
            @keyup.enter="getProduct(search)"
            hint="Numeric Product Number"
          >
            <template v-slot:append>
              <q-icon name="search" />
            </template>
          </q-input>
        </div>
        <div>
          <p class="bg-grey-4 q-mt-md q-pa-md">Product Details</p>
          <!--  v-for="(product, index) in products" :key="index"-->
          <q-list>
            <q-item>
              <q-item-section>
                <q-item-label v-model="brand">
                  {{ brand }}
                </q-item-label>
                <q-item-label v-model="model">
                  {{ model }}
                </q-item-label>
                <q-item-label v-model="description">
                  {{ description }}</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
        </div>
        <q-btn
          type="submit"
          @click="assignProduct(search)"
          class="q-ma-md"
          color="blue"
          text-color="white"
          unelevated
          label="Assign"
          no-caps
        />
      </q-page>
    </q-page-container>
  </q-layout>
</template>

<script>
//import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
      userId: this.$route.params.userId,
      search: "",
      products: null,
      user_id: "",
      brand: "",
      model: "",
      description: "",
    };
  },
  created() {},
  methods: {
    getProduct(search) {
      const options = {
        method: "GET",
        url: "/products/" + search,
        // headers: {
        //   Authorization: "Bearer 3|e8jVTwx52A5yiSG49aWocTuWvBnrfc4NRL7TQEeL",
        // },
      };

      this.$axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          this.products = response.data.data;
          this.user_id = response.data.data.id;
          this.brand = response.data.data.attributes.brand;
          this.model = response.data.data.attributes.model;

          this.description = response.data.data.attributes.description;
        })
        .catch(function (error) {
          console.error(error);
          alert("Equipments not found");
        });
    },
    assignProduct(search) {
      const options = {
        method: "PATCH",
        url: "/products/assign/" + search,
        data: {
          user_id: this.userId,
        },
        // headers: {
        //   Authorization: "Bearer 3|e8jVTwx52A5yiSG49aWocTuWvBnrfc4NRL7TQEeL",
        // },
      };

      this.$axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          this.products = response.data;
          this.$router.push("/users/details/" + this.id + "/" + this.userId);
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
};
</script>

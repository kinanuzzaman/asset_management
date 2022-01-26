<template>
  <q-layout>
    <div class="q-pa-md">
      <div class="q-gutter-sm">
        <q-form @submit.prevent="addProducts">
          <div class="q-pa-md" style="max-width: 300px">
            <div class="q-gutter-md">
              <q-select
                v-model="category_id"
                :options="categories"
                label="Select Category"
                option-label="name"
              />
              <q-input
                v-model="product_code"
                type="text"
                label="Product Code"
              />
              <q-input v-model="brand" type="text" label="BRAND" />
              <q-input v-model="model" type="text" label="MODEL" />
              <q-input v-model="description" type="text" label="DESCRIPTION" />
            </div>
          </div>

          <q-list>
            <q-item tag="label" v-ripple>
              <q-item-section avatar>
                <q-checkbox v-model="discarded" val="discard" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Mark Discarded</q-item-label>

                <q-item-label
                  ><q-input
                    v-model="discard_details"
                    type="text"
                    label="Reason For Discarding"
                /></q-item-label>
              </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple>
              <q-item-section avatar top>
                <q-checkbox v-model="defected" val="defect" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Mark Defective</q-item-label>
                <q-item-label
                  ><q-input
                    v-model="defect_details"
                    type="text"
                    label="Reason For Defectivity"
                /></q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
          <q-card-actions align="right">
            <q-btn
              flat
              label="BACK"
              :to="`/main/equipments/details/${category_id['id']}`"
            />
            <q-btn
              type="submit"
              color="blue"
              text-color="white"
              label="SAVE"
              v-close-popup
            />
          </q-card-actions>
        </q-form>
      </div>
    </div>
  </q-layout>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      discarded: false,
      defected: false,

      categories: [],
      name: "",
      products: [],
      product_code: "",
      category_id: "",
      brand: "",
      model: "",
      description: "",
      defect_details: "",
      discard_details: null,
    };
  },
  created() {
    //Get data at start

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
        this.categories = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  },
  methods: {
    addProducts() {
      //Get data at start
      const options = {
        method: "POST",
        url: "http://127.0.0.1:8000/api/products",
        data: {
          product_code: this.product_code,
          category_id: this.category_id.id,
          brand: this.brand,
          model: this.model,
          description: this.description,
          defect_details: this.defect_details,
          discard_details: this.discard_details,
        },
        headers: {
          Authorization: "Bearer 1|UgsIPHGbm9W0uyUZT81Tf7BD36UHO5jTlSfwAFWp",
        },
      };

      axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          this.products = response.data;
          alert("Product added succesfully");
        })
        .catch(function (error) {
          console.error(error);
          alert("Product add unsuccesfull");
        });
    },
  },
};
</script>

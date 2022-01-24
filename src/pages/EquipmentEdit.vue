<template>
  <q-layout>
    <div class="q-pa-md">
      <div class="q-gutter-sm">
        <q-form>
          <div class="q-pa-md" style="max-width: 300px">
            <div class="q-gutter-md">
              <q-select
                v-model="category_id"
                :options="categories"
                label="Standard"
                option-label="name"
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
                <q-item-label caption>Reason For Discarding</q-item-label>
                <q-item-label
                  >Not fixable HDD is gone. HDD is not available in market
                  anymore</q-item-label
                >
              </q-item-section>
            </q-item>

            <q-item tag="label" v-ripple>
              <q-item-section avatar top>
                <q-checkbox v-model="defected" val="defect" color="primary" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Mark Defective</q-item-label>
                <q-item-label caption>Reason For Defectivity</q-item-label>
                <q-item-label
                  >Not fixable HDD is gone. HDD is not available in market
                  anymore</q-item-label
                >
              </q-item-section>
            </q-item>
          </q-list>
          <q-card-actions align="right">
            <q-btn flat label="CANCEL" v-close-popup />
            <q-btn
              :to="`/main/equipments/details/${category_id}`"
              @click.prevent="editcategories(flag)"
              type="submit"
              v-model="flag"
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
      flag: this.$route.params.id,
      discarded: false,
      defected: false,
      categories: [],
      catDetails: null,
      name: "",
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
    this.getData();
  },
  methods: {
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
          this.categories = response.data;
          catagory_id = response.data.id;
        })
        .catch(function (error) {
          console.error(error);
        });
    },
    // EDIT
    popEdit(id) {
      this.eprompt = true;
      this.flag = id;
    },
    editcategories(flag) {
      const options = {
        method: "PATCH",
        url: "http://127.0.0.1:8000/api/products/" + flag,
        data: {
          category_id: this.category_id.id,
          brand: this.brand,
          model: this.model,
          description: this.description,
        },
        headers: {
          Authorization: "Bearer 1|UgsIPHGbm9W0uyUZT81Tf7BD36UHO5jTlSfwAFWp",
        },
      };

      axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          this.catDetails = response.data;
          alert("Edited Succesfully");
        })
        .catch(function (error) {
          console.error(error);
        });
    },
  },
};
</script>

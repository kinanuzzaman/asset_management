<template>
  <q-page>
    <q-list>
      <q-item>
        <q-item-sectin>
          <q-btn flat dense round icon="arrow_back" to="/main/users"
        /></q-item-sectin>
        <q-item-section class="flex flex-center">
          <q-item-label> {{ user.full_name }}</q-item-label>
        </q-item-section>
        <q-btn round flat icon="edit">
          <q-menu auto-close :offset="[110, 0]">
            <q-list style="min-width: 150px">
              <q-item clickable :to="`/main/users/details/edit/${user.id}`">
                <q-item-section>Edit</q-item-section>
              </q-item>
              <q-item clickable @click="popDel(user.id)">
                <q-item-section>Delete</q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-item>
      <q-item>
        <q-item-section class="flex flex-center">
          <q-item-label></q-item-label>
        </q-item-section>
      </q-item>
      <q-item>
        <q-item-section class="flex flex-center">
          <q-item-label>
            <q-avatar> <img :src="user.image" alt="" /> </q-avatar
          ></q-item-label>
        </q-item-section>
      </q-item>

      <q-item filled>
        <p>EQUIPMENTS</p>
      </q-item>
    </q-list>

    <q-list
      bordered
      separator
      v-for="product in user.products"
      :key="product['id']"
    >
      <q-item>
        <q-item-section>
          <q-item-label>
            {{ product["brand"] }}
          </q-item-label>
        </q-item-section>
        <q-badge
          text-color="dark"
          color="white"
          :label="product['assign_date']"
        />
        <q-btn round flat icon="more_vert">
          <q-menu auto-close :offset="[110, 0]">
            <q-list style="min-width: 150px">
              <q-item clickable @click="alert = true">
                <q-item-section>Restock to Inventory</q-item-section>
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
    <!-- DELETE -->
    <q-dialog v-model="alert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Delete</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure you want to delete this user?
        </q-card-section>

        <q-card-actions align="right">
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
    <!-- RESTOCK -->
    <q-dialog v-model="ralert">
      <q-card>
        <q-card-section>
          <div class="text-h6">Restock to Inventory</div>
        </q-card-section>

        <q-card-section class="q-pt-none">
          Are you sure you want to restock this equipment to inventory?
        </q-card-section>

        <q-card-actions align="right">
          <q-btn flat label="CANCEL" v-close-popup />
          <q-btn color="red" flat label="RESTOCK" v-close-popup />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Defect -->
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
            v-model="flag"
            @click.prevent="defectProduct(flag)"
            type="submit"
            color="primary"
            flat
            label="SAVE"
            v-close-popup
          />
        </q-card-actions>
      </q-card>
    </q-dialog>
    <!-- Discard -->
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
            type="submit"
            v-model="flag"
            @click.prevent="discardProduct(flag)"
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
        :to="`/main/users/details/assign/${user.id}`"
        fab
        icon="add"
        color="primary"
      />
    </q-page-sticky>
  </q-page>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      id: this.$route.params.id,
      flag: "",
      disprompt: false,
      defprompt: false,
      alert: false,
      ralert: false,
      user: null,
      products: [],
      category: "",
      discard_details: "",
      defect_details: "",
    };
  },
  created() {
    const options = {
      method: "GET",
      url: "http://127.0.0.1:8000/api/users/" + this.id,
      headers: {
        Authorization: "Bearer 3|e8jVTwx52A5yiSG49aWocTuWvBnrfc4NRL7TQEeL",
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        this.user = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  },
  methods: {
    // Discard product
    popDiscard(val) {
      this.disprompt = true;
      this.flag = val;
    },
    discardProduct(flag) {
      const options = {
        method: "PATCH",
        url: "http://127.0.0.1:8000/api/products/discard/" + flag,
        data: {
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
          this.user = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
      this.getData();
    },
    // Defect Product
    popDefect(val) {
      this.defprompt = true;
      this.flag = val;
    },
    defectProduct(flag) {
      const options = {
        method: "PATCH",
        url: "http://127.0.0.1:8000/api/products/defect/" + flag,
        data: {
          defect_details: this.defect_details,
        },
        headers: {
          Authorization: "Bearer 1|UgsIPHGbm9W0uyUZT81Tf7BD36UHO5jTlSfwAFWp",
        },
      };

      axios
        .request(options)
        .then((response) => {
          console.log(response.data);
          this.user = response.data;
        })
        .catch(function (error) {
          console.error(error);
        });
      this.getData();
    },
    // DELETE USER
    popDel(id) {
      this.alert = true;
      this.flag = id;
    },

    delCategory(flag) {
      const options = {
        method: "DELETE",
        url: "http://127.0.0.1:8000/api/users/" + flag,
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
<style></style>

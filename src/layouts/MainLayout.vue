<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title class="flex flex-center">{{ title }}</q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <!--    Mr.Munir<br />
          munir@gmail.com -->
      <q-list>
        <q-item-label header id="hero">
          <img :src="admin.image" alt="" style="width: 80px; height: 80px" />
          <br />

          {{ admin.first_name }} {{ admin.last_name }}<br />
          {{ admin.email }}
        </q-item-label>
        <!-- Navigate Users -->
        <q-item :to="`/main/users/${id}`" @click="titleChange('Users')">
          <q-item-section style="font-size: 2em">
            <q-icon name="supervised_user_circle"
          /></q-item-section>
          <q-item-section>
            <q-item-label>USERS</q-item-label>
          </q-item-section>
        </q-item>
        <!-- Navigate Equipments -->
        <q-item
          :to="`/main/equipments/${id}`"
          @click="titleChange('Equipments')"
        >
          <q-item-section style="font-size: 2em">
            <q-icon name="shopping_cart" />
          </q-item-section>
          <q-item-section>
            <q-item-label>EQUIPMENTS</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
      <q-list id="bottom">
        <q-item to="/">
          <q-item-section style="font-size: 2em">
            <q-icon name="settings"
          /></q-item-section>
          <q-item-section>
            <q-item-label>SETTING</q-item-label>
          </q-item-section>
        </q-item>
        <q-item clickable @click="logout">
          <q-item-section style="font-size: 2em">
            <q-icon name="logout" />
          </q-item-section>
          <q-item-section>
            <q-item-label>LOGOUT</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import axios from "axios";
export default {
  name: "MainLayout",

  data() {
    return {
      id: this.$route.params.id,
      title: "Users",
      leftDrawerOpen: false,
      admin: null,
    };
  },
  created() {
    const options = {
      method: "GET",
      url: "/admins/" + this.id,
      // url: "/admins/1",
      headers: {
        // Authorization: "Bearer 3|e8jVTwx52A5yiSG49aWocTuWvBnrfc4NRL7TQEeL",
        Authorization: "Bearer " + localStorage.getItem("token"),
        // Authorization: "Bearer 20|SP1OZFEvk1D3Rb1bsGVnZ8vA6cAoowVTyXqfY44L",
      },
    };

    this.$axios
      .request(options)
      .then((response) => {
        console.log(response.data);
        this.admin = response.data;
      })
      .catch(function (error) {
        console.error(error);
      });
  },
  methods: {
    titleChange(x) {
      this.title = x;
    },
    getCategory(category) {
      this.intro = category;
    },
    logout() {
      localStorage.removeItem("token");
      this.$router.push("/");
    },
  },
};
</script>
<style scoped>
#hero {
  color: cornsilk;
  background-image: url(../assets/hero.png);
}
#bottom {
  position: absolute;
  bottom: 0px;
  width: 100%;
}
</style>

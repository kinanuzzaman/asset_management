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

        <q-toolbar-title class="flex flex-center">
          {{ title }}
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label header id="hero">
          <img
            alt="Avatar"
            src="~assets/Admin.png"
            style="width: 80px; height: 80px"
          /><br />
          Daniel<br />
          daniel@example.com
        </q-item-label>
        <q-item to="/main/users" @click="titleChange('Users')">
          <q-item-section style="font-size: 2em">
            <q-icon name="supervised_user_circle"
          /></q-item-section>
          <q-item-section>
            <q-item-label>USERS</q-item-label>
          </q-item-section>
        </q-item>
        <q-item to="/main/equipments" @click="titleChange('Equipments')">
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
        <q-item to="/">
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
export default {
  name: "MainLayout",

  data() {
    return {
      leftDrawerOpen: false,
      title: "Asset Management",
    };
  },
  methods: {
    titleChange(x) {
      this.title = x;
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

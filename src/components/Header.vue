<template>
  <q-header elevated>
    <q-toolbar>
      <q-btn
        flat
        dense
        round
        icon="menu"
        aria-label="Menu"
        @click="leftDrawerOpen = true"
      />

      <q-toolbar-title> {{ intro }} </q-toolbar-title>

      <div>User</div>
    </q-toolbar>
  </q-header>
</template>

<script>
export default {
  name: "Header",
  props: {
    intro: {
      type: String,
    },
  },
  data() {
    return {
      leftDrawerOpen: flase,
    };
  },
};
</script>

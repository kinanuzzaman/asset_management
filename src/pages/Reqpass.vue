<template>
  <q-page class="flex flex-center">
    <q-card>
      <q-card-section>
        <div class="flex flex-center">
          <img
            alt="Quasar logo"
            src="~assets/laptop.png"
            style="width: 80px; height: 80px"
          />
        </div>
        <!--  @submit.prevent="login" -->
        <q-form>
          <q-input
            clearable
            v-model="email"
            label="EMAIL"
            placeholder="email@example.com"
          />

          <!--   to="/main/users"  -->
          <q-btn
            to="/"
            type="submit"
            id="btn"
            class="q-mt-md"
            color="black"
            text-color="white"
            label="Send Request"
          ></q-btn>
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
export default {
  name: "Reqpass",
  data() {
    return {
      email: "",
    };
  },
};
</script>

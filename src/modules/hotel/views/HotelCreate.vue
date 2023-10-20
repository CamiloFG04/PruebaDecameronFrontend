<template>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title mb-3">Agregar hotel</h3>
      <FormHotel />
    </div>
  </div>
</template>

<script>
import FormHotel from "../components/FormHotel.vue"

export default {
  components: { 
    FormHotel 
  },
  setup() {},
};
</script>

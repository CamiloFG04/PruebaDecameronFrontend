<template>
  <div class="card">
    <div class="card-body">
      <h3 class="card-title mb-3">Agregar habitaciones</h3>
      <FormRooms />
    </div>
  </div>
</template>

<script>
import FormRooms from "../components/FormRooms.vue"

export default {
  components: { 
    FormRooms 
  },
  setup() {},
};
</script>

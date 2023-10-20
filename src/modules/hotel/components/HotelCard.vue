<template>
  <template v-if="!isLoading && getHotels.length > 0">
    <div
      v-for="hotel in getHotels"
      :key="hotel.id"
      class="card m-3 w-30"
      style="width: 18rem"
    >
      <img
        :src="'./assets/decameron.jpg'"
        class="card-img-top pt-1"
        alt="..."
      />
      <div class="card-body">
        <h5 class="card-title">{{ hotel.name }}</h5>
        <p class="card-text">{{ hotel.direction }}</p>
        <p class="card-text">NIT: {{ hotel.nit }}</p>
        <p class="card-text">Habitaciones: {{ hotel.number_rooms }}</p>
        <span
          class="pointer position-absolute top-0 start-10 translate-middle badge rounded-pill bg-success"
          title="Habitaciones disponibles"
          @click="showRooms(hotel.id)"
        >
          {{ hotel.quantity }}/{{ hotel.number_rooms }} Hab
          <span class="visually-hidden">Número de habitaciones</span>
        </span>
        <span
          class="pointer position-absolute top-0 start-50 translate-middle badge rounded-pill bg-danger"
          title="Eliminar hotel"
          @click="deleteHotel(hotel.id)"
        >
          <i class="fa-solid fa-trash"></i>
          <span class="visually-hidden">Eliminar</span>
        </span>
        <span
          class="pointer position-absolute top-0 start-100 translate-middle badge rounded-pill bg-info"
          title="Editar hotel"
          @click="editHotel(hotel.id)"
        >
          <i class="fa-solid fa-pen-to-square"></i>
          <span class="visually-hidden">Editar</span>
        </span>
        <button
          type="button"
          class="btn btn-primary"
          @click="addRooms(hotel.id)"
        >
          Agregar habitaciones
        </button>
      </div>
    </div>
  </template>
  <template v-else>
    <div class="container text-center">
      <h1>No hay hoteles registrados</h1>
    </div>
  </template>
  <Fab @on:click="createNewEntry" />
  <Modal v-show="showModal" :rooms="rooms" @on:close="closeModal" />
</template>

<script>
import { computed, defineAsyncComponent } from "vue";
import useHotel from "../composable/useHotel";
import { useRouter } from "vue-router";
import Swal from "sweetalert2";
import { useStore } from "vuex";

export default {
  components: {
    Fab: defineAsyncComponent(() => import("../components/Fab.vue")),
    Modal: defineAsyncComponent(() => import("../components/Modal.vue")),
  },
  setup() {
    const {
      getHotels,
      showModal,
      rooms,
      closeModal,
      addRooms,
      createNewEntry,
    } = useHotel();
  
    const store = useStore();
    const router = useRouter();

    const deleteHotel = async (id) => {
      Swal.fire({
        title: "Quieres eliminar este hotel?",
        showDenyButton: true,
        showCancelButton: false,
        confirmButtonText: "Eliminar",
        denyButtonText: `Cancelar`,
      }).then(async (result) => {
        if (result.isConfirmed) {
          const resp = await store.dispatch("hotel/deleteHotel", id);
          if (!resp.success) return Swal.fire("Error", resp.message, "error");
          Swal.fire("OK!", resp.message, "success");
        }
      });
    };

    const editHotel = (id) => {
      router.push({ name: "hotel", params: { id: id } });
    };

    const showRooms = async (id) => {
      const resp = await store.dispatch("hotel/showRooms", id);
      if (!resp.success) return Swal.fire("Error", resp.message, "error");
      showModal.value = true;
    };

    
    return {
      isLoading: computed(() => store.state.hotel.isLoading),
      getHotels,
      deleteHotel,
      editHotel,
      showModal,
      rooms,
      closeModal,
      addRooms,
      createNewEntry,
      showRooms,
    };
  },
};
</script>

<style scoped>
*,
*::before,
*::after {
  box-sizing: initial;
}
</style>

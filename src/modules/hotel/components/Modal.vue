<template>
  <div class="pop-up">
    <div class="pop-up-inner" v-if="rooms.length > 0">
      <div class="pop-up-close" @click.self="$emit('on:close')">&times;</div>
      <h1>Habitaciones </h1>
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">Cantidad</th>
                    <th scope="col">Tipo</th>
                    <th scope="col">Acomodación</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="room in rooms" :key="room.id">
                    <th scope="row">{{room.quantity}}</th>
                    <td>{{room.typeName}}</td>
                    <td>{{room.accommodationName}}</td>
                </tr>
            </tbody>
        </table>
      <button class="btn btn-primary" @click.self="$emit('on:close')">Cerrar</button>
    </div>
    <div class="pop-up-inner" v-else>
      <h5>No se han asignado habitaciones</h5>
      <button class="btn btn-primary" @click.self="$emit('on:close')">Cerrar</button>
    </div>
  </div>
</template>

<script>
import useHotel from '../composable/useHotel';
export default {
    emits:['on:close'],
    setup() {
        const {rooms} = useHotel()

        return {
            rooms,
        }
    },
};
</script>

<style scoped lang="scss">
.pop-up {
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  padding: 32px 16px 120px;
  height: 100vh;
  width: 100%;
  background-color: rgba($color: #52a07e, $alpha: 0.5);
  display: grid;
  place-items: center;

  &-close {
    position: absolute;
    height: 52px;
    width: 52px;
    display: flex;
    justify-content: center;
    align-items: center;
    top: 0;
    right: 0;
    font-size: 3rem;
    color: #d6d6d6;
    cursor: pointer;
  }

  &-inner {
    background-color: #fff;
    color: #000;
    position: relative;
    width: 40%;
    padding: 40px;
    border-radius: 8px;
    box-shadow: 0 5px 5px rgba($color: #000, $alpha: 0.2);
    transition: all 250ms ease-in-out;
  }
}

.fade-enter,
.fade-leave-to {
  opacity: 0;

  .pop-up-inner {
    opacity: 0;
    transform: translateY(-32px);
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: all 250ms ease-in-out;
}

.fade-leave-active {
  transition-delay: 250ms;
}
</style>

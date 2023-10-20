<template>
    <form class="row g-3" @submit.prevent="onSubmit">
        <div class="col-md-4">
            <label for="name" class="form-label" >Nombre</label>
            <input type="text" class="form-control" id="name" v-model="hotelForm.name"/>
        </div>
        <div class="col-md-4">
            <label for="direction" class="form-label" >Dirección</label>
            <input type="text" class="form-control" id="direction" v-model="hotelForm.direction"/>
        </div>
        <div class="col-md-4">
            <label for="city" class="form-label" >Ciudad</label>
            <input type="text" class="form-control" id="city" v-model="hotelForm.city"/>
        </div>
        <div class="col-md-4">
            <label for="nit" class="form-label" >NIT</label>
            <input type="text" class="form-control" id="nit" v-model="hotelForm.nit"/>
        </div>
        <div class="col-md-4">
            <label for="numberRooms" class="form-label" >Numero de Hab</label>
            <input type="number" class="form-control" id="numberRooms" v-model="hotelForm.number_rooms"/>
        </div>
        <div class="col-12">
            <button type="submit" class="btn btn-primary m-2">{{id === 'new' ? 'Agregar' : 'Editar'}}</button>
            <button type="button" class="btn btn-info" @click="goBack">Regresar</button>
        </div>
    </form>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import useHotel from '../composable/useHotel'
import { useStore } from 'vuex'
import Swal from "sweetalert2";

export default {
    setup(){
        const route = useRoute()
        const router = useRouter()
       const {hotelForm} = useHotel()
       const store = useStore()
        const id = ref(route.params.id)
        const loadEntry = () => {

            if (id.value == 'new') {
                hotelForm.value = {
                    name: null,
                    direction: null,
                    city: null,
                    nit: null,
                    number_rooms: null
                }
            }else{
                hotelForm.value = store.getters['hotel/getHotelById'](id.value)
                if (!hotelForm.value) return router.push({name:'hotels'});
            }
        }

        const onSubmit = async () => {
            if (id.value === 'new') {
                const resp = await store.dispatch('hotel/createHotel',hotelForm.value)
                if (!resp.success) return Swal.fire('Error', resp.message, 'error')
                hotelForm.value.name = null
                hotelForm.value.direction = null
                hotelForm.value.city = null
                hotelForm.value.nit = null
                hotelForm.value.number_rooms = null
                return Swal.fire('Ok!', 'Creado correctamente', 'success')
            }

            const resp = await store.dispatch('hotel/updateHotel',hotelForm.value)
            if (!resp.success) return Swal.fire('Error', resp.message, 'error')
            return Swal.fire('Ok!', 'Editado correctamente', 'success')
        }



        onMounted(() => {
            loadEntry()
        })

        return {
            id,
            hotelForm,
            onSubmit,
            goBack: () => router.push({name:'hotel-list'}),
        }

    }
}
</script>

<style>

</style>
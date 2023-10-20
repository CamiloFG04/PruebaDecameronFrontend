<template>
    <form class="row g-3" @submit.prevent="onSubmit">
        <div class="col-md-4">
            <label for="quantity" class="form-label" >Cantidad</label>
            <input type="number" class="form-control" id="quantity" v-model="roomsForm.quantity"/>
        </div>
        <div class="col-md-4">
            <label for="inputState" class="form-label">Tipo</label>
            <select id="inputState" class="form-select" v-model="roomsForm.type_id">
                <option v-for="type in getTypes" :key="type.id" :value="type.id">
                    {{type.name}}
                </option>
            </select>
        </div>
        <div class="col-md-4">
            <label for="inputState" class="form-label">Acomodación</label>
            <select id="inputState" class="form-select" v-model="roomsForm.accommodation_id">
                <option v-for="accommodation in getAccommodations" :key="accommodation.id" :value="accommodation.id">
                    {{accommodation.name}}
                </option>
            </select>
        </div>
        <div class="col-12">
            <button type="submit" class="btn btn-primary m-2">Agregar</button>
            <button type="button" class="btn btn-info" @click="goBack">Regresar</button>
        </div>
    </form>
</template>

<script>
import useHotel from '../composable/useHotel'
import { useRoute } from 'vue-router'

export default {
    setup(){
        const route = useRoute()
        const hotel_id = route.params.id
        const {getTypes,getAccommodations,roomsForm,onSubmit,goBack} = useHotel()

        roomsForm.value.hotel_id = hotel_id

        return {
            roomsForm,
            getTypes,
            getAccommodations,
            onSubmit,
            goBack
        }

    }
}
</script>

<style>

</style>
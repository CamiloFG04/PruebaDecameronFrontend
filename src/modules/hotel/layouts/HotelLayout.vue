<template>
    <Navbar />
    <div v-if="isLoading" class="row justify-content-md-center">
        <div class="col-3 alert-info text-center mt-5">
            Espere por favor...
            <h3 class="mt-2">
                <i class="fa fa-spin fa-sync"></i>
            </h3>
        </div>
    </div>
    <div v-else class="d-flex">
        <div class="col">
            <router-view></router-view>
        </div>
    </div>
</template>

<script>
import {  defineAsyncComponent } from 'vue'
import useHotel from "../composable/useHotel";
export default {
    components:{
        Navbar: defineAsyncComponent(() => import('@/modules/hotel/components/Navbar.vue')),
        // HotelList: defineAsyncComponent(() => import('@/modules/hotel/components/Navbar.vue')),
    },
    setup(){
        
        const {isLoading} = useHotel();

        return{
            isLoading
        }
    }
}
</script>
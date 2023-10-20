
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import Swal from "sweetalert2";

const useHotel = () => {
    const store = useStore()

        const hotels = async() => {
            await store.dispatch('hotel/hoteles')
        }
        const router = useRouter()
        const showModal = ref(false)
    
        const roomsForm = ref({
            quantity: null,
            type_id: null,
            accommodation_id: null
        })

        const onSubmit = async () => {
            const resp = await store.dispatch('hotel/addRooms',roomsForm.value)
            if (!resp.success) return Swal.fire('Error', resp.message, 'error')
            roomsForm.value.quantity = null
            roomsForm.value.type_id = null
            roomsForm.value.accommodation_id = null
            return Swal.fire('Ok!', 'Creado correctamente', 'success')
        }

        const hotelForm = ref({
            name: null,
            direction: null,
            city: null,
            nit: null,
            number_rooms: null
        })

        


        onMounted(() => {
            hotels()
        })

        return{
            onSubmit,
            roomsForm,
            hotelForm,
            showModal,

            closeModal: () => (showModal.value = false),
            addRooms: (id) => router.push({ name: "hotel-rooms", params: { id } }),
            createNewEntry: () => router.push({ name: "hotel", params: { id: "new" } }),
            goBack: () => router.push({name:'hotel-list'}),

            getHotels: computed(() =>{
                return store.getters['hotel/currentHotels']
            }),
            getTypes: computed(() => store.getters['hotel/currentTypes']),
            getAccommodations: computed(() => store.getters['hotel/currentAccommodations']),
            rooms: computed(() => store.state.hotel.rooms),
        }
}

export default useHotel
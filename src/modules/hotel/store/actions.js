import hotelApi from "@/api/hotelApi";

export const hoteles = async ({commit}) => {
    
    try {
        const {data} = await hotelApi.get()
        
        commit('hotels',data.data)

        return {success: data.success, message: 'Data cargada'}

    } catch (error) {
        return {success: false, message: error.response.data.errors}
    }
}

export const createHotel = async ({commit},hotel) => {
    try {
        const {data} = await hotelApi.post('/create', hotel)
        
        commit('addHotels',data.data)

        return {success: data.success, message: 'Data cargada'}

    } catch (error) {
        return {success: false, message: error.response.data.errors}
    }
}

export const deleteHotel = async ({commit},id) => {
    try {
        const {data} = await hotelApi.delete(`/delete/${id}`)

        commit('removeHotel',id)

        return {success: data.success, message: data.data.message}

    } catch (error) {
        return {success: false, message: error.response.data.errors}
    }
}

export const updateHotel = async ({commit},hotel) => {
    try {
        const {data} = await hotelApi.put(`/update/${hotel.id}`, hotel)
        commit('updateHotel',data.data)

        return {success: data.success, message: 'Data cargada'}

    } catch (error) {
        return {success: false, message: error.response.data.errors}
    }
}

export const addRooms = async (_,room) => {
    try {
        const {data} = await hotelApi.post(`/add_rooms/${room.hotel_id}`,room)

        return {success: data.success, message: 'Data cargada'}

    } catch (error) {
        return {success: false, message: error.response.data.errors}
    }
}

export const showRooms = async ({commit},id) => {
    try {
        const {data} = await hotelApi.get(`/hotel/${id}/rooms`)

        commit('rooms',data.data)

        return {success: data.success, message: 'Data cargada', data: data.data}

    } catch (error) {
        return {success: false, message: error.response.data.errors}
    }
}

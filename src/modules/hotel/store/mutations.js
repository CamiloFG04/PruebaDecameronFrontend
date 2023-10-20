
export const hotels = (state,data) => {
    state.isLoading = false
    state.data = data
}

export const addHotels = (state,data) => {
    state.data.hotels = [...state.data.hotels,data]
}

export const removeHotel = (state,id) => {
    state.data.hotels = state.data.hotels.filter(h => h.id !== id)
}

export const updateHotel = (state,hotel) => {
    const index = state.data.hotels.map(e => e.id).indexOf(hotel.id)
    state.data.hotels[index] = hotel
}

export const rooms = (state,data) => {
    state.rooms = data
}

export const cleanHotels = (state) => {
    state.isLoading = true
    state.data = []
    state.rooms = []
}

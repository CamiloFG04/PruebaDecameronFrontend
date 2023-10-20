
export const currentHotels = (state) => {
    return state.data.hotels
}
export const currentTypes = (state) => {
    return state.data.types
}
export const currentAccommodations = (state) => {
    return state.data.accommodations
}

export const getHotelById = (state) => (id = '') => {
    const entry = state.data.hotels.find(h => h.id == id)

    if (!entry) return
    return {...entry}
}

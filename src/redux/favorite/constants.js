export const initialStateCar = {
    cars: [],
    totalPages: 1,
    isLoading: false,
    error: null,
    favoriteCar: [],
    filters: {
        location: '',
        details: {},
        form: ''
    }
}

export const initialStateBooking = {
    bookings: [],
    isLoading: false,
    error: null,
}
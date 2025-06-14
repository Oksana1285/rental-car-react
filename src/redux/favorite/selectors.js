export const selectCars = (state) => state.favorite.cars;
export const selectTotalPages = (state) => state.favorite.totalPages;
export const selectFavoriteCars = (state) => state.favorite.favoriteCar;
export const selectLoading = (state) => state.favorite.isLoading;
export const selectError = (state) => state.favorite.error;
export const selectFilters = (state) => state.favorite.filters;
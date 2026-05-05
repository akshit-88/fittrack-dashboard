import { configureStore } from "@reduxjs/toolkit";
import mealsReducer, { persistMeals } from "./mealsSlice.jsx";

export const store = configureStore({
  reducer: { meals: mealsReducer },
});

persistMeals(store);

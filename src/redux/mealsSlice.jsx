import { createSlice, nanoid } from "@reduxjs/toolkit";

const STORAGE_KEY = "fit_meals_v1";

const loadInitial = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch (_) {}
  const today = new Date().toISOString().slice(0, 10);
  return [
    { id: nanoid(), name: "Oatmeal with Berries", calories: 320, category: "breakfast", date: today },
    { id: nanoid(), name: "Grilled Chicken Salad", calories: 480, category: "lunch", date: today },
    { id: nanoid(), name: "Salmon & Veggies", calories: 610, category: "dinner", date: today },
    { id: nanoid(), name: "Greek Yogurt", calories: 150, category: "snack", date: today },
  ];
};

const mealsSlice = createSlice({
  name: "meals",
  initialState: loadInitial(),
  reducers: {
    addMeal: {
      reducer(state, action) {
        state.unshift(action.payload);
      },
      prepare({ name, calories, category, date }) {
        return {
          payload: {
            id: nanoid(),
            name,
            calories: Number(calories),
            category,
            date: date || new Date().toISOString().slice(0, 10),
          },
        };
      },
    },
    updateMeal(state, action) {
      const idx = state.findIndex((m) => m.id === action.payload.id);
      if (idx !== -1) state[idx] = { ...state[idx], ...action.payload };
    },
    deleteMeal(state, action) {
      return state.filter((m) => m.id !== action.payload);
    },
  },
});

export const { addMeal, updateMeal, deleteMeal } = mealsSlice.actions;
export default mealsSlice.reducer;

export const persistMeals = (store) => {
  store.subscribe(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(store.getState().meals));
    } catch (_) {}
  });
};

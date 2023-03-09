import { configureStore } from "@reduxjs/toolkit";
import donorReducer from "./features/donor/donorSlice";

const store = configureStore({
  reducer: {
    donor: donorReducer,
  },
});

export default store;

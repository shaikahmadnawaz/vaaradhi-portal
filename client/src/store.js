import { configureStore } from "@reduxjs/toolkit";
import donorReducer from "./features/donor/donorSlice";
import adminReducer from "./features/admin/adminSlice";

const store = configureStore({
  reducer: {
    donor: donorReducer,
    admin: adminReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit"
import usersReducer from "./slices/usersSlice"
import updateSliceReducer from "./slices/updateDialogSlice"

const store = configureStore({
  reducer: { users: usersReducer, updateSlice: updateSliceReducer },
})

export default store

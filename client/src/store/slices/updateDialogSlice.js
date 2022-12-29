import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  isUpdateEmployeeDialogOpen: false,
}

// creating a state in the redux store for the UpdateEmployee dialog.
export const updateSlice = createSlice({
  name: "update",
  initialState,

  reducers: {
    set_ShowUpdateDialog: (state, action) => {
      state.isUpdateEmployeeDialogOpen = true
    },
    set_closeUpdateDialog: (state, action) => {
      state.isUpdateEmployeeDialogOpen = false
    },
  },
})

export const { set_ShowUpdateDialog, set_closeUpdateDialog } =
  updateSlice.actions
export default updateSlice.reducer





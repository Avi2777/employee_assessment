import { createSlice } from "@reduxjs/toolkit"

const initialState = {
  list: [],
}
export const usersSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    set_users: (state, action) => {
      state.list = action.payload
    },
    add_user: (state, action) => {
      state.list.push(action.payload)
    },
    delete_user: (state, action) => {
      // compare the current users list state in the store to the list of users in action.payload
      // subtract the missing
      // update new state in the store
      state.list = state.list.filter((user) => user._id !== action.payload)
    },
    update_user: (state, action) => {
      // action.payload = {user object}
      const user = action.payload
      // the parameter that we need to find in the {user object}
      const idToFind = user._id
      // find the index where user id is equal to the id in {user object}
      const indexToUpdate = state.list.findIndex(
        (user) => user._id === idToFind
      )
      // assign action.payload to this index in order to update the list of users state
      state.list[indexToUpdate] = user
    },
  },
})

export const { set_users, add_user, delete_user, update_user } =
  usersSlice.actions
export default usersSlice.reducer

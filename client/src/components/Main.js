import * as React from "react"
import axios from "axios"
import UpdateUserProfileDialog from "./UpdateDialog"
import { useSelector } from "react-redux"
import { DataGrid } from "@mui/x-data-grid"
import { useDispatch } from "react-redux"
import { set_users, delete_user } from "../store/slices/usersSlice"
import { set_ShowUpdateDialog } from "../store/slices/updateDialogSlice"
import DeleteIcon from "@mui/icons-material/Delete"
import UpdateIcon from "@mui/icons-material/Update"
import IconButton from "@mui/material/IconButton"
import { useEffect } from "react"

function MainComponent() {
  // Initialize the dispatch hook
  const dispatch = useDispatch()
  // Initialize the use-selector hook
  const usersList = useSelector((state) => {
    return state.users.list
  })
  useEffect(() => {
    fetchAllUsers()
  }, [])
  // Base url
  const baseURL = "http://localhost:3001"

  // Importing the state boolean value of UpdateEmployeeDialogIsOpen from UpdateSlice
  const isUpdateEmployeeDialogOpen = useSelector((state) => {
    return state.updateSlice.isUpdateEmployeeDialogOpen
  })
  // Local state
  const [employeeData, setEmployeeData] = React.useState({})

  // GET get all users from server

  const fetchAllUsers = async () => {
    const response = await axios.get(`${baseURL}/users`)

    if (response) {
      const users = response.data

      // push all users to store

      dispatch(set_users(users))
    } else {
      console.error()
    }
  }

  // DELETE delete user by ID

  const deleteUser = async (id) => {
    try {
      const response = await axios.delete(`${baseURL}/user/delete/${id}`)
      if (response.status === 200) {
        dispatch(delete_user(id))
      } else {
        throw new Error(
          "ERROR: Error Code:" +
            response.status +
            " | Error Message: " +
            response.statusText
        )
      }
    } catch (e) {
      console.error(e)
    }
  }
  // Fields for the MUI table element
  const columns = [
    {
      field: "firstName",
      headerName: "First name",
      width: 140,
    },
    {
      field: "lastName",
      headerName: "Last name",
      width: 140,
    },
    {
      field: "email",
      headerName: "Email",
      type: "string",
      width: 250,
    },
    {
      field: "gender",
      headerName: "Gender",
      width: 120,
    },
    {
      sortable: false,
      field: "delete",
      headerName: "Delete",
      // Render New costume cell with delete button
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            width: "60%",
          }}>
          <IconButton
            onClick={() => {
              deleteUser(params.id)
            }}
            aria-label="Delete"
            style={{
              color: "#fc1e5d",
            }}>
            <DeleteIcon />
          </IconButton>
        </div>
      ),
    },
    {
      sortable: false,
      field: "update",
      headerName: "Update",
      // Render New costume cell with update button
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            justifyContent: "center ",
            width: "60%",
          }}>
          <IconButton
            onClick={() => {
              dispatch(set_ShowUpdateDialog())
              setEmployeeData(params.row)
            }}
            aria-label="update"
            style={{
              color: "#4287f5",
            }}>
            <UpdateIcon />
          </IconButton>
        </div>
      ),
    },
  ]

  return (
    // The data-grid component settings
    <div
      style={{
        display: "flex",
      }}>
      <div
        style={{
          boxShadow: "1px 2px 9px #b8bbd6",
          height: "870px",
          width: "850px",
          marginLeft: "auto",
          marginRight: "auto",
        }}>
        <DataGrid
          style={{
            width: "100%",
            paddingLeft: "10px",
            paddingRight: "10px",
          }}
          getRowId={(row) => row._id}
          rows={usersList}
          columns={columns}
          pageSize={15}
          rowsPerPageOptions={[15]}
        />
      </div>

      <UpdateUserProfileDialog
        opendialog={isUpdateEmployeeDialogOpen}
        employeeData={employeeData}
      />
    </div>
  )
}

export default MainComponent

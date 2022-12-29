import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import axios from "axios"
import { useDispatch } from "react-redux"
import { update_user } from "../store/slices/usersSlice"
import { set_closeUpdateDialog } from "../store/slices/updateDialogSlice"
import Stack from "@mui/material/Stack"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"
import { useSelector } from "react-redux"

const Alert = React.forwardRef(function Alert(props, ref) {
  return (
    <MuiAlert
      elevation={6}
      ref={ref}
      variant="filled"
      {...props}
    />
  )
})

function UpdateUserProfileDialog({ employeeData }) {
  // Initialize the dispatch hook
  const dispatch = useDispatch()

  // Importing the state boolean value of UpdateEmployeeDialogIsOpen from UpdateSlice
  const isUpdateEmployeeDialogOpen = useSelector((state) => {
    return state.updateSlice.isUpdateEmployeeDialogOpen
  })

  // Base URL
  const baseURL = "http://localhost:3001"

  // Saving to a meaningful name, the employeeData prop
  let innerEmployeeData = employeeData

  const handleChange = (event) => {
    innerEmployeeData = {
      ...innerEmployeeData,
      [event.target.name]: event.target.value,
    }
  }

  // Toggel open/close the update success dialog
  const [successor, setSuccessor] = React.useState(false)

  const closeSuccessor = () => {
    setSuccessor(false)
  }
  // Toggel open/close the error alert dialog
  const [errorAlert, setErrorAlert] = React.useState(false)

  const closeErrorAlert = () => {
    setErrorAlert(false)
  }

  // On click initializing the update method
  const handelUpdate = async (e) => {
    e.preventDefault()
    const id = innerEmployeeData._id

    try {
      // Update user object on server
      const response = await axios.put(
        `${baseURL}/user/update/${id}`,
        innerEmployeeData
      )

      if (response.status === 200) {
        // Update user object on the redux store
        dispatch(update_user(innerEmployeeData))
        // on successful response toggel off Update dialog on redux store
        dispatch(set_closeUpdateDialog())
        // toggel on the success alert dialog from local state
        setSuccessor(true)
      } else {
        // on unsuccessful response toggel on alert dialog
        setErrorAlert(true)
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

  return (
    <div>
      <Dialog open={isUpdateEmployeeDialogOpen}>
        <form onSubmit={handelUpdate}>
          <DialogTitle>Update User </DialogTitle>
          <DialogContent>
            <DialogContentText>
              To Update employee, please fill out all the fields
            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="email"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              variant="standard"
              required
              onChange={handleChange}
              defaultValue={innerEmployeeData.email}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="firstName"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              defaultValue={innerEmployeeData.firstName}
            />
            <TextField
              required
              autoFocus
              margin="dense"
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
              defaultValue={innerEmployeeData.lastName}
            />
            <FormControl
              variant="standard"
              fullWidth
              required
              sx={{
                mt: 2,
                minWidth: 120,
              }}>
              <InputLabel id="demo-simple-select-standard-label">
                Gender
              </InputLabel>
              <Select
                defaultValue={innerEmployeeData.gender}
                labelId="demo-simple-select-standard-label"
                id="gender"
                name="gender"
                label="Gender"
                onChange={handleChange}>
                <MenuItem value={"Male"}>Male</MenuItem>
                <MenuItem value={"Female"}>Female</MenuItem>
                <MenuItem value={"Gender-fluid"}>Gender-fluid</MenuItem>
                <MenuItem value={"Transgender"}>Transgender</MenuItem>
                <MenuItem value={"Non-binary"}>Non-binary</MenuItem>
              </Select>
            </FormControl>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => dispatch(set_closeUpdateDialog())}>
              Cancel
            </Button>
            <Button type="submit">Update</Button>
          </DialogActions>
        </form>
      </Dialog>

      <Stack
        spacing={2}
        sx={{ width: "100%" }}>
        <Snackbar
          open={errorAlert}
          autoHideDuration={4000}
          onClose={closeErrorAlert}>
          <Alert
            severity="error"
            sx={{ width: "100%" }}>
            Something Went Wrong!!!
          </Alert>
        </Snackbar>

        <Snackbar
          open={successor}
          autoHideDuration={4000}
          onClose={closeSuccessor}>
          <Alert
            severity="success"
            sx={{ width: "100%" }}>
            Update Employee Successfully!!!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  )
}

export default UpdateUserProfileDialog

import * as React from "react"
import Button from "@mui/material/Button"
import TextField from "@mui/material/TextField"
import Dialog from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogContentText from "@mui/material/DialogContentText"
import DialogTitle from "@mui/material/DialogTitle"
import AddIcon from "@mui/icons-material/Add"
import Select from "@mui/material/Select"
import MenuItem from "@mui/material/MenuItem"
import InputLabel from "@mui/material/InputLabel"
import FormControl from "@mui/material/FormControl"
import axios from "axios"
import { useDispatch } from "react-redux"
import { add_user } from "../store/slices/usersSlice"
import Stack from "@mui/material/Stack"
import Snackbar from "@mui/material/Snackbar"
import MuiAlert from "@mui/material/Alert"

// Alert component from Mui
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

function FormDialog() {
  // Initialize the dispatch hook
  const dispatch = useDispatch()
  // Base url
  const baseURL = "http://localhost:3001"

  //The state value of the addEmployee component in a current time
  const [employeeInfo, setEmployeeInfo] = React.useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
  })

  const handleChange = (event) => {
    setEmployeeInfo({
      ...employeeInfo,
      [event.target.name]: event.target.value,
    })
  }

  // Toggel open/close add employee form dialog
  const [open, setOpen] = React.useState(false)

  const handleClickOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }
  // Toggel open/close Success dialog, on creating new employee
  const [successor, setSuccessor] = React.useState(false)

  const closeSuccessor = () => {
    setSuccessor(false)
  }
  // Toggel open/close Error dialog
  const [errorAlert, setErrorAlert] = React.useState(false)

  const onErrorAlert = () => {
    setErrorAlert(true)
  }
  const closeErrorAlert = () => {
    setErrorAlert(false)
  }

  // Submit new Employee event
  // Create new employee on database
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const response = await axios.post(`${baseURL}/user/new/`, employeeInfo)
      const employeeRecord = response.data
      if (response.status === 200) {
        // close Add employee dialog on successful response
        setOpen(false)
        // open Successful alert massage!
        setSuccessor(true)
        // add new user to the redux store state
        dispatch(add_user(employeeRecord))
      } else {
        // If error send an alert
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
    // Add employee dialog button
    <div>
      <Button
        variant="outlined"
        startIcon={<AddIcon />}
        onClick={handleClickOpen}>
        Add Employee
      </Button>

      <Dialog
        //  Add employee dialog component
        open={open}
        onClose={handleClose}>
        <form onSubmit={handleSubmit}>
          <DialogTitle>Add Employee</DialogTitle>
          <DialogContent>
            <DialogContentText>
              To create new employee, please fill out all the fields
            </DialogContentText>
            <TextField
              // Add employee component email field
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
            />
            <TextField
              // Add employee component firstName field
              required
              margin="dense"
              id="firstName"
              name="firstName"
              label="First Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <TextField
              // Add employee component lastName field
              required
              // autoFocus
              margin="dense"
              id="lastName"
              name="lastName"
              label="Last Name"
              type="text"
              fullWidth
              variant="standard"
              onChange={handleChange}
            />
            <FormControl
              variant="standard"
              fullWidth
              required
              sx={{
                minWidth: 120,
                mt: 2,
              }}>
              <InputLabel id="demo-simple-select-standard-label">
                Gender
              </InputLabel>
              <Select
                // Add employee component gender select field
                labelId="demo-simple-select-standard-label"
                id="gender"
                name="gender"
                defaultValue={"Female"}
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
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit">Submit</Button>
          </DialogActions>
        </form>
      </Dialog>
      <Stack
        // Error alert dialog component
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
          // Success alert dialog component
          open={successor}
          autoHideDuration={4000}
          onClose={closeSuccessor}>
          <Alert
            severity="success"
            sx={{ width: "100%" }}>
            Created Employee Successfully!!!
          </Alert>
        </Snackbar>
      </Stack>
    </div>
  )
}

export default FormDialog

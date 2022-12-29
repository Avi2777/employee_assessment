import * as React from "react"
import Button from "@mui/material/Button"
import AddIcon from "@mui/icons-material/Add"

// Add new employee button component

function AddButton() {
  return (
    <Button
      variant="outlined"
      startIcon={<AddIcon />}>
      Add Employee
    </Button>
  )
}

export default AddButton

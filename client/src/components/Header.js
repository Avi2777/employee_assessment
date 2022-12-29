import { Box } from "@mui/system"

import FormDialog from "./AddEmployeeDialog"
function Header() {
  return (
    // Mui Box component,an easy to adjust css component
    <Box
      sx={{
        justifyContent: "center",
        display: "flex",
        alignItems: "center",
      }}>
      <h1
        style={{
          marginRight: "100px",
        }}>
        Employee Management App
      </h1>
      <div>
        <FormDialog />
      </div>
    </Box>
  )
}

export default Header

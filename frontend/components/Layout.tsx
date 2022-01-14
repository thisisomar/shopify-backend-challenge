import { Box } from "@chakra-ui/react"
import { ReactNode } from "react"
import Navbar from "./Navbar"

const Layout = ({ children }: { children: ReactNode })  => {
  return (
    <>
      <Navbar/>
      <Box p="4">
        {children}
      </Box>
    </>
  )
}

export default Layout;
import { Box, Button, Container, Drawer, List, ListItem, ListItemIcon, ListItemText } from "@mui/material"
import MenuRoundedIcon from '@mui/icons-material/MenuRounded';
import { useState } from "react";
import { MoveToInbox } from "@mui/icons-material";
import { Link } from "react-router";

const Navbar = () => {
    const [open, setOpen] = useState(false)

    const handleDrawer = (isOpen:boolean) => {
        setOpen(isOpen)
    }

    const navLinks = [
        {
            path: "/",
            name: "Home"
        },
        {
            path: "fish-farm-registration",
            name: "Register Fish Farms"
        },
        {
            path: "/",
            name: "Register Workers"
        },
        {
            path: "/",
            name: "Dashboard"
        },
    ]
    return (
        <Container sx={{ background: "#d5d5d5", paddingY: "12px" }} maxWidth={false}>
            <Box sx={{ display: "flex", paddingX: "10px" }} justifyContent={"flex-end"}>
                <Button onClick={() => handleDrawer(true)} ><MenuRoundedIcon sx={{ color: "#000000" }} /></Button>

                <Drawer open={open} onClose={() => handleDrawer(false)} sx={{background:"#00000080"}}>
                    <Box sx={{width:250, paddingX: 2, paddingY: 2, backgroundColor:"#E2E2E2",height:"100%"}} onClick={() => handleDrawer(false)} zIndex={1000}>
                        <List>
                            {
                                navLinks.map((nav, index) => (
                                    <Link to={nav.path} style={{textDecoration: "none", color:"#000"}}>
                                    <ListItem key={index} sx={{'&:hover': {background: '#00000032'}, borderRadius: 2}}>
                                        <ListItemIcon>
                                            <MoveToInbox />
                                        </ListItemIcon>
                                        <ListItemText primary={nav.name}></ListItemText>
                                    </ListItem>
                                    </Link>
                                ))
                            }
                        </List>
                    </Box>
                </Drawer>
            </Box>
        </Container>
    )

}

export default Navbar
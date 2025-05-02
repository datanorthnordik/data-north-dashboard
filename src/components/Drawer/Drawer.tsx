import * as React from "react"
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Diversity3Icon from '@mui/icons-material/Diversity3';


interface DrawerProps {
    handleDrawerToggle: () => void
    isMobile: boolean
    isTablet: boolean
    mobileOpen: boolean
}

const drawerWidth = 240;


const navItems = [
    { title: 'Demographics', icon: <Diversity3Icon /> },
    { title: 'Health', icon: <HealthAndSafetyIcon /> },
    { title: 'Economics', icon: <MonetizationOnIcon /> }
];

const DashboardDrawer = (props: DrawerProps) => {
    const { handleDrawerToggle, isMobile, isTablet , mobileOpen } = props
    const drawerOpen = mobileOpen || (!isMobile && !isTablet)
    return (
        <nav className="drawer">
            <Drawer
                variant="temporary"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                style={{position: 'relative'}}
                hideBackdrop={!drawerOpen || (!isMobile && !isTablet)}
                ModalProps={{
                    keepMounted: true,
                }}
                sx={{
                    '& .MuiDrawer-paper': {
                        boxSizing: 'border-box',
                        width: drawerWidth,
                        top: "6.25rem",
                        backgroundColor: "#004B9C",
                        height: 'calc(100% - 6.25rem) !important'
                    },
                }}
            >
                <div onClick={handleDrawerToggle} style={{ textAlign: 'center' }}>
                    <List style={{ paddingTop: 0 }}>
                        {navItems.map((item) => (
                            <ListItem key={item.title} disablePadding>
                                <ListItemButton sx={{
                                    textAlign: 'start', color: 'white', '&:hover': {
                                        background: "#A61D33"
                                    }
                                }}>
                                    {item.icon}
                                    <ListItemText primary={item.title} style={{ marginLeft: "10px" }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                    </List>
                </div>

            </Drawer>
        </nav>

    )
}

export default DashboardDrawer
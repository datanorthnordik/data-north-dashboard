import * as React from "react"
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import "./drawer.scss"


interface DrawerProps {
    handleDrawerToggle: () => void
    isMobile: boolean
    isTablet: boolean
    mobileOpen: boolean
    navItems: any[]
    selectedCategory: any
    setSelectedCategory: (category:any)=> void
}

const drawerWidth = 240;




const DashboardDrawer = (props: DrawerProps) => {
    const { 
        handleDrawerToggle, 
        isMobile, 
        isTablet , 
        mobileOpen, 
        navItems, 
        selectedCategory, 
        setSelectedCategory 
    } = props
    const drawerOpen = mobileOpen || (!isMobile && !isTablet)
    return (
        <nav className="drawer">
            <Drawer className="drawer_component" 
                variant="temporary"
                open={drawerOpen}
                onClose={handleDrawerToggle}
                hideBackdrop={!drawerOpen || (!isMobile && !isTablet)}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <div className="drawer_list_wrapper" onClick={handleDrawerToggle}>
                    <List className="drawer_list">
                        {navItems.map((item) => (
                            <ListItem key={item.title} disablePadding>
                                <ListItemButton 
                                    onClick={()=> setSelectedCategory(item)}
                                    className={
                                        `drawer_list_button ${selectedCategory.title == item.title ? 'drawer_list_selected': '' }`} >
                                    {item.icon}
                                    <ListItemText className="drawer_list_text" primary={item.title}/>
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
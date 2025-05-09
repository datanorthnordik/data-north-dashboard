import React, { useState } from "react"
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import "./drawer.scss"
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { Collapse, ListItemIcon } from "@mui/material";


interface DrawerProps {
    handleDrawerToggle: () => void
    isMobile: boolean
    isTablet: boolean
    mobileOpen: boolean
    navItems: any[]
    selectedCategory: any
    setSelectedCategory: (category: any) => void
    handleOpen: (event: any,index: number)=> void
}

const drawerWidth = 240;




const DashboardDrawer = (props: DrawerProps) => {
    const {
        handleDrawerToggle,
        isMobile,
        isTablet,
        mobileOpen,
        navItems,
        selectedCategory,
        setSelectedCategory,
        handleOpen
    } = props
    return (
        <nav className="drawer">
            <Drawer className="drawer_component"
                variant="temporary"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                    keepMounted: true,
                }}
            >
                <div className="drawer_list_wrapper" onClick={handleDrawerToggle}>
                    <List className="drawer_list">
                        {navItems.map((item, navIndex) => (
                            <ListItem style={{flexWrap: 'wrap'}} key={item.title} disablePadding>
                                <ListItemButton
                                    className="drawer_list_button"
                                    onClick={(event)=> handleOpen(event,navIndex)} >
                                    {item.icon}
                                    <ListItemText className="drawer_list_text" primary={item.title} />
                                    {item.open ? <ExpandLess sx={{ color: "white" }} /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse className="drawer_subitem" in={item.open} timeout="auto" unmountOnExit>
                                    <List className="drawer_subitem_list" component="div" disablePadding>
                                        {item.dashboards.map((board:any)=>(
                                            <ListItemButton className={
                                                `drawer_subitem_list_button ${selectedCategory?.type == board?.type ? 'drawer_list_selected' : ''}`} 
                                                 onClick={() => setSelectedCategory(board)}>
                                                    {board.icon}
                                                    <ListItemText className="drawer_subitem_list_text" primary={board.title} />
                                                </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </ListItem>
                        ))}
                    </List>
                </div>

            </Drawer>
        </nav>

    )
}

export default DashboardDrawer
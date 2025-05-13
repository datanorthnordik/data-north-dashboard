import React, { useState } from "react"
import List from '@mui/material/List';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import "./drawer.scss"
import { ExpandLess, ExpandMore, StarBorder } from "@mui/icons-material";
import { Collapse, Divider, ListItemIcon } from "@mui/material";
import { useNavigate } from "react-router-dom";


interface DrawerProps {
    handleDrawerToggle: () => void
    mobileOpen: boolean
    navItems: any[]
    selectedCategory: any
    setSelectedCategory: (category: any) => void
    handleOpen: (event: any, index: number) => void
    headerNavItems: any
    footerNavItems: any
}

const drawerWidth = 240;




const DashboardDrawer = (props: DrawerProps) => {
    const {
        handleDrawerToggle,
        mobileOpen,
        headerNavItems,
        footerNavItems,
        navItems,
        selectedCategory,
        setSelectedCategory,
        handleOpen
    } = props

    const navigate = useNavigate()

    const handleDashboardSelection = (board:any)=>{
        setSelectedCategory(board)
        navigate("/dashboard")
    }

    const handleOtherSelection = (item:any)=>{
        setSelectedCategory(item)
        item.onClick()
    }
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
                    <List>
                        {headerNavItems.map((headerItem: any) => (
                            headerItem.items.map((item: any) => (
                                <ListItem style={{ flexWrap: 'wrap' }} key={item.title} disablePadding>
                                    <ListItemButton onClick={()=>{handleOtherSelection(item)}} className={`drawer_list_button ${selectedCategory?.title == item?.title ? 'drawer_list_selected' : ''}`}>
                                        {item.icon}
                                        <ListItemText className="drawer_list_text" primary={item.title} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        ))}
                    </List>
                    <Divider className="drawer_divider" />
                    <List className="drawer_list">
                        {navItems.map((item, navIndex) => (
                            <ListItem style={{ flexWrap: 'wrap' }} key={item.title} disablePadding>
                                <ListItemButton
                                    className="drawer_list_button"
                                    onClick={(event) => handleOpen(event, navIndex)} >
                                    {item.icon}
                                    <ListItemText className="drawer_list_text" primary={item.title} />
                                    {item.open ? <ExpandLess sx={{ color: "white" }} /> : <ExpandMore />}
                                </ListItemButton>
                                <Collapse className="drawer_subitem" in={item.open} timeout="auto" unmountOnExit>
                                    <List className="drawer_subitem_list" component="div" disablePadding>
                                        {item.dashboards.map((board: any) => (
                                            <ListItemButton className={
                                                `drawer_subitem_list_button ${selectedCategory?.type == board?.type ? 'drawer_list_selected' : ''}`}
                                                onClick={() => handleDashboardSelection(board)}>
                                                {board.icon}
                                                <ListItemText className="drawer_subitem_list_text" primary={board.title} />
                                            </ListItemButton>
                                        ))}
                                    </List>
                                </Collapse>
                            </ListItem>
                        ))}
                    </List>
                    <Divider className="drawer_divider"  />
                    <List>
                        {footerNavItems.map((footerItem: any) => (
                            footerItem.items.map((item: any) => (
                                <ListItem style={{ flexWrap: 'wrap' }} key={item.title} disablePadding>
                                    <ListItemButton onClick={()=>{handleOtherSelection(item)}} className={`drawer_list_button ${selectedCategory?.title == item?.title ? 'drawer_list_selected' : ''}`}>
                                        {item.icon}
                                        <ListItemText className="drawer_list_text" primary={item.title} />
                                    </ListItemButton>
                                </ListItem>
                            ))
                        ))}
                    </List>
                </div>

            </Drawer>
        </nav>

    )
}

export default DashboardDrawer
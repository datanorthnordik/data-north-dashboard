import React, { useState } from 'react';
import { useMediaQuery, Theme } from '@mui/material';
import DashboardDrawer from '../Drawer/Drawer';
import AppToolbar from '../AppToolbar/AppToolbar';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import ChatIcon from '@mui/icons-material/Chat';
import "./dashboard.scss"
import { useEffect, useRef } from 'react';
import { getDashBoard } from '../../services/dashboard';
import DashBoardItem from '../DashboardItem/DashBoardItem';



interface DashboardProps {

}



export default function Dashboard(props: DashboardProps) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));  // For screens less than 600px (mobile)
    const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('sm', 'md'));  // Between 600px and 900px (tablet)
    const [dashboards, setDashBoards] = React.useState<any>([])
    const [navItems, setNavItems] = useState([
        { title: 'Demographics', icon: <Diversity3Icon />, dashboards: [] },
        { title: 'Health', icon: <HealthAndSafetyIcon />, dashboards: [] },
        { title: 'Economics', icon: <MonetizationOnIcon />, dashboards: [] }
    ])
    const drawerOpen = mobileOpen || (!isMobile && !isTablet)
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };



    const [selectedCategory, setSelectedCategory] = useState(navItems[0])

    useEffect(() => {
        const newNavItems = [...navItems]
        newNavItems.forEach((item) => {
            const dashboardList = dashboards.filter((board: any) => board.title == item.title)
            item.dashboards = dashboardList
        })
        setNavItems(newNavItems)
        setSelectedCategory(newNavItems[0])
    }, [dashboards])


    useEffect(() => {
        getDashBoardList()
    }, [])

    const getDashBoardList = async () => {
        try {
            const result: any = await getDashBoard()
            setDashBoards(result.data)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='dashboard'>
            <AppToolbar handleDrawerToggle={handleDrawerToggle} />
            <div className='dashboard_wrapper'>
                {drawerOpen && <DashboardDrawer
                    handleDrawerToggle={handleDrawerToggle}
                    isMobile={isMobile}
                    mobileOpen={mobileOpen}
                    isTablet={isTablet}
                    navItems={navItems}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                }

                {selectedCategory.dashboards.map((board: any) => (
                    <DashBoardItem board={board} />
                ))}
            </div>
            <div className='dashboard_chat'>
                <ChatIcon sx={{fontSize: "50px"}} className='dashboard_chat_icon'/>
                
            </div>
        </div>
    );
}
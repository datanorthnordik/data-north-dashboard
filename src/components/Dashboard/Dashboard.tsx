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
import { useNavigate } from 'react-router-dom';
import { BinocularsIcon } from '../../utils/Binocular';
import MapIcon from  "@mui/icons-material/Map"

interface DashboardProps {

}



export default function Dashboard(props: DashboardProps) {

    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));  // For screens less than 600px (mobile)
    const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('sm', 'md'));  // Between 600px and 900px (tablet)
    const [dashboards, setDashBoards] = React.useState<any>([])
    const [navItems, setNavItems] = useState([])
    const navigate = useNavigate()
    const drawerOpen = mobileOpen || (!isMobile && !isTablet)
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    const icons: any = {
        'Demographics': <Diversity3Icon />,
        'Health': <HealthAndSafetyIcon />,
        'Economics': <MonetizationOnIcon />,
        'Soo View': <BinocularsIcon/>,
        'Northern Ontario': <MapIcon/>
    }

    const handleOpen = (event:any,index: number)=>{
        event.stopPropagation();
        const newNavItems:any = [...navItems]
        newNavItems[index].open = !newNavItems[index].open
        setNavItems(newNavItems)
    }

    const [selectedCategory, setSelectedCategory] = useState<any>(navItems[0])

    useEffect(() => {
        if (dashboards.length > 0) {
            const navMap: any = {}
            dashboards.forEach((item: any) => {
                if (navMap[item.type]) {
                    if (navMap[item.type][item.title]) {
                        navMap[item.type][item.title].push(item)
                    } else {
                        navMap[item.type][item.title] = [item]
                    }
                } else {
                    navMap[item.type] = { [item.title]: [item] }
                }

            })
            const newNavItems: any = []
            Object.entries(navMap).forEach(([title, dashboardList]: any) => {
                const boardlist: any = []
                Object.entries(dashboardList).forEach(([category, boards]) => {
                    boardlist.push({ title: category, type: `${title}_${category}`, icon: icons[category], "dashboards": boards })
                })
                newNavItems.push({ title, icon: icons[title], "dashboards": boardlist, open: false })
            });

            console.log(newNavItems)
            newNavItems[0]["open"] = true
            setNavItems(newNavItems)
            setSelectedCategory(newNavItems[0].dashboards[0])
        }

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
            <AppToolbar hideIcon={false} handleDrawerToggle={handleDrawerToggle} />
            <div className='dashboard_wrapper'>
                {drawerOpen && <DashboardDrawer
                    handleOpen={handleOpen}
                    handleDrawerToggle={handleDrawerToggle}
                    isMobile={isMobile}
                    mobileOpen={mobileOpen}
                    isTablet={isTablet}
                    navItems={navItems}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                }
                <div className='dashboard_item'>
                    <div className="dashboard_item__scroll" tabIndex={0} >
                        {selectedCategory?.dashboards.map((board: any) => (
                            <DashBoardItem board={board} />
                        ))}
                    </div>
                </div>
            </div>
            <div className='dashboard_chat' title="Ask analyst" onClick={() => { navigate("/chat") }}>
                <img src="NIA ICON.png" className='dashboard_chat_icon' />
            </div>
        </div>
    );
}
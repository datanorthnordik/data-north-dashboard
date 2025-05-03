import React, { useState } from 'react';
import { useMediaQuery, Theme } from '@mui/material';
import DashboardDrawer from '../Drawer/Drawer';
import AppToolbar from '../AppToolbar/AppToolbar';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import "./dashboard.scss"
import { useEffect, useRef } from 'react';
import { getDashBoard } from '../../services/dashboard';



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
    const iframeRef = useRef<HTMLIFrameElement>(null);
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
                <div className='dashboard_item'>
                    <div className="dashboard_item__scroll" tabIndex={0} >
                        {selectedCategory.dashboards.map((board:any) => (
                            <iframe className='dashboard_item_visual'
                                style={{height: board.height}}
                                title="Data Visualisation"
                                ref={iframeRef}
                                sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                allow="fullscreen"
                                src={`${board.link}?:embed=y&amp;:showVizHome=no&amp;
                    :host_url=https%3A%2F%2Fpublic.tableau.com%2F&amp;:embed_code_version=3&amp;:tabs=no&amp;:toolbar=yes&amp;
                    :animate_transition=yes&amp;:display_static_image=no&amp;:display_spinner=no&amp;:display_overlay=yes&amp;
                    :display_count=yes&amp;:language=en-US&amp;:loadOrderID=0`}>
                            </iframe>
                        ))}

                    </div>
                </div>
            </div>
        </div>
    );
}
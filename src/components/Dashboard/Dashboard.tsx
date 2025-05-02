import * as React from 'react';
import { useMediaQuery, Theme } from '@mui/material';
import DashboardDrawer from '../Drawer/Drawer';
import AppToolbar from '../AppToolbar/AppToolbar';
import "./dashboard.scss"


interface DashboardProps {

}

export default function Dashboard(props: DashboardProps) {
    const [mobileOpen, setMobileOpen] = React.useState(false);
    const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));  // For screens less than 600px (mobile)
    const isTablet = useMediaQuery((theme: Theme) => theme.breakpoints.between('sm', 'md'));  // Between 600px and 900px (tablet)

    const drawerOpen = mobileOpen || (!isMobile && !isTablet)
    const handleDrawerToggle = () => {
        setMobileOpen((prevState) => !prevState);
    };

    return (
        <div className='dashboard'>
            <AppToolbar handleDrawerToggle={handleDrawerToggle} />
            <div className='dashboard_wrapper'>
                {drawerOpen && <DashboardDrawer   
                    handleDrawerToggle={handleDrawerToggle} 
                    isMobile={isMobile} 
                    mobileOpen={mobileOpen}
                    isTablet={isTablet} />
                }
                <div className='dashboard_item'>
                    <iframe className='dashboard_item_visual'
                        title="Data Visualisation"   
                        src="https://public.tableau.com/views/MobileView_17461501570240/Dashboard1?:language=en-GB&:sid=&:redirect=auth&:display_count=n&:origin=viz_share_link?:embed=y&amp;:showVizHome=no&amp;
                        :host_url=https%3A%2F%2Fpublic.tableau.com%2F&amp;:embed_code_version=3&amp;:tabs=no&amp;:toolbar=yes&amp;
                        :animate_transition=yes&amp;:display_static_image=no&amp;:display_spinner=no&amp;:display_overlay=yes&amp;
                        :display_count=yes&amp;:language=en-US&amp;:loadOrderID=0">
                    </iframe>
                </div>
            </div>
        </div>
    );
}
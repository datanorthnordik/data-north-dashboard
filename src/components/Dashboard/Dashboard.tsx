import React, { useEffect, useState } from 'react';
import { useMediaQuery, Theme } from '@mui/material';
import DashboardDrawer from '../Drawer/Drawer';
import AppToolbar from '../AppToolbar/AppToolbar';


import "./dashboard.scss"
import DashBoardItem from '../DashboardItem/DashBoardItem';
import { useNavigate } from 'react-router-dom';
import { BinocularsIcon } from '../../utils/Binocular';

interface DashboardProps {
    handleDrawerToggle: ()=>void
    selectedCategory: any
    navItems: any
    setSelectedCategory: (category:any)=> void
}



export default function Dashboard(props: DashboardProps) {

    const {handleDrawerToggle,selectedCategory, navItems, setSelectedCategory} = props
    const navigate = useNavigate()

    useEffect(()=>{
        if(!selectedCategory?.dashboards && navItems?.length>0){
            setSelectedCategory(navItems[0]?.dashboards[0])
        }

    },[selectedCategory, navItems])
    
    return (
        <div className='dashboard'>
            <AppToolbar handleDrawerToggle={handleDrawerToggle} />
            <div className='dashboard_wrapper'>
                
                <div className='dashboard_item'>
                    <div className="dashboard_item__scroll" tabIndex={0} >
                        {selectedCategory?.dashboards?.map((board: any) => (
                            <DashBoardItem board={board} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
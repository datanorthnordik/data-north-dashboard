import React, { useState } from 'react';
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
}



export default function Dashboard(props: DashboardProps) {

    const {handleDrawerToggle,selectedCategory} = props
    const navigate = useNavigate()
    
    return (
        <div className='dashboard'>
            <AppToolbar handleDrawerToggle={handleDrawerToggle} />
            <div className='dashboard_wrapper'>
                
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
import * as React from "react"
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import "./apptoolbar.scss"

interface AppToolbarProps {
    handleDrawerToggle?: () => void
    hideIcon: boolean
}

const AppToolbar = (props: AppToolbarProps) => {
    const { handleDrawerToggle, hideIcon } = props
    return (
        <AppBar className="apptoolbar" component="nav">
            <Toolbar className='toolbar'>
                {hideIcon && <IconButton
                    className="toolbar_icon"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { md: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>}

                <img className="toolbar_brand" fetchPriority="high" width="1280" height="320"
                    src="https://nordikinstitute.com/wp-content/uploads/2020/04/NordikFinalLogo-1280x320.png" alt="Nordik Institute"
                    srcSet="https://nordikinstitute.com/wp-content/uploads/2020/04/NordikFinalLogo-1280x320.png 1280w, 
                    https://nordikinstitute.com/wp-content/uploads/2020/04/NordikFinalLogo-640x160.png 640w, 
                    https://nordikinstitute.com/wp-content/uploads/2020/04/NordikFinalLogo-768x192.png 768w, 
                    https://nordikinstitute.com/wp-content/uploads/2020/04/NordikFinalLogo-1536x384.png 1536w, 
                    https://nordikinstitute.com/wp-content/uploads/2020/04/NordikFinalLogo.png 1656w"
                    sizes="(max-width: 1280px) 100vw, 1280px"></img>
                
                <h1 className="toolbar_heading">
                    DATA NORTH
                </h1>

                <img className="toolbar_brand_secondary" fetchPriority="high" width="1280" height="320"
                    src="decide_lab.jpg"
                    ></img>
            </Toolbar>
        </AppBar>
    )
}

export default AppToolbar
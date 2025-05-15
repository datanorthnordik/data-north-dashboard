import React, { useEffect, useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import './App.scss';
import Dashboard from './components/Dashboard/Dashboard';
import { Route, BrowserRouter as Router, Routes, useLocation, useNavigate } from 'react-router-dom';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import Chat from './components/Chat/Chat';
import DataAck from './components/DataAck/DataAck';
import ContactUs from './components/ContactUs/ContactUs';
import AboutUs from './components/AboutUs/AboutUs';
import DashboardDrawer from './components/Drawer/Drawer';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import Diversity3Icon from '@mui/icons-material/Diversity3';
import MapIcon from  "@mui/icons-material/Map"
import { getDashBoard } from './services/dashboard';
import { BinocularsIcon } from './utils/Binocular';


function App() {
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const location = useLocation()
  const [navItems, setNavItems] = useState([])
  const navigate = useNavigate()
  const [dashboards, setDashBoards] = React.useState<any>([])
  const drawerOpen = mobileOpen
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

  const handleOpen = (event: any, index: number) => {
    event.stopPropagation();
    const newNavItems: any = [...navItems]
    newNavItems[index].open = !newNavItems[index].open
    setNavItems(newNavItems)
  }

  const headerNavItems:any = [
    {"Heading": "", items:[{"title": "About Us", icon: <AccountCircleIcon/>, onClick: ()=>{navigate("")}}]}
]

const footerNavItems = [
    {"Heading": "", items:[{"title": "Data Acknowledgement", icon: <CheckCircleIcon/>, onClick: ()=>{navigate("/data-ack")}}]},
    {"Heading": "", items:[{"title": "Contact Us", icon: <ContactMailIcon/>, onClick: ()=>{navigate("/contact-us")}}]}
]

  const [selectedCategory, setSelectedCategory] = useState<any>(headerNavItems[0]["items"][0])
  
  const theme = createTheme();

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
    <ThemeProvider theme={theme}>
      {drawerOpen && <DashboardDrawer
        handleOpen={handleOpen}
        handleDrawerToggle={handleDrawerToggle}
        mobileOpen={mobileOpen}
        navItems={navItems}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        headerNavItems={headerNavItems}
        footerNavItems={footerNavItems}
      />
      }
        <Routes>
          <Route path="" element={<AboutUs handleDrawerToggle={handleDrawerToggle} />} />
          <Route path="/chat" element={<Chat handleDrawerToggle={handleDrawerToggle} />} />
          <Route path="/data-ack" element={<DataAck handleDrawerToggle={handleDrawerToggle} />} />
          <Route path="/contact-us" element={<ContactUs handleDrawerToggle={handleDrawerToggle} />} />
          <Route path="/dashboard" element={<Dashboard navItems={navItems} setSelectedCategory={setSelectedCategory} selectedCategory={selectedCategory} handleDrawerToggle={handleDrawerToggle} />} />
        </Routes>
        <div style={{"display": location.pathname == "/chat" ? "none": "flex"}} className='dashboard_chat' title="Ask analyst" onClick={() => { navigate("/chat") }}>
                <img src="NIA ICON.png" className='dashboard_chat_icon' />
        </div>
    </ThemeProvider>
  );
}

export default App;

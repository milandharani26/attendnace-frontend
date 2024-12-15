import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { useLocation, useNavigate } from 'react-router-dom';
import ApartmentIcon from '@mui/icons-material/Apartment';
import { useDispatch, useSelector } from 'react-redux';
import { capitalizeName, checkPermission, removeUserSession } from '../utility/genricFunctions';
import AppLogo from "../assets/icons/Biometric Attendance (2).png";
import PersonIcon from '@mui/icons-material/Person';
import CalendarViewMonthIcon from '@mui/icons-material/CalendarViewMonth';
import { handleSidebar } from '../store/slices/auth/auth.slice';
import { Button } from '@mui/material';
import { useAppDispatch } from '../store/store';
import { logout } from '../store/builders/auth/auth.builder';

const drawerWidth = 240;
const collapsedDrawerWidth = 60; // Width of the drawer when collapsed

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
    open?: boolean;
}>(({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    // marginLeft: open ? drawerWidth : collapsedDrawerWidth,
}));

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
}));

const sideBarList = [
    {
        name: 'Dashboard',
        rootRoute: '/dashboard',
        route: '/dashboard',
        permission: "ALL_ATTENDANCE",
        requiredRole: ['superadmin', 'officeadmin', 'orgadmin'],
        subMenu: [],
    },
    {
        icon: <PersonIcon sx={{ backgroundColor: `${location?.pathname?.split("/").includes('office') ? 'white' : 'white'}` }} />,
        name: 'Employee',
        rootRoute: '/employee',
        route: '/employee',
        permission: "ALL_EMPLOYEES",
        requiredRole: ['superadmin', 'employee', 'officeadmin', 'orgadmin'],
        subMenu: [],
    },
    {
        icon: <ApartmentIcon sx={{ backgroundColor: `${location?.pathname?.split("/").includes('office') ? 'white' : 'white'}` }} />,
        name: 'Office',
        rootRoute: '/office',
        route: '/office',
        permission: "ALL_OFFICE",
        requiredRole: ['superadmin', 'orgadmin'],
        subMenu: [],
    },
    {
        icon: <CalendarViewMonthIcon sx={{ backgroundColor: `${location?.pathname?.split("/").includes('office') ? 'white' : 'white'}` }} />,
        name: 'Attendance',
        rootRoute: '/attendance',
        route: '/attendance',
        permission: "ALL_ATTENDANCE",
        requiredRole: ['superadmin', 'officeadmin', 'orgadmin'],
        subMenu: [],
    },
];

export default function Layout({ children }: { children: React.ReactNode }) {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useAppDispatch()
    const userDetails = useSelector(store => store?.auth?.user?.user)
    const useRole = useSelector(store => store?.auth?.user?.userRole?.role_name)
    const sidebarOpen = useSelector(store => store?.auth?.isSidebarOpen)

    console.log(userDetails.user_email, "9999999")

    const userId = userDetails.user_id

    const handleDrawerOpen = () => {
        setOpen(true);
        // dispatch(handleSidebar(!sidebarOpen))
    };

    const handleDrawerClose = () => {
        dispatch(handleSidebar(!sidebarOpen))
        setOpen(!open);
    };

    const handleLogout = () => {
        // navigate("/login")

        dispatch(logout({ userId }))
        removeUserSession(dispatch, navigate);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={sidebarOpen} sx={{ backgroundColor: "black", color: "white" }}>
                <Toolbar sx={{ display: 'flex', justifyContent: "space-between" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{ mr: 2, ...(sidebarOpen && { display: 'none' }) }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" noWrap component="div">
                            Welcome Back, {" "}  {" "}{capitalizeName(userDetails?.user_name)}
                        </Typography>
                    </Box>
                    <Typography variant="h6" noWrap component="div" onClick={handleLogout}>
                        Logout
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                sx={{
                    width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: sidebarOpen ? drawerWidth : collapsedDrawerWidth,
                        transition: theme.transitions.create('width', {
                            easing: theme.transitions.easing.sharp,
                            duration: theme.transitions.duration.enteringScreen,
                        }),
                        overflowX: 'hidden',
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
                open={sidebarOpen}
            >
                <DrawerHeader sx={{ display: "flex", justifyContent: "space-between" }}>
                    {/* <img src={AppLogo} alt="App logo" srcset="" style={{width:"50px"}}/> */}

                    {sidebarOpen ? <img src={AppLogo} alt="App logo" style={{ width: "50px" }} /> : null}

                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <MenuIcon /> : <MenuIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <List>
                    {sideBarList.map((navLink, index) => (
                        <>
                            {/* {console.log("8888888888888888", checkPermission(navLink.requiredRole, useRole))} */}

                            {checkPermission(navLink.requiredRole, useRole) && <ListItem
                                key={navLink.name}
                                disablePadding
                                sx={{
                                    backgroundColor: `${location?.pathname?.split("/").includes(navLink.rootRoute.slice(1)) ? 'black' : 'white'}`,
                                    color: `${location?.pathname?.split("/").includes(navLink.rootRoute.slice(1)) ? 'white' : 'black'}`
                                }
                                }
                            >
                                <ListItemButton onClick={() => navigate(navLink.route)} sx={{ minHeight: "50px", justifyContent: sidebarOpen ? 'initial' : 'center' }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: sidebarOpen ? 3 : 'auto', justifyContent: 'center' }}>
                                        {navLink.icon ? navLink.icon : index % 2 === 0 ? <InboxIcon sx={{ backgroundColor: "white" }} /> : <MailIcon sx={{ backgroundColor: "white" }} />}
                                    </ListItemIcon>
                                    {sidebarOpen && <ListItemText primary={navLink.name} />}
                                </ListItemButton>
                            </ListItem>}

                            {/* <ListItem
                                key={navLink.name}
                                disablePadding
                                sx={{
                                    backgroundColor: `${location?.pathname?.split("/").includes(navLink.rootRoute.slice(1)) ? 'black' : 'white'}`,
                                    color: `${location?.pathname?.split("/").includes(navLink.rootRoute.slice(1)) ? 'white' : 'black'}`
                                }
                                }
                            >
                                <ListItemButton onClick={() => navigate(navLink.route)} sx={{ minHeight: "50px", justifyContent: open ? 'initial' : 'center' }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }}>
                                        {navLink.icon ? navLink.icon : index % 2 === 0 ? <InboxIcon sx={{ backgroundColor: "white" }} /> : <MailIcon sx={{ backgroundColor: "white" }} />}
                                    </ListItemIcon>
                                    {open && <ListItemText primary={navLink.name} />}
                                </ListItemButton>
                            </ListItem> */}


                        </>
                    ))}
                </List>
            </Drawer>
            <Main open={sidebarOpen}>
                <DrawerHeader />
                {children}
            </Main>
        </Box>
    );
}

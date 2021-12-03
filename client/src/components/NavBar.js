import { useContext, useState } from 'react';
import { Link } from 'react-router-dom'
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import { PageViewTypes} from '../store'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Person from '@mui/icons-material/PersonOutlined'
import Sort from '@mui/icons-material/Sort'
import Home from '@mui/icons-material/HomeOutlined'
import Groups from '@mui/icons-material/GroupsOutlined'
import Functions from '@mui/icons-material/Functions'
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu';
export default function NavBar() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [anchorEl, setAnchorEl] = useState(null);
    const isMenuOpen = Boolean(anchorEl);

    

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSortMenuClose = () => {
        setAnchorEl(null);
    };

    const handleSortClose = () => {
        setAnchorEl(null);
    };


    const menuId = 'primary-search-account-menu';
    const sortMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
            }}
            id={menuId}
            keepMounted
            transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            open={isMenuOpen}
            onClose={handleSortMenuClose}
        >   
            <MenuItem onBlur={handleSortClose} onClick={handleSortClose}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={handleSortClose}>Publish Date (Oldest)</MenuItem>
            <MenuItem onClick={handleSortClose}>Views</MenuItem>
            <MenuItem onClick={handleSortClose}>Likes</MenuItem>
            <MenuItem onClick={handleSortClose}>Dislikes</MenuItem>
        </Menu>
    );


 
    function handleHome() {
        store.changeView(PageViewTypes.HOME)
        console.log(store.pageView);
        
    }

    function handleAll(){
        store.changeView(PageViewTypes.ALL)
        console.log("CHANGING TO All")
    }

    function handleUser(){
        store.changeView(PageViewTypes.USER)
        console.log("CHANGING TO USER")
    }

    function handleComm(){
        store.changeView(PageViewTypes.COMM)
        console.log("CHANGING TO Community")
    }


    return (
        <Box sx={{ flexGrow: 1 }}>
        <AppBar id="NavBar" position="absolute" elevation={0} sx={{background: "#c4c4c4"}}>
                <Toolbar >
                    <Typography                        
                        variant="h4"
                        noWrap
                        component="div"
                        sx={{ display: { xs: 'none', sm: 'block' } }}                        
                    >
                       
                    </Typography>
                    <Stack direction="row" spacing={1}>
                        <IconButton disabled={auth.isGuest} onClick={() => handleHome()}><Home sx={{fontSize: 40, fill:((store.pageView === PageViewTypes.HOME) ? "#d3ae37":((auth.isGuest)? "":"black")) }} variant="outlined"></Home></IconButton>
                        {/* <IconButton color="error"><Home sx={{color:"black", fontSize: 40, fill:"red" }} variant="outlined"></Home></IconButton> */}
                        <IconButton onClick={handleAll}><Groups sx={{ fontSize: 40, fill:((store.pageView === PageViewTypes.ALL) ? "#d3ae37":"black")}}></Groups></IconButton>
                        <IconButton onClick={handleUser}><Person sx={{fontSize: 40, fill:((store.pageView === PageViewTypes.USER) ? "#d3ae37":"black") }}></Person></IconButton>
                        <IconButton onClick={handleComm}><Functions sx={{ fontSize: 40, fill:((store.pageView === PageViewTypes.COMM) ? "#d3ae37":"black") }}></Functions></IconButton>
                    </Stack>
                        <Box sx={{flexGrow:1}}>
                            <TextField sx={{background:"white", width:"80%"}} variant="filled" label="Search"></TextField>
                        </Box>

                        <Typography sx={{fontWeight:"bold", color:"black"}}> SORT BY </Typography>
                        <IconButton onClick={handleSortMenuOpen} aria-controls={menuId} ><Sort></Sort></IconButton>
                        
                </Toolbar>
            </AppBar>
            {
                sortMenu
            }
        </Box>
    );
}
import { useContext, useState, useEffect} from 'react';
import AuthContext from '../auth';
import { GlobalStoreContext } from '../store'
import { PageViewTypes, SortingTypes} from '../store'
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

    useEffect(() => {
        // auth.getLoggedIn()
        // console.log(store.filter)
        if (store.pageView === PageViewTypes.HOME || store.pageView === PageViewTypes.ALL){
            store.loadAllLists();
        }
        
    }, 
    [store.filter, store.filterUsername])

    const handleSortMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleSortMenuClose = () => {
        setAnchorEl(null);
    };

    // const handleSortClose = () => {
    //     setAnchorEl(null);
    // };

    const handleSortDateNClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
        store.changeSorting(SortingTypes.DATEA);
    }

    const handleSortDateOClose = (event) =>{
        event.stopPropagation();
        setAnchorEl(null);
        store.changeSorting(SortingTypes.DATED);
    }

    const handleSortViews = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
        store.changeSorting(SortingTypes.VIEWS);
    }

    const handleSortLikes = (event) =>{
        event.stopPropagation();
        setAnchorEl(null);
        store.changeSorting(SortingTypes.LIKES);
    }

    const handleSortDislikes = (event) =>{
        event.stopPropagation();
        setAnchorEl(null);
        store.changeSorting(SortingTypes.DISLIKES);
    }


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
            <MenuItem onClick={(event) => handleSortDateNClose(event)}>Publish Date (Newest)</MenuItem>
            <MenuItem onClick={(event) => handleSortDateOClose(event)}>Publish Date (Oldest)</MenuItem>
            <MenuItem onClick={(event) => handleSortViews(event)}>Views</MenuItem>
            <MenuItem onClick={(event) => handleSortLikes(event)}>Likes</MenuItem>
            <MenuItem onClick={(event) => handleSortDislikes(event)}>Dislikes</MenuItem>
        </Menu>
    );


 
    function handleHome() {
        store.changeView(PageViewTypes.HOME)
        // console.log(store.pageView);
        
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

    function handleKeyPress(event){
        if (store.pageView === PageViewTypes.USER || store.pageView === PageViewTypes.COMM){
            if (event.key === "Enter"){
                store.loadAllLists();
            }
        }
    }
    let buttonStyleAll = (store.currentList !== null)? "gray": ((store.pageView === PageViewTypes.ALL) ? "#d3ae37":"black")
    let buttonStyleUser = (store.currentList !== null)? "gray": ((store.pageView === PageViewTypes.USER) ? "#d3ae37":"black")
    let buttonStyleComm = (store.currentList !== null)? "gray": ((store.pageView === PageViewTypes.COMM) ? "#d3ae37":"black")
    let sortStyle = (store.currentList !== null)? "gray": "black"



    function handleTextChange(event){
        store.changeFilter(event.target.value);
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
                        <IconButton disabled={auth.isGuest || store.currentList !== null} onClick={() => handleHome()}><Home sx={{fontSize: 40, fill:((store.pageView === PageViewTypes.HOME) ? "#d3ae37":((auth.isGuest)? "":"black")) }} variant="outlined"></Home></IconButton>
                        {/* <IconButton color="error"><Home sx={{color:"black", fontSize: 40, fill:"red" }} variant="outlined"></Home></IconButton> */}
                        <IconButton disabled={store.currentList !== null} onClick={handleAll}><Groups sx={{ fontSize: 40, fill:buttonStyleAll}}></Groups></IconButton>
                        <IconButton disabled={store.currentList !== null} onClick={handleUser}><Person sx={{fontSize: 40, fill:buttonStyleUser}}></Person></IconButton>
                        <IconButton disabled={store.currentList !== null} onClick={handleComm}><Functions sx={{ fontSize: 40, fill:buttonStyleComm }}></Functions></IconButton>
                    </Stack>
                        <Box sx={{flexGrow:1}}>
                            <TextField value={store.filter} onKeyUp={(event)=> handleKeyPress(event)} onChange={(event)=>handleTextChange(event) } disabled={store.currentList !== null} sx={{background:"white", width:"80%"}} variant="filled" label="Search"></TextField>
                        </Box>

                        <Typography sx={{fontWeight:"bold", color:sortStyle}}> SORT BY </Typography>
                        <IconButton disabled={store.currentList !== null}  onClick={handleSortMenuOpen} aria-controls={menuId} ><Sort sx={{ fontSize: 40, fill:sortStyle }}></Sort></IconButton>
                        
                </Toolbar>
            </AppBar>
            {
                sortMenu
            }
        </Box>
    );
}
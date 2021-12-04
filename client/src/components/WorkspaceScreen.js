import { useContext, useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import Top5Item from './Top5Item.js'
import List from '@mui/material/List';
import { Typography, Stack, Box, TextField, Button} from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import NavBar from './NavBar.js';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/


function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    //console.log(store)
    let location = useLocation();
    //console.log(location.pathname)
    
    let idFromUrl = location.pathname.substring(2 + "top5list".length)
    //console.log(idFromUrl)

    useEffect(() =>{
        
        store.setCurrentList(idFromUrl)
    }
    , []);
    let editItems = "";
    let listName = ""

    let listCopy = null;

    function handleItemChange(event,index) {
        listCopy.items[index] = event.target.value;
        console.log(listCopy)
    }
    
    function handleTitleChange(event) {
        listCopy.name = event.target.value;
    }
    
    if (store.currentList) {
        listCopy= {...store.currentList};
        //console.log(listCopy)
        editItems = 
            <Stack sx={{width:"100%"}} spacing={2.2}>
                {
                store.currentList.items.map((item,index) => (
                    <TextField id={"top5text-" + index} key={"top5text-" + index} size="small" sx={{width:"99.5%", bgcolor:"#d3ae37", marginTop:1.25}} inputProps={{style: {fontSize: 25}}} defaultValue={item} onChange={(event) => handleItemChange(event,index) } > </TextField>
                ))
                
                }
            </Stack>
            ;
        listName = <TextField id={"top5title" + store.currentList._id} size="small" defaultValue={store.currentList.name} sx={{width:"50%", backgroundColor:"white"}} onChange={(event) => handleTitleChange(event)}></TextField>
            // <List id="edit-items" sx={{ width: '100%', bgcolor: 'background.paper' }}>
            //     {
            //         store.currentList.items.map((item, index) => (
            //             <Top5Item 
            //                 key={'top5-item-' + (index+1)}
            //                 text={item}
            //                 index={index} 
            //             />
            //         ))
            //     }
            // </List>;
    }
    
    // console.log(store.currentList)
    return (
        <div>
            <div id="top5-workspace-bar">
                <NavBar/>
            
            <div id="workspace-back">
            <Box position="relative" top={65} pb="18vh" pt={1}sx={{}}>
           
                {/* <Box position="relative" sx={{ border: 1, backgroundColor:"#d4d4f5", borderRadius: 2}}> */}
                    <Stack m={2} spacing={1}>
                        {listName}
                        <Box pb={1} sx={{bgcolor:"#2c2e70", borderRadius:"7px"}}>
                                <Stack direction="row">
                                <Stack justifyContent="space-between">
                                    <Box sx={{alignContent: 'left', bgcolor:"#d3ae37", borderRadius:"7px", color:"black", border: 1}} m={1} pt={1} pb={1} pl={2} pr={2}>
                                            
                                            <Typography sx={{fontSize:25}}>{"1."}</Typography>
                                            
                                    </Box>
                                    <Box sx={{alignContent: 'left', bgcolor:"#d3ae37", borderRadius:"7px", color:"black", border: 1}} m={1} pt={1} pb={1} pl={2} pr={2}>
                                            
                                            <Typography sx={{fontSize:25}}>{"2."}</Typography>
                                            
                                    </Box>
                                    <Box sx={{alignContent: 'left', bgcolor:"#d3ae37", borderRadius:"7px", color:"black", border: 1}} m={1} pt={1} pb={1} pl={2} pr={2}>
                                            
                                            <Typography sx={{fontSize:25}}>{"3."}</Typography>
                                            
                                    </Box>
                                    <Box sx={{alignContent: 'left', bgcolor:"#d3ae37", borderRadius:"7px", color:"black", border: 1}} m={1} pt={1} pb={1} pl={2} pr={2}>
                                            
                                            <Typography sx={{fontSize:25}}>{"4."}</Typography>
                                            
                                    </Box>
                                    <Box sx={{alignContent: 'left', bgcolor:"#d3ae37", borderRadius:"7px", color:"black", border: 1}} m={1} pt={1} pb={1} pl={2} pr={2}>
                                            
                                            <Typography sx={{fontSize:25}}>{"5."}</Typography>
                                            
                                    </Box>
                                    
                                </Stack>
                                    {editItems}
                                    
                                </Stack>
                            </Box>

                            <Stack  pt={2} direction="row"  height={60}>
                                <Stack  width="50%"></Stack>
                                <Stack width="50%" direction="row" spacing={2} justifyContent="space-between">
                                    <Button fullWidth="true" variant="filled" size="large" onClick={() => store.updateCurrentList(listCopy)} sx={{ border:2 , outlineColor:"black", fontSize:40 ,bgcolor:"#dddddd"}}>Save</Button>
                                    <Button fullWidth="true" variant="filled" size="large" sx={{border:2 , outlineColor:"black", fontSize:40, bgcolor:"#dddddd"}}>Publish</Button>
                                </Stack>
                            </Stack>
                    </Stack>
                </Box>
            </div>
            </div>
            {/* <div id="top5-workspace">
                
                <div id="workspace-edit">
                    <div id="edit-numbering">
                        <div className="item-number"><Typography variant="h3">1.</Typography></div>
                        <div className="item-number"><Typography variant="h3">2.</Typography></div>
                        <div className="item-number"><Typography variant="h3">3.</Typography></div>
                        <div className="item-number"><Typography variant="h3">4.</Typography></div>
                        <div className="item-number"><Typography variant="h3">5.</Typography></div>
                    </div>
                    {editItems}
                </div>
            </div> */}
        </div>
       
    )
}

export default WorkspaceScreen;
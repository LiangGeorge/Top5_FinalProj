import { useContext, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import Statusbar from './Statusbar.js'
import { Typography, Stack, Box, TextField, Button} from '@mui/material'
import { GlobalStoreContext } from '../store/index.js'
import AuthContext from '../auth';
import NavBar from './NavBar.js';
/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/


function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    const {auth} = useContext(AuthContext);
    const [nameText, setName] = useState("")
    const [itemFlopper, setItem] = useState(0);
    const [disabledButtonOverall, setButton] = useState(false);
    const [firstRender, setFirst] = useState(0)
    //console.log(store)
    let location = useLocation();
    //console.log(location.pathname)
    
    let idFromUrl = location.pathname.substring(2 + "top5list".length)
    //console.log(idFromUrl)
    function uniqueItems(list){
        let lowerList = []
        for (let i = 0; i < list.length; i++){
            if (list[i].length !== 0){
                let itemToPush = list[i].toLowerCase().trim()
                if (itemToPush.length == 0){
                    return false;
                }
                lowerList.push(list[i].toLowerCase().trim())
            }
        }
        // console.log(lowerList)
        let setItems = new Set(lowerList)
        // console.log(setItems)
        return setItems.size == 5
    }

    

    let editItems = "";
    let listName = ""

    let listCopy = null;
    // let i = 0
    // console.log("The value of i was reset")
    function publishList(event){
        //Tack on the datePublished: Date
        listCopy["datePublished"] = new Date();
        listCopy["name"] = nameText;
        console.log("PUBLISHING THIS LIST: ")
        console.log(listCopy)
        setItem(0)
        store.updateCurrentList(listCopy)
    }

    function saveList(event){
        listCopy["name"] = nameText;
        setItem(0)
        store.updateCurrentList(listCopy)
    }
    function handleItemChange(event,index) {
        listCopy.items[index] = event.target.value;
        setItem(itemFlopper + 1);
    }
    
    function handleTitleChange(event) {
        console.log(event.target.value)
        listCopy["name"] = event.target.value;
        setName(event.target.value)
        setItem(itemFlopper + 1)
    }
    // uponCreation = 1
    // async function test(){
        if (store.currentList && !listCopy) {
            listCopy= {...store.currentList};
            // if (uponCreation )
            // console.log("BAD")
            // async function test(){
            //     setName(await store.checkExist(listCopy.name))
            // }
            // test()
            // setItem(uniqueItems(listCopy.items))
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
           
        }
    // }
    // test()
    
    
       useEffect(() =>{
        //    console.log("PRINTING LIST: ")
        //    console.log(listCopy)
        
           if (itemFlopper == 0){
                // console.log("NAME: " + listCopy.name)
                if (listCopy.name){
                    setName(listCopy.name)
                }
                setItem(itemFlopper + 1)
           }
        //    console.log("PRINTING LIST NAME: " + nameText)
        //    let x = null;
           async function check(){
            //    console.log("PERFORMING CHECK TO SEE IF NAME IS VALID FOR PUBLISH")
               let x = await store.checkExist(nameText)
                if (nameText.length == 0){
                    x = true;
                }
                // console.log(nameText)
                // console.log(x)
                
                // console.log("DOES THE NAME EXIST? " + x)
                // console.log("ARE THE ITEMS NOT UNIQUE? : " + !uniqueItems(listCopy.items))
                setButton(!uniqueItems(listCopy.items) || x)
           }
           check()
           
        //    store.checkExist(listCopy.name)
       }, [itemFlopper])
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
                                    <Button fullWidth={true} variant="filled" size="large" onClick={(event) => saveList(event)} sx={{ border:2 , outlineColor:"black", fontSize:40 ,bgcolor:"#dddddd"}}>Save</Button>
                                    <Button disabled={disabledButtonOverall} fullWidth={true}  onClick={(event) => publishList(event)}variant="filled" size="large" sx={{border:2 , outlineColor:"black", fontSize:40, bgcolor:"#dddddd"}}>Publish</Button>
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
            <Statusbar></Statusbar>
        </div>
       
    )
}

export default WorkspaceScreen;
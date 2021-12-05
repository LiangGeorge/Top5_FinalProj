import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import { Fab, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add';
import List from '@mui/material/List';
import { PageViewTypes, SortingTypes} from '../store'
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import NavBar from './NavBar.js'
import AppBar from '@mui/material/AppBar';
import AuthContext from '../auth'
/*
    This React component lists all the top5 lists in the UI.
    
    @author McKilla Gorilla
*/
const HomeScreen = () => {
    
    const { auth } = useContext(AuthContext);
    // console.log(auth)


    const { store } = useContext(GlobalStoreContext);
    //No rerender because the child is the only component that changes from a selection on NavBar
    // console.log(store)
    useEffect(() => {
        // store.loadIdNamePairs();
        // console.log(auth.loggedIn)
        
        store.loadAllLists()
        // if (auth.loggedIn){
        //     console.log("FSJAOIJFIOAJSFOIJOISJ")
        //     store.changeView(PageViewTypes.HOME);
        // }else{
        //     store.changeView(PageViewTypes.COMM);
        // }

    }, [store.pageView, store.sort]);


    function handleDeleteMarkedList(){
        store.deleteMarkedList();
        store.unmarkListForDeletion();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <Stack sx={{position: "absolute",left:"5%", width:"90%",bgcolor: '#c4c4c4' }}>
            {
                store.allLists.map((list) => (
                    <ListCard
                        key={list._id}
                        top5List={list}
                        // idNamePair={pair}
                        selected={false}
                    />
                ))
            }
            </Stack>;
    }

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

    // console.log("Rendering")
    return (
        
        
        <div id="top5-list-selector">
            <NavBar/>
            
            <div id="list-selector-list">
                {
                    listCard
                }
            </div>
            {/* <div id="list-selector-heading"> */}
            {/* <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab> */}


            <Modal
                aria-describedby="modal-modal-description"
                open={store.listMarkedForDeletion !== null}
                className={"modal " + ((store.listMarkedForDeletion)? "is-visible": "")}
                >
                    
                <Box sx = {style}>
                    
                    <Typography id="modal-modal-description" align="center"sx={{ mt: 2}}>
                    {"Delete the Top 5 " + (store.listMarkedForDeletion? store.listMarkedForDeletion.name: "")+ " List?"}
                    </Typography>
                    <Stack direction="row" alignItems="stretch" spacing={3} sx = {{ ml: 13}}>
                    <Button 
                        onClick={handleDeleteMarkedList}
                        size="small"
                        
                        variant="contained" color="error">Confirm</Button>
                        <Button 
                        onClick={() => store.unmarkListForDeletion()}
                        style={{ minHeight: "10px"}}
                        size="small"
                        variant="contained">Cancel</Button>
                        
                    </Stack>
                    
                </Box>
            </Modal>


            {/* <Typography variant="h2">Your Lists</Typography> */}
            {/* </div> */}
        </div>
    
        )
}

export default HomeScreen;
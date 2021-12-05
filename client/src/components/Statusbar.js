import { useContext , useEffect} from 'react'
import { GlobalStoreContext } from '../store'
import { PageViewTypes} from '../store'
import { Typography, IconButton } from '@mui/material'
import AuthContext from '../auth';
import AddIcon from '@mui/icons-material/Add';
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    // console.log(GlobalStoreContext)
    // console.log(AuthContext)
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
     
//    console.log(store)
    function handleCreateNewList() {
        store.createNewList();
    }

    let statusInternal = ""
    let text="";
    if (store.currentList){
        text = store.currentList.name;
    }
    
    // console.log(store.currentList)
    if (store.currentList === null){
        // console.log("REACHAEUOFHUOAHO")
        if (store.pageView === PageViewTypes.HOME && auth.loggedIn){
            if (auth.loggedIn){
                statusInternal = 
            <div id="top5-statusbar">
                <IconButton
                    // color="primary" 
                    // aria-label="add"
                    // id="add-list-button"
                    sx={{color:"black"}}
                    onClick={handleCreateNewList}
                >
                    <AddIcon sx={{fontSize: 50}}  />
                </IconButton> 
                <Typography variant="h4">Your Lists</Typography>    
            </div>
            }
        }else if (store.pageView === PageViewTypes.ALL || store.pageView === PageViewTypes.USER){
            statusInternal = 
            <div id="top5-statusbar">
                <Typography variant="h4">{store.filter + ((store.filter.length !== 0)? " Lists": "")} </Typography>    
            </div>
        }else if(store.pageView === PageViewTypes.COMM){
            // console.log("COMMUNITY LIST STATUS")
            statusInternal = 
            <div id="top5-statusbar">
                <Typography variant="h4">Community Lists</Typography>    
            </div>
        } 
    }
    else{
        // console.log("FOIAJSFIOJASIOFJOI")
            if (store.pageView === PageViewTypes.HOME){

                statusInternal = 
                    <div id="top5-statusbar">
                        <IconButton
                            disabled={true}
                            // color="primary" 
                            // aria-label="add"
                            // id="add-list-button"
                            // sx={{color:"black"}}
                            onClick={handleCreateNewList}
                        >
                            <AddIcon sx={{color: "gray", fontSize: 50}}  />
                        </IconButton> 
                        <Typography sx={{color: "gray"}} variant="h4">Your Lists</Typography>    
                    </div>
                }
            else{
                statusInternal = 
                <div id="top5-statusbar">
                    <Typography variant="h4"></Typography>
                </div>
            }
         }
        
    // console.log(statusInternal)
    // if (auth.isGuest && store.pageView === PageViewTypes.HOME){
    //     console.log("FKANMSIOFJAPIOFJ")
    // }
    


    return (
        statusInternal
    );
}

export default Statusbar;
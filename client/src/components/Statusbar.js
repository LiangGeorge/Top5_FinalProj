import { useContext } from 'react'
import { GlobalStoreContext } from '../store'
import { PageViewTypes} from '../store'
import { Typography } from '@mui/material'
import AuthContext from '../auth';
/*
    Our Status bar React component goes at the bottom of our UI.
    
    @author McKilla Gorilla
*/
function Statusbar() {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    {/* <div id="list-selector-heading"> */}
            {/* <Fab 
                color="primary" 
                aria-label="add"
                id="add-list-button"
                onClick={handleCreateNewList}
            >
                <AddIcon />
            </Fab> */}

    let statusInternal = ""
    let text="";
    if (store.currentList)
        text = store.currentList.name;

   
    // if (auth.isGuest && store.pageView === PageViewTypes.HOME){
    //     console.log("FKANMSIOFJAPIOFJ")
    // }



    return (
        <div id="top5-statusbar">
            <Typography variant="h4">{text}</Typography>
        </div>
    );
}

export default Statusbar;
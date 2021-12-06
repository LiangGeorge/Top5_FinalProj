import { useContext } from 'react';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router-dom'
import AuthContext from '../auth';
import { PageViewTypes} from '../store'
import { GlobalStoreContext } from '../store'

export default function SplashScreen() {
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);

    let buttonStyle = { backgroundColor:'#e3ee4f', color:"black"};
    const history = useHistory();

    const handleGuestClose = () =>{    
        auth.continueGuest()
        store.changeView(PageViewTypes.COMM)
               
    }


    return (
        
        <div id="splash-screen">
            <Typography id="splash-screen-text" sx={{ fontStyle: 'italic', fontWeight: 'bold'}}>
                The Top 5 Lister
                <Typography id="creator-text" sx={{ fontStyle: 'italic', fontWeight: 'bold'}}>By George Liang</Typography>
            </Typography>
            <div id="splash-screen-welc">
                <Typography sx={{fontWeight: 'bold', fontSize: 33}}> 
                Welcome to The Top 5 Lister!
                </Typography>
                <Typography sx={{fontWeight: 'bold', fontSize: 33}}>
                An application to view the latest and greatest Top 5 trending items
                </Typography>
                    
            </div>
            
            <Stack position="relative" width={'25%'}  ml={'70%'} spacing={"5%"}> 
                <Stack direction="row" justifyContent="space-between" spacing={"5%"}>
                    <Button fullWidth variant="contained" sx = {buttonStyle} onClick={() => history.push("/register/")}>Create Account</Button>
                    <Button fullWidth variant="contained" sx = {buttonStyle} onClick={() => history.push("/login")}>Login</Button>
                </Stack>
                <Button variant="contained" sx = {buttonStyle} onClick={handleGuestClose}>Continue As Guest</Button>
            </Stack>


        </div>
        
    )
}
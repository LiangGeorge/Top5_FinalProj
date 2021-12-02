import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useHistory } from 'react-router-dom'

export default function SplashScreen() {
    let buttonStyle = { backgroundColor:'#e3ee4f', color:"black"};
    const history = useHistory();
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
            <Stack width={'25%'} mt={"15%"} ml={'70%'} spacing={"5%"}> 
                <Stack direction="row" justifyContent="space-between" spacing={"5%"}>
                    <Button fullWidth="true" variant="contained" sx = {buttonStyle} onClick={() => history.push("/register/")}>Create Account</Button>
                    <Button fullWidth="true" variant="contained" sx = {buttonStyle} onClick={() => history.push("/login")}>Login</Button>
                </Stack>
                <Button variant="contained" sx = {buttonStyle}>Continue As Guest</Button>
            </Stack>


        </div>
        
    )
}
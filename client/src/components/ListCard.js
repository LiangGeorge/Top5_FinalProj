import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Accordion,Typography, Card, CardActions,CardContent, CardHeader,Stack, Link} from '@mui/material';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMore from '@mui/icons-material/ExpandMore'
import ExpandLess from '@mui/icons-material/ExpandLess'
import {ThumbUpOutlined, ThumbDownOutlined, DeleteOutlined} from '@mui/icons-material'
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const [expanded, setExpanded] = useState(false);
    // const { idNamePair } = props;
    const {top5List} = props;

    function toggleExpansion(){
        setExpanded(!expanded);
    }
    function handleLoadList(event, id) {
        if (!event.target.disabled) {
            // CHANGE THE CURRENT LIST
            store.setCurrentList(id);
        }
    }

    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        // setText(idNamePair.name)
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        store.markListForDeletion(id);
    }

    function handleOnBlur(event){
        let id = event.target.id.substring("list-".length);
        store.changeListName(id, text);
        toggleEdit();
    }
    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }
    let buttonStyle = {fontSize:35}
    let comments = ["FOANSIOFNAOSIFNOI","FOANSIOFNAOSIFNOI","FOANSIOFNAOSIFNOI","FOANSIOFNAOSIFNOI","FOANSIOFNAOSIFNOI","FOANSIOFNAOSIFNOI","FOANSIOFNAOSIFNOI","FOANSIOFNAOSIFNOI","FOANSIOFNAOSIFNOI"]

    let cardElement = 
    <Card key={top5List._id}sx={{borderRadius: 5,border:2}}>
        <CardHeader
       
        title={top5List.name}
        subheader="By: George Liang"
        action={
            <div id="buttonbox" > 
                <Stack direction="row" justifyContent="space-between" spacing={2}>
                    <IconButton >
                    <ThumbUpOutlined sx={buttonStyle}></ThumbUpOutlined>
                    </IconButton>

                    <Typography sx={{paddingTop:1, fontSize:25}}>8M</Typography>

                    <IconButton >
                    <ThumbDownOutlined sx={buttonStyle}></ThumbDownOutlined>
                    </IconButton>

                    <Typography sx={{paddingTop:1, fontSize:25}}>55K</Typography>

                    <IconButton onClick={(event)=>handleDeleteList(event,top5List._id)}>
                    <DeleteOutlined sx={buttonStyle} ></DeleteOutlined>
                    </IconButton>
                </Stack>
            </div>
              
        }
        >
        <IconButton >
            <ExpandLess></ExpandLess>
        </IconButton>   

        </CardHeader>
        {/* <CardContent>
        
        
        </CardContent> */}
         

        <Accordion 
            // id={idNamePair._id}
                // key={idNamePair._id} 
                elevation={0}
                sx={{
                    '&:before': {
                        display: 'none',
                    }
                }}
                expanded={expanded}>
            <AccordionSummary>

            </AccordionSummary> 
            
            <AccordionDetails>
                <Stack direction="row" justifyContent="space-between" spacing={2} >
                    <Box sx={{bgcolor:"#2b2e6f", borderRadius:"7px", width:"50%", color:"#cfab37"}} pl={2} pt={2} pb={2}>
                        <Stack spacing={1}>
                            {top5List.items.map((itemName,index) => (
                                <Typography key={"viewItem-"+index} sx={{fontSize:40}}>{(index + 1) + ". "+ itemName}</Typography>
                            ))}
                        </Stack>
                    </Box>
                    <Box sx={{width:"50%"}} >
                        <Stack>
                            <Box >
                                <Stack  spacing={0.5} sx={{ maxHeight:300, overflowY:"scroll"}}>
                                    {comments.map((itemName,index) => (
                                        <Box key={index} sx={{bgcolor:"#d3ae37", borderRadius:"7px", color:"black", border: 1}} pl={2}>
                                            <Typography sx={{marginTop:1,fontSize:13}}>{itemName}</Typography>
                                            <Typography sx={{fontSize:25}}>{
                                            "Lorem Ipsum is simply dummy text of the printing and typesetting industry." +
                                            "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,"
                                            
                                            }</Typography>
                                        </Box>
                                    ))}
                                </Stack>
                                
                            </Box>
                            <TextField variant="filled" label="Add Comment" sx={{ marginTop:1}}></TextField>
                        </Stack>
                    </Box>
                </Stack>
                
            </AccordionDetails>


        </Accordion>
      
          
        <Stack
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
        sx={{marginLeft:2,}}
        > 
        {/* <Typography sx={{ fontSize:15, width:"68%"}}>Published: Jan 5, 2019</Typography> */}
        <Link href={"/top5List/" + top5List._id } sx={{ width:"68%"}}>Edit</Link>
        <Typography sx={{ fontSize:15}}>Views: 1,234,567</Typography>
        <IconButton onClick={toggleExpansion}>
            {(expanded)? <ExpandLess></ExpandLess>: <ExpandMore></ExpandMore>}
        </IconButton>
        </Stack>

    </Card>
    // cardElement =
    //     <ListItem
    //         id={idNamePair._id}
    //         key={idNamePair._id}
    //         sx={{ marginTop: '15px', display: 'flex', p: 1 }}
    //         button
    //         onClick={(event) => {
    //             handleLoadList(event, idNamePair._id)
    //         }
    //         }
    //         style={{
    //             fontSize: '48pt',
    //             width: '100%'
    //         }}
    //     >
    //             <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
    //             <Box sx={{ p: 1 }}>
    //                 <IconButton onClick={handleToggleEdit} aria-label='edit'>
    //                     <EditIcon style={{fontSize:'48pt'}} />
    //                 </IconButton>
    //             </Box>
    //             <Box sx={{ p: 1 }}>
    //                 <IconButton onClick={(event) => {
    //                     handleDeleteList(event, idNamePair._id)
    //                 }} aria-label='delete'>
    //                     <DeleteIcon style={{fontSize:'48pt'}} />
    //                 </IconButton>
    //             </Box>
    //     </ListItem>

    // if (editActive) {
    //     cardElement =
    //         <TextField
    //             margin="normal"
    //             required
    //             fullWidth
    //             id={"list-" + idNamePair._id}
    //             label="Top 5 List Name"
    //             name="name"
    //             autoComplete="Top 5 List Name"
    //             className='list-card'
    //             onKeyPress={handleKeyPress}
    //             onChange={handleUpdateText}
    //             onBlur={handleOnBlur}
    //             defaultValue={idNamePair.name}
    //             inputProps={{style: {fontSize: 48}}}
    //             InputLabelProps={{style: {fontSize: 24}}}
    //             autoFocus
    //         />
    // }
    return (
        cardElement
    );
}

export default ListCard;
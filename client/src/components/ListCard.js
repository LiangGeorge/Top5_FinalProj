import { useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import { GlobalStoreContext } from '../store'
import AuthContext from '../auth';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Accordion,Typography, Card, Button, CardHeader,Stack, Link} from '@mui/material';
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
    const { auth } = useContext(AuthContext);
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [flopper, setFlopper] = useState(false);
    const [text, setText] = useState("");
    const [expanded, setExpanded] = useState(false);
    // const { idNamePair } = props;
    const {top5List} = props;
    

    //const history = useHistory();

    function toggleExpansion(){
        if (!expanded && top5List.datePublished !== null){
            top5List.views += 1;
            store.updateCurrentList(top5List)
        }
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

    function addLike(){
        if (auth.isGuest || top5List.likers.includes(auth.user.username)){
            return;
        }else{
            top5List.likers.push(auth.user.username);
            store.updateCurrentList(top5List)
            setFlopper(true)
        }
    }


    function addLike(){
        if (top5List.likers.includes(auth.user.username)){
            top5List.likers.splice(top5List.likers.indexOf(auth.user.username),1)
            
        }else if (top5List.dislikers.includes(auth.user.username)){
            top5List.likers.push(auth.user.username);
            top5List.dislikers.splice(top5List.dislikers.indexOf(auth.user.username),1)
        }else{
            top5List.likers.push(auth.user.username);
        }
        store.updateCurrentList(top5List)
        setFlopper(!flopper)
    }

    function addDislike(){
        if (top5List.dislikers.includes(auth.user.username)){
            top5List.dislikers.splice(top5List.dislikers.indexOf(auth.user.username),1)
            
        }else if (top5List.likers.includes(auth.user.username)){
            top5List.dislikers.push(auth.user.username);
            top5List.likers.splice(top5List.likers.indexOf(auth.user.username),1)
        }else{
            top5List.dislikers.push(auth.user.username);
        }
        store.updateCurrentList(top5List)
        setFlopper(!flopper)
    }

    function addComment(event){
        if (event.key == "Enter" && event.target.value.length !== 0){
            event.target.value=""
            top5List.comments.unshift({"body": text, "owner": auth.user.username})
            store.updateCurrentList(top5List)
            console.log("Reached Here")
            setText("")
        }
       
    }

    

    // function addDislike(){

    // }
    // function handleOnBlur(event){
    //     let id = event.target.id.substring("list-".length);
    //     store.changeListName(id, text);
    //     toggleEdit();
    // }
    // function handleKeyPress(event) {
    //     if (event.code === "Enter") {
    //         let id = event.target.id.substring("list-".length);
    //         store.changeListName(id, text);
    //         toggleEdit();
    //     }
    // }
    // function handleUpdateText(event) {
    //     setText(event.target.value);
    // }
    // let buttonStyle = {fontSize:35}
    let displayDate = null
    if (top5List.datePublished !== null){
        displayDate = new Date(top5List.datePublished).toDateString()
        displayDate = displayDate.split(" ")
        displayDate = displayDate[1] +" " + displayDate[2] + "," + displayDate[3];
    }
    
    let editOrPublished = (top5List.datePublished !== null)? 
    <Stack direction = "row" width="100%" justifyContent="left">
        <Typography sx={{ fontSize:15}}>{(top5List.ownerName !== undefined)?"Published: ": "Updated: "}</Typography>  
        <Typography sx={{ fontSize:15, width:"100%", color:"green"}}>{displayDate}</Typography>
    </Stack>
    : 
    <Link 
    // component="button"
    variant="body2"
    onClick={()=>store.setCurrentList(top5List._id)} sx={{ cursor:"pointer", width:"100%"}}>Edit</Link>;

    // console.log(typeof(Date.now()))
    let itemCard = null
        if (top5List.ownerUsername !== undefined){
            itemCard = top5List.items.map((itemName,index) => (
                <Typography key={"viewItem-"+index} sx={{fontSize:40}}>{(index + 1) + ". "+ itemName}</Typography>
            ))
        }else{
            itemCard = top5List.items.map((itemName,index) => (
                <div key={"card-div" + index}>
                    <Typography key={"viewItem-"+index} sx={{fontSize:30}}>{(index + 1) + ". "+ itemName["item"]}</Typography>
                    <Typography pl={5} key={"viewVotes-"+index} sx={{fontSize:15}}>{ "(" + itemName["votes"] + " Votes)"}</Typography>
                </div>
            ))
        }
        
        
    
    let cardElement = 
    <Card key={"listcard-" + top5List._id}sx={{bgcolor: (top5List.datePublished !== null)? "#d4d4f6 ": "#fffff1", borderRadius: 5,border:2}}>
        <CardHeader
       
        title={top5List.name}
        subheader={(top5List.ownerUsername !== undefined)?"By: " + top5List.ownerUsername : ""}
        action={
            <div id="buttonbox" > 
                <Stack direction="row" justifyContent="space-between" spacing={2} >
                    <IconButton disabled={auth.isGuest} onClick={addLike}>
                    <ThumbUpOutlined sx={{color: (auth.isGuest)? "gray" : ((top5List.likers.includes(auth.user.username))?"blue":"black") ,fontSize:35}}></ThumbUpOutlined>
                    </IconButton>

                    <Typography sx={{paddingTop:1, fontSize:25}}>{top5List.likers.length}</Typography>

                    <IconButton disabled={auth.isGuest} onClick={addDislike}>
                    <ThumbDownOutlined sx={{color: (auth.isGuest)? "gray" : ((top5List.dislikers.includes(auth.user.username)))?"red":"black" ,fontSize:35}}></ThumbDownOutlined>
                    </IconButton>

                    <Typography sx={{paddingTop:1, fontSize:25}}>{top5List.dislikers.length}</Typography>

                    <IconButton sx = {{visibility: (auth.isGuest || auth.user.username !== top5List.ownerUsername)? "hidden":""}} disabled={auth.isGuest || (auth.user.username !== top5List.ownerUsername)} onClick={(event)=>handleDeleteList(event,top5List._id)}>
                    <DeleteOutlined sx={{fontSize:35}} ></DeleteOutlined>
                    </IconButton>
                </Stack>
            </div>
              
        }
        >
        <IconButton >
            <ExpandLess></ExpandLess>
        </IconButton>   

        </CardHeader>
        
        
         

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
            
            <AccordionDetails sx={{bgcolor: (top5List.datePublished !== null)? "#d4d4f6 ": "#fffff1"}}>
                <Stack direction="row" justifyContent="space-between" spacing={2} >
                    <Box sx={{bgcolor:"#2b2e6f", borderRadius:"7px", width:"50%", color:"#cfab37"}} pl={2} pt={2} pb={2}>
                        <Stack spacing={1}>
                            {itemCard
                           }
                        </Stack>
                    </Box>
                    <Box sx={{width:"50%"}} >
                        <Stack>
                            <Box >
                                <Stack  spacing={0.5} sx={{ maxHeight:300, overflowY:"scroll"}}>
                                    {top5List.comments.map((comment,index) => (
                                        <Box key={"comment" + index} sx={{bgcolor:"#d3ae37", borderRadius:"7px", color:"black", border: 1}} pl={2}>
                                            <Typography sx={{marginTop:1,fontSize:13}}>{comment.owner}</Typography>
                                            <Typography sx={{fontSize:25}}>{comment.body}</Typography>
                                        </Box>
                                    ))}
                                </Stack>
                                
                            </Box>
                            <Stack>
                                <TextField  disabled={auth.isGuest || (top5List.datePublished === null)} onChange={(event) => setText(event.target.value)}  onKeyUp={(event) => addComment(event)} changevariant="filled" label="Add Comment"  sx={{ background:"white",marginTop:1}}></TextField>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
                
            </AccordionDetails>


        </Accordion>
      
          
        <Stack
        direction="row"
        justifyContent="left"
        alignItems="center"
        spacing={2}
        sx={{marginLeft:2,}}
        > 
        {/* <Typography sx={{ fontSize:15, width:"68%"}}>Published: Jan 5, 2019</Typography> */}
        {/* <Link 
            // component="button"
            variant="body2"
            onClick={()=>store.setCurrentList(top5List._id)} sx={{ cursor:"pointer", width:"100%"}}>Edit</Link> */}
        {editOrPublished}



        {/* <Typography onClick={()=>history.push("/top5List/" + top5List._id)} sx={{ fontStyle:"underline", fontSize:15, width:"100%"}}>Edit</Typography> */}
        {/* <Button sx={{width:"100%" ,textAlign:"left"}}width={"100%"} onClick={()=>history.push("/top5List/" + top5List._id)}>Edit</Button> */}
        {/* <a sx={{width:"100%" }} href="">Edit</a> */}
        <Stack direction = "row" >
            <Typography pt={1} sx={{fontSize:15 }}>{"Views: "}</Typography>
            <Typography pl={1} pt={1} pr={20}sx={{  color:"red", fontSize:15}}>{top5List.views}</Typography>
            <IconButton onClick={toggleExpansion}>
                {(expanded)? <ExpandLess></ExpandLess>: <ExpandMore></ExpandMore>}
            </IconButton>
        </Stack>

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
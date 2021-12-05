const Top5List = require('../models/top5list-model');
const User = require('../models/user-model')
const CommunityList = require('../models/community-model')

const SortingTypes = {
    NONE: "NONE",
    DATEA: "DATEA",
    DATED: "DATED",
    VIEWS: "VIEWS",
    LIKES: "LIKES",
    DISLIKES: "DISLIKES",
}
async function createNewCommList(listName){
    console.log("CREATING NEW COMM LIST: ");
    await Top5List.find({ name: {$regex: "^" + listName + "$", $options: "i"}, datePublished: {$ne: null}}, (err,Top5Lists) => {
        if (err){
            console.log(err)
            return
        }
        // console.log("REACHED HERE")
        // console.log(Top5Lists)
        let rankingDict = {}
        for (let top5list of Top5Lists){
            // console.log(top5list)
            let top5items = top5list.items
            for (let i = 0; i < top5items.length; i++){
                let itemToAdd = top5items[i]
                // console.log((5-i) + itemToAdd)
                if (itemToAdd in rankingDict){
                    rankingDict[itemToAdd] += (5-i)
                }else{
                    rankingDict[itemToAdd] = (5-i)
                }

            }
        }
        let rankingList = []
        for (let x in rankingDict){
            rankingList.push([x, rankingDict[x]])
        }
        // console.log(rankingList)

        rankingList.sort(function(x,y) {
            return y[1] - x[1]
        })
        // console.log(rankingList)
        top5 = rankingList.splice(0,5)
        // console.log(top5)
        let commListItems = []
        for (let x of top5){
            commListItems.push({ item: x[0], votes: x[1]})
        }

        let commBody = {
            name: listName,
            items: commListItems, //This method will determine this 
            views: 0,
            likers: [],
            dislikers: [],
            datePublished: new Date(),
            comments: [],
        }
        
        const communityList = new CommunityList(commBody)
        console.log(communityList)
        console.log("JUST LOGGED COMMUNITY LIST ")
        if (!communityList){
           return "ERROR OCCUR: NO COMMUNITY LIST CREATED"
        }

        communityList.save()
           
    })
    // CommunityList.
}
async function commListExist(listName){
    await CommunityList.exists({ name: {$regex: "^" + listName + "$", $options: "i"}}, (err,ex) =>{
        if (err){
            console.log(err)
            return
        }else{
            console.log("Does COMM list exist: " + ex);
            return ex
            
        }
        
    })

}
// updateCommunityList = async (req, res) => {

//     const body = req.body
//     console.log("updateCommunityList: " + JSON.stringify(body))
//     if (!body){
//         return res.status(400).json({
//             success: false,
//             error: 'You must provide a body to update',
//         })
//     }
//     CommunityList.findOne({_id: req.params.id}, (err, communityList) => {
//         communityList.name = body.name;
//         communityList.items = body.items;
//         communityList.views = body.views;
//         communityList.likers = body.likers;
//         communityList.datePublished = body.datePublished
//         communityList.dislikers = body.dislikers
//         communityList.comments = body.comments

//     })
//     communityList.save()
//     .then(() => {
//         console.log("SUCCESS!!!");
//         return res.status(200).json({
//             success: true,
//             id: top5List._id,
//             message: 'Top 5 List updated!',
//         })
//     })
//     .catch(error => {
//         console.log("FAILURE: " + JSON.stringify(error));
//         return res.status(404).json({
//             error,
//             message: 'Top 5 List not updated!',
//         })
//     })
// }

async function recomputeCommunityList(listName){
    await Top5List.find({ name: {$regex: "^" + listName + "$", $options: "i"}, datePublished: {$ne: null}}, (err,Top5Lists) => {
        if (err){
            console.log(err)
            return
        }
        // console.log("REACHED HERE")
        // console.log(Top5Lists)
        let rankingDict = {}
        for (let top5list of Top5Lists){
            // console.log(top5list)
            let top5items = top5list.items
            for (let i = 0; i < top5items.length; i++){
                let itemToAdd = top5items[i]
                // console.log((5-i) + itemToAdd)
                if (itemToAdd in rankingDict){
                    rankingDict[itemToAdd] += (5-i)
                }else{
                    rankingDict[itemToAdd] = (5-i)
                }

            }
        }
        let rankingList = []
        for (let x in rankingDict){
            rankingList.push([x, rankingDict[x]])
        }
        // console.log(rankingList)

        rankingList.sort(function(x,y) {
            return y[1] - x[1]
        })
        // console.log(rankingList)
        top5 = rankingList.splice(0,5)
        // console.log(top5)
        let commListItems = []
        for (let x of top5){
            commListItems.push({ item: x[0], votes: x[1]})
        }
        console.log(commListItems)
        console.log(rankingDict)


        console.log(listName)
        async function comm() {
            await CommunityList.findOne({name: {$regex: "^" + listName + "$", $options: "i"}}, (err,commListPrev) =>{
                
                commListPrev.name= commListPrev.name,
                commListPrev.items= commListItems, //This method will determine these recomputed items
                commListPrev.views= commListPrev.views,
                commListPrev.likers= commListPrev.likers,
                commListPrev.dislikers= commListPrev.dislikers,
                commListPrev.datePublished= new Date(),
                commListPrev.comments= commListPrev.comments,
                commListPrev.save()
              
                
            })
        }
        comm()
        
    })
}


createTop5List = (req, res) => {
    
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Top 5 List',
        })
    }
    console.log(body)
    const top5List = new Top5List(body);
    console.log("creating top5List: " + JSON.stringify(top5List));
    if (!top5List) {
        return res.status(400).json({ success: false, error: err })
    }
    
    top5List
        .save()
        .then(() => {
          
            return res.status(201).json({
                success: true,
                top5List: top5List,
                message: 'Top 5 List Created!'
            })
        })
        .catch(error => {
            return res.status(400).json({
                error,
                message: 'Top 5 List Not Created!'
            })
        })
}

updateTop5List = async (req, res) => {
    const body = req.body
    console.log("updateTop5List: " + JSON.stringify(body));
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

        if (body.ownerUsername === undefined){
            const body = req.body
        console.log("updateCommunityList: " + JSON.stringify(body))
        if (!body){
            return res.status(400).json({
                success: false,
                error: 'You must provide a body to update',
            })
        }
        CommunityList.findOne({_id: req.params.id}, (err, communityList) => {
            communityList.name = body.name;
            communityList.items = body.items;
            communityList.views = body.views;
            communityList.likers = body.likers;
            communityList.datePublished = body.datePublished
            communityList.dislikers = body.dislikers
            communityList.comments = body.comments
            communityList.save()
            .then(() => {
                console.log("SUCCESS!!!");
                return res.status(200).json({
                    success: true,
                    id: communityList._id,
                    message: 'Top 5 List updated!',
                })
            })
            .catch(error => {
                console.log("FAILURE: " + JSON.stringify(error));
                return res.status(404).json({
                    error,
                    message: 'Top 5 List not updated!',
                })
            })

        })
        
    }else{


        Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
            console.log("top5List found: " + JSON.stringify(top5List));
            if (err) {
                return res.status(404).json({
                    err,
                    message: 'Top 5 List not found!',
                })
            }
            // console.log(body.ownerEmail)
            // if (top5List.ownerEmail === userEmail){
                console.log("Curent List Views: " + top5List.views)
                console.log("Current Date Published: " + top5List.datePublished)
                let noViews = (body.views === 0) && (body.datePublished!== null) 
                
                //If a list has no views and it has a date published check to see if a community list exists. If it does exist, recompute lists, else make a new one
                console.log("NO VIEWS VALUE: " + noViews) 
                top5List.name = body.name
                top5List.items = body.items
                top5List.views = body.views
                top5List.likers = body.likers
                top5List.datePublished = body.datePublished
                top5List.dislikers = body.dislikers
                top5List.comments = body.comments
                top5List
                    .save()
                    .then(() => {
                        console.log("Reached Here")
                        // //If a community list exists for the list being updated and its a published one, recompute community lists
                        // async function ex(){
                        //     if (noViews){
                        //         let commListExists = await commListExist(body.name)
                        //         console.log("RETURN VALUE FROM COMM " + commListExists)
                        //         //Recompute Community List on Update 
                        //         if (commListExists){
                        //             console.log("ATTEMPTING TO UPDATE")
                        //             await recomputeCommunityList(top5List.name)
                        //         }else{
                        //             console.log("ATTEMPTING TO CREATE A NEW COMMUNITY LIST")
                        //             await createNewCommList(top5List.name)
                        //         }
                        //         //
                        //     }
                        // }
                        // ex()
                        if (noViews){
                            async function exi(){
                                await CommunityList.exists({ name: {$regex: "^" + body.name + "$", $options: "i"}}, (err,ex) =>{
                                    console.log("DOES " + body.name + " EXIST: " + ex)
                                    if (err){
                                        console.log(err)
                                        return "ERROR"
                                    }else{
                                        if (ex){
                                            console.log("ATTEMPTING TO UPDATE")
                                            async function upd(){
                                                await recomputeCommunityList(top5List.name)
                                            }
                                            upd()
                                            
                                        }else{
                                            async function cre(){
                                                await createNewCommList(top5List.name)
                                            }
                                            cre()
                                        }
                                        //
                                    }
                                    
                                })
                            }
                            exi()
                        }

                        
                        
                            
            
                        // recomputeCommunityList(top5List.name)
                        console.log("SUCCESS!!!");
                        return res.status(200).json({
                            success: true,
                            id: top5List._id,
                            message: 'Top 5 List updated!',
                        })
                    })
                    .catch(error => {
                        console.log("FAILURE: " + JSON.stringify(error));
                        return res.status(404).json({
                            error,
                            message: 'Top 5 List not updated!',
                        })
                    })
            // }else{
            //     return res.status(401).json({ success: false, error: err });
            // }
            
        })
    }
}

checkExist = async (req, res) =>{

    searchObj = {$regex:"^" + req.query.name + "$" , $options:"i"}
    console.log("REQUEST QUERY NAME: " + req.query.name)
    console.log(req.query)
    // console.log(req)
    await Top5List.exists({ name: searchObj, ownerUsername: req.query.username} , (err,ex) => {
        console.log("CHECKING EXIST OVER HERE")
        if (err){
            console.log("error out")
            console.log(err)
            return res.status(404).json({
                err,
                message: 'Error Querying',
            })
        }else{
            console.log("PRINTING EXIST: "+  ex)
            return res.status(200).json({ success: true, data:ex })
        }
    })
}
deleteTop5List = async (req, res) => {

    let userObject = await User.findById({ _id: req.userId}, (err) => {
        if (err){
            return res.status(400).json({success: false, error: err})
        }
    })
    console.log(userObject)

    let userEmail = userObject.email
    
    Top5List.findById({ _id: req.params.id }, (err, top5List) => {
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }
       

        if (top5List.ownerEmail === userEmail){
        
        try{
            Top5List.countDocuments({ name: {$regex:"^" + top5List.name + "$" , $options:"i"} }, function (err, count) {
                //If this is the last list of this name that we are deleting then 
                
                if (err){
                    console.log(err)
                    return res.status(404).json({
                        err,
                        message: 'An Error Occurred',
                    })
                }
                if (count == 1){    
                    console.log("ATTEMPTING DELETE")
                    console.log("We wanna delete here")
                    CommunityList.deleteOne({ name: {$regex:"^" + top5List.name + "$", $options:"i"}} ,(err) => {
                        if (err){
                            console.log(err)
                            return res.status(404).json({
                                err,
                                message: 'An Error Occurred',
                            })
                        }
                    })
                //     CommunityList.findOneAndDelete({ name: {$regex:"^" + top5List.name + "$", $options:"i"}} , () => {
                //         return res.status(200).json({ success: true, data: top5List })
                //     }
                // ).catch(err => console.log(err))
    
                }
                Top5List.findOneAndDelete({ _id: req.params.id }, () => {
                    if (count != 1){
                        recomputeCommunityList(top5List.name)
                    }
                    return res.status(200).json({ success: true, data: top5List })

                }).catch(err => console.log(err))

                

            
            }).catch(err => console.log(err)); 
        }catch(error){
            console.log(error)
        }
        

            
        
        }else{
            return res.status(401).json({ success: false, error: err });
        }
    })
}

getTop5ListById = async (req, res) => {
    
    let userObject = await User.findById({ _id: req.userId}, (err) => {
        if (err){
            return res.status(400).json({success: false, error: err})
        }
    })
    //console.log(userObject)

    // let userEmail = userObject.email

    await Top5List.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        // if (userEmail === list.ownerEmail){
            return res.status(200).json({ success: true, top5List: list })
        // }else{
        //     return res.status(401).json({ success: false, error: err });
        // }
    }).catch(err => console.log(err))
}
getTop5Lists = async (req, res) => {
    console.log(req.query)
    let username = null
    if (req.query.username !== undefined){
        username = req.query.username;
    }
       
    let sortStr = req.query.sort;
    console.log(sortStr)
    let sortObj = null;
    /* DATEA: "DATEA",
    DATED: "DATED",
    VIEWS: "VIEWS",
    LIKES: "LIKES",
    DISLIKES: "DISLIKES",*/
    switch (sortStr) {
        case SortingTypes.NONE: 
            sortObj = {
               
            }
            break;
        case SortingTypes.DATEA:
            //ALl lists and any list names matching the text
            sortObj = {
               datePublished: "desc"
            }
            break
        case SortingTypes.DATED:
            //ALl lists and any list names matching the text
            sortObj = {
               datePublished: 'asc'
            }
            
            break
        case SortingTypes.VIEWS:
            //User has to match the searchText
            sortObj = {
               views: 'desc'
            }
            break
        case SortingTypes.LIKES:
            //An entirely different method has to be called her. Get Community lists. 
            sortObj = {
               likers:-1
            }
            break
        case SortingTypes.DISLIKES:
            //An entirely different method has to be called her. Get Community lists. 
            sortObj = {
               dislikers:-1
            }
            break
        default:
            sortObj = {
            }
    }
    console.log(sortObj)
    // let filterUsername = req.query.filterUsername;
    let filtEx = req.query.filterExactMatch === "true";
    if (username === null){
        //Retrieve Community Lists here 
        let filterText = (req.query.filter.length != 0)? "^" + req.query.filter + ".*" : ".*";
        await CommunityList.find({ name: {$regex: filterText, $options: 'i'}},null,{sort: sortObj}, (err, top5Lists) => {
            if (err){
                return res.status(400).json({ success: false, error: err })
            }
            return res.status(200).json({ success: true, data: top5Lists})
        }).catch(err => console.log(err))

    }else{
        if (!filtEx){
            let filterText = (req.query.filter.length != 0)? "^" + req.query.filter + ".*" : ".*";
            if (username.length !== 0){
                await Top5List.find({ name: {$regex: filterText, $options: 'i'}, ownerUsername: username},null,{sort: sortObj}, (err, top5Lists) => {
                    if (err){
                        return res.status(400).json({ success: false, error: err })
                    }
                    return res.status(200).json({ success: true, data: top5Lists})
                }).catch(err => console.log(err))
            }
            else{
                await Top5List.find({ name: {$regex: filterText, $options: 'i'} ,datePublished: {$ne: null}},null,{sort: sortObj}, (err, top5Lists) => {
                    if (err) {
                        return res.status(400).json({ success: false, error: err })
                    }
                
                    return res.status(200).json({ success: true, data: top5Lists })
                }).catch(err => console.log(err))
            }
        }else{
            //We will be filtering this differently
            
            // console.log(username)
            // console.log("reached filtering differntly")
            await Top5List.find({ ownerUsername: {$regex: "^" + username + "$" , $options:"i"}, datePublished: {$ne: null}},null,{sort: sortObj}, (err, top5Lists) => {
                if (err){
                    return res.status(400).json({ success: false, error: err })
                }
                return res.status(200).json({ success: true, data: top5Lists})
            }).catch(err => console.log(err))
        }
    }
    
}

getTop5ListPairs = async (req, res) => {
    console.log("Retrieving top5list pairs")
    console.log(req.params.email)
    await Top5List.find({ ownerEmail: req.params.email}, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!top5Lists) {
            console.log("!top5Lists.length");
            return res
                .status(404)
                .json({ success: false, error: 'Top 5 Lists not found' })
        }
        else {
            // PUT ALL THE LISTS INTO ID, NAME PAIRS
            let pairs = [];
            for (let key in top5Lists) {
                let list = top5Lists[key];
                let pair = {
                    _id: list._id,
                    name: list.name
                };
                pairs.push(pair);
            }
            return res.status(200).json({ success: true, idNamePairs: pairs })
        }
    }).catch(err => console.log(err))
}



module.exports = {
    createTop5List,
    updateTop5List,
    deleteTop5List,
    getTop5Lists,
    checkExist,
    getTop5ListPairs,
    getTop5ListById,
}
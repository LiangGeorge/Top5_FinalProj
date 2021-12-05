const Top5List = require('../models/top5list-model');
const User = require('../models/user-model')

const SortingTypes = {
    NONE: "NONE",
    DATEA: "DATEA",
    DATED: "DATED",
    VIEWS: "VIEWS",
    LIKES: "LIKES",
    DISLIKES: "DISLIKES",
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


    // let userObject = await User.findById({ _id: req.userId}, (err) => {
    //     if (err){
    //         return res.status(400).json({success: false, error: err})
    //     }
    // })
    // console.log(userObject)

    // let userEmail = userObject.email

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
            console.log(ex)
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
        Top5List.findOneAndDelete({ _id: req.params.id }, () => {
            return res.status(200).json({ success: true, data: top5List })
        }).catch(err => console.log(err))
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
    let username = req.query.username;
    let sortStr = req.query.sort;
    console.log(req.query.username.length)
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
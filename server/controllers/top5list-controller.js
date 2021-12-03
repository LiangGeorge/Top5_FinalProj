const Top5List = require('../models/top5list-model');
const User = require('../models/user-model')
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


    let userObject = await User.findById({ _id: req.userId}, (err) => {
        if (err){
            return res.status(400).json({success: false, error: err})
        }
    })
    // console.log(userObject)

    let userEmail = userObject.email

    Top5List.findOne({ _id: req.params.id }, (err, top5List) => {
        console.log("top5List found: " + JSON.stringify(top5List));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Top 5 List not found!',
            })
        }
        // console.log(body.ownerEmail)
        if (top5List.ownerEmail === userEmail){
            top5List.name = body.name
            top5List.items = body.items
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
        }else{
            return res.status(401).json({ success: false, error: err });
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

    let userEmail = userObject.email

    await Top5List.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        if (userEmail === list.ownerEmail){
            return res.status(200).json({ success: true, top5List: list })
        }else{
            return res.status(401).json({ success: false, error: err });
        }
    }).catch(err => console.log(err))
}
getTop5Lists = async (req, res) => {
    await Top5List.find({}, (err, top5Lists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        // if (!top5Lists.length) {
        //     return res
        //         .status(404)
        //         .json({ success: false, error: `Top 5 Lists not found` })
        // }
        //console.log(top5Lists)
        return res.status(200).json({ success: true, data: top5Lists })
    }).catch(err => console.log(err))
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
    getTop5ListPairs,
    getTop5ListById
}
const express  = require('express')
const router = express.Router();
const {check,validationResult} = require('express-validator')

const Article = require('../module/Article')

const { ObjectID } = require('mongodb');

router.get('/',(req,res) => {
    Article.find({},{title:true,_id:true,shortDescription:true}, function(err, users) {
        if(err)
            return res.status(400).json({errors:[{msg:err.message}]});
            
        return res.status(200).json({data:users});
    });
});

router.post('/data',(req,res) => {
    const {id} = req.body;
    Article.find({"_id":new ObjectID(id)},{title:true,videoLink:true,description:true}, function(err, user) {
        if(err)
            return res.status(400).json({errors:[{msg:err.message}]});

        if(!user)
            return res.status(400).json({errors:[{msg:"No Data Found"}]});

        return res.status(200).json({data:user[0]});
     });
});

router.post('/add',[
    check("title","Title is required").not().isEmpty(),
    check("shortDescription" ,"Short Description is required").not().isEmpty(),
    check("description" ,"Full Description is required").not().isEmpty()
],async (req,res)=>{

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()});
    } 

    const {title,description,shortDescription,videoLink} = req.body;

    try{
        let data = await Article.findOne({title});
        if(data){
            res.status(400).json({errors:[{msg:"Same Title name article already exists"}]});
        }

        data = new Article({
            title,
            description,
            shortDescription,
            videoLink
        });

        await data.save();

    // console.log(req.body);
    res.status(200).json({msg:"Article added"});

    }catch(error){
        console.error(error.message);
        res.status(500).send("Server Down");  
    }
    
    
});

module.exports = router;
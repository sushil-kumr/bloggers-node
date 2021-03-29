const express  = require('express')
const router = express.Router();
const {check,validationResult} = require('express-validator')

const Menu = require('../module/Menu')
const Checkout = require('../module/Checkout')

const { ObjectID } = require('mongodb');

const data={
    pizza:[]
}

router.get('/',(req,res) => {
    const pizzaData = [1,2,3,4,5].map(item=>{
        return {
            name:"Pizza " +item,
            desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            size:100*item+" gm "+100*item+" cm",
            price:100*item,
            image:"https://images.all-free-download.com/images/graphicthumb/pizza_02_hd_pictures_167413.jpg"
        }
    })
    const drinkData = [1,2,3,4,5].map(item=>{
        return {
            name:"Drink " +item,
            desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            size:item+" liter ",
            price:10*item,
            image:"https://images.unsplash.com/photo-1536935338788-846bb9981813?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Y29ja3RhaWx8ZW58MHx8MHw%3D&ixlib=rb-1.2.1&w=1000&q=80"
        }
    })
    const sushiData = [1,2,3,4,5].map(item=>{
        return {
            name:"Sushi " +item,
            desc:"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
            size:10*item+" gm "+10*item+" cm",
            price:50*item,
            image:"https://wallpaperaccess.com/full/188358.jpg"
        }
    })
    res.status(200).json({pizzaData:pizzaData,drinkData:drinkData,sushiData:sushiData,discountImages:[{imageUrl:"https://designshack.net/wp-content/uploads/placeholder-image.png"},{imageUrl:"https://designshack.net/wp-content/uploads/placeholder-image.png"},{imageUrl:"https://designshack.net/wp-content/uploads/placeholder-image.png"}]});
});


router.post('/data',(req,res) => {
    // const {id} = req.body;
    // Article.find({"_id":new ObjectID(id)},{title:true,videoLink:true,description:true}, function(err, user) {
    //     if(err)
    //         return res.status(400).json({errors:[{msg:err.message}]});

    //     if(!user)
    //         return res.status(400).json({errors:[{msg:"No Data Found"}]});

    //     return res.status(200).json({data:user[0]});
    //  });
});

router.post('/add',[
    check("title","Title is required").not().isEmpty(),
    check("shortDescription" ,"Short Description is required").not().isEmpty(),
    check("description" ,"Full Description is required").not().isEmpty()
],async (req,res)=>{

    // const errors = validationResult(req);

    // if(!errors.isEmpty()){
    //     return res.status(400).json({errors:errors.array()});
    // } 

    // const {title,description,shortDescription,videoLink} = req.body;

    // try{
    //     let data = await Article.findOne({title});
    //     if(data){
    //         res.status(400).json({errors:[{msg:"Same Title name article already exists"}]});
    //     }

    //     data = new Article({
    //         title,
    //         description,
    //         shortDescription,
    //         videoLink
    //     });

    //     await data.save();

    // // console.log(req.body);
    // res.status(200).json({msg:"Article added"});

    // }catch(error){
    //     console.error(error.message);
    //     res.status(500).send("Server Down");  
    // }
    
    
});

module.exports = router;
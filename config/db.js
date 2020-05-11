const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');

mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useCreateIndex', true);

const connectDB = async() => {
    try{
        await mongoose.connect(db);
        console.log("Database Connected");
    }catch(error){
        console.error(error.message);
        process.exit(1);
        
    }
}


module.exports = connectDB;
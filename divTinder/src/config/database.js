const mongoose = require('mongoose');
const connectToDB = async () => {
    
        await mongoose.connect('mongodb+srv://nithyaganeshdev:Nithyaganesh%40123@mycluster.sr1w4.mongodb.net/devTinder');
     
};
module.exports=connectToDB;
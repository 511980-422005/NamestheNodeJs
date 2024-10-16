function auth (req,res,next){
var {token} = req.query;
if(token == '123'){
    
    console.log("Authorized ");
    next();
}
else{
    res.status(500).send("Sorry !");
}

}
module.exports = {
    auth,
}
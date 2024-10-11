const auth = (req,res,next)=>{
var {token} = req.query;
if(token == '123'){
    next();
}
else{
    res.status(500).send("Sorry !");
}

}
module.exports = {
    auth,
}
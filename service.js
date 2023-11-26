const service=async(req,res)=>{

    console.log('body =>>>>',JSON.stringify(req.body));
    try {
       res.status(200).send(req.body)
    } catch (error) {
       console.log('Event error',error);  
    }

}

module.exports=service;
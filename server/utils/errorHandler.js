const errorHandler = (err,req,res,next) =>{
  const statuscode = res.statusCode ? res.statusCode : 500;
  console.log("Error : ",err.message);
  res.status(statuscode); 
  return res.json({
    message : err.message
  });
  next();
}

export default errorHandler;
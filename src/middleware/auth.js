const ErrorHander = require('../../utils/errorhander');
const catchAsyncErrors = require("./catchAsyncErrors");
const jwt = require("jsonwebtoken");
const User = require("../models/myuser");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;
  
// let data = await User.find({});
// console.log(data);
// let array = []

// data.forEach((order) => {
//   let totalprice = order.role;

//   array.push(totalprice);
// });
// console.log(array);

// for(i=0; i<=array.length; i++){
//   if(array[i] == 'admin'){
//     console.log("l");
//   }
// }
  

  if (!token) {
    console.log("Please Login to access this resource");
    return res.redirect('/login')
    // return next(new ErrorHander("Please Login to access this resource", 401));
  }
  
  const decodedData = jwt.verify(token, process.env.JWT_SECRET);
  
  req.user = await User.findById(decodedData.id);

  next();
  
});

exports.authorizeRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHander(
          `Role: ${req.user.role} is not allowed to access this resouce `,
          403
        )
      );
    }

    next();
  };
  
};

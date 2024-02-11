const User = require('./../models/userModel');
const CustomError = require('./../utils/CustomError');
const catchAsync = require('./../utils/catchAsync');
const handler = require('./handler');

const filterBody = (body, ...allowedFields) => {
  let ret = {};
  for (const key in body) {
    if (allowedFields.includes(key)) {
      ret[key] = body[key];
    }
  }
  return ret;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.body.password || req.body.passwordConfirm) {
    return next(new CustomError("you aren't allowed to change password", 400));
  }

  const filteredBody = filterBody(req.body, 'name', 'email', 'photo');

  const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: { user },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'route not defined',
  });
};

exports.getAllUsers = handler.getAll(User);
exports.getUser = handler.getOne(User);
exports.updateUser = handler.updateOne(User);
exports.deleteUser = handler.deleteOne(User);

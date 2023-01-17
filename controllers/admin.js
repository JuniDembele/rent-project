const { User } = require("../models/user.model");

const seedSuperAdmin = async () => {
  const superAdmin = await User.findOne({
    email: "theadminjunidembele@gmail.com",
  });

  if (superAdmin) {
    return console.log("Super Admin created sucessfelly");
  }
  seededAdmin = await User({
    isAdmin: true,
    password: process.env.ADMINPASSWORD,
    username: process.env.SUPERADMINEMAIL,
    fullName: process.env.SUPERADMINFULLNAME,
    phone: "String",
  });

  seededAdmin.save();
  console.log("Super Admin created with email" + seededAdmin > toJson().email);
  return seededAdmin;
};

seedSuperAdmin();
module.exports = { seedSuperAdmin };

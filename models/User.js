const { DataTypes } = require("sequelize");
const sequelize = require("./db");
const Video = require("./Video");

const User = sequelize.define("User", {
  name: {
    type: DataTypes.STRING,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  emailConfirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  varificationCode: {
    type: DataTypes.STRING,
  },
  forgotpassConfirmed: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  accountType: {
    type: DataTypes.STRING,
  },
  address: {
    type: DataTypes.STRING,
  },
  phoneNumber: {
    type: DataTypes.STRING,
  },
  picture: {
    type: DataTypes.STRING,
    defaultValue: "default.png",
  },
  avgRating: {
    type: DataTypes.FLOAT,
    defaultValue: 0,
  },
  totalRatingNum: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalViews: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  numTips: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  totalTipsAmount: {
    type: DataTypes.DOUBLE,
    defaultValue: 0,
  },
  numVideos: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
  about: {
    type: DataTypes.TEXT,
  },
  accessible: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
  },
  createdBy: {
    type: DataTypes.INTEGER,
  },
  updatedBy: {
    type: DataTypes.INTEGER,
  },
  isApproved: {
    type: DataTypes.BOOLEAN,
  },
  approvedBy: {
    type: DataTypes.INTEGER,
  },
  isDeleted: {
    type: DataTypes.BOOLEAN,
  },
  token: {
    type: DataTypes.STRING,
  },
});

User.belongsToMany(User, {
  as: "Follower",
  foreignKey: "followingId",
  through: "following",
});
User.belongsToMany(User, {
  as: "Followed",
  foreignKey: "followedId",
  through: "following",
});

User.hasMany(Video);
Video.belongsTo(User);

module.exports = User;

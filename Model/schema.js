import { DataTypes } from "sequelize";
import sequelize from "./db.js";
import { timeStamp } from "console";
 const login = sequelize.define("login", {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,  
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  tableName:'users',
  timeStamps:true,
});
export default login;



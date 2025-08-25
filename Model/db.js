import { Sequelize } from "sequelize";

const sequelize = new Sequelize("login", "postgres", "laksh123", {
  host: "localhost",
  dialect: "postgres",
});
export default sequelize;


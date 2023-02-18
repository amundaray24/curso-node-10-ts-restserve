import { DataTypes } from "sequelize";

import database from "../configurations/rest.server.database.config";

const User = database.define('User', {
  name: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  deleted: {
    type: DataTypes.BOOLEAN
  }
});

export default User;
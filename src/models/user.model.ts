import { CreationOptional, DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import database from "../configurations/rest.server.database.config";

class UserModel extends Model<InferAttributes<UserModel>,InferCreationAttributes<UserModel>> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare deleted: CreationOptional<boolean>;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
}

UserModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    createdAt: {
      field: 'audit_created_date',
      type: DataTypes.DATE,
    },
    updatedAt: {
        field: 'audit_updated_date',
        type: DataTypes.DATE,
    }
  },
  {
    sequelize: database,
    tableName: 'Users'
  }
);

export default UserModel;
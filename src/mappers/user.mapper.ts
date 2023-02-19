import dateFormatted from 'date-and-time';

import User from '../entities/users/user.entity';
import UserModel from '../models/user.model';

export const mapUserResponse = (userModel: UserModel) => {
  
  const {id,name,email,deleted,updatedAt,createdAt} = userModel;

  const userResponse : User = {
    id,
    name,
    email,
    deleted,
    createdAt : dateFormatted.format(createdAt,`YYYY-MM-DDTHH:mm:ssZ`),
    updatedAt : dateFormatted.format(updatedAt,`YYYY-MM-DDTHH:mm:ssZ`)
  }

  return userResponse;
}
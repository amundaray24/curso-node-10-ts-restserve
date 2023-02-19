import { Request, Response } from 'express';

import loggerHelper from '../helpers/logger.helper';
import UserModel from '../models/user.model';

import { mapUserResponse } from '../mappers/user.mapper';
import { generateResponseError } from '../helpers/errors.generator.helper';
import { requestPaginatorGenerator, responsePaginationGenerator } from '../helpers/pagination.generator.helper';

export const createUser = async (request: Request, response: Response) => {
  const {body} = request;

  try {

    const emailValidation = await UserModel.count({where: {email : body.email}});

    if (emailValidation > 0) {
      return generateResponseError(response,400,'EMAIL ALREADY EXIST');
    }

    const user = new UserModel(body);
    await user.save();
    response.status(201).send({data: mapUserResponse(user)});
  } catch (error) {
    loggerHelper.error('ERROR CREATING USER - ', error)
    generateResponseError(response,400,'ERROR CREATING USER');
  }
}

export const listUsers = async (request: Request, response: Response) => {

  const {page, pageSize, order} = request.query;

  const requestPagination = requestPaginatorGenerator(Number(page),Number(pageSize));

  const totalUsers = await UserModel.count({where: {deleted: false}});
  const users = await UserModel.findAll({where: {deleted: false}, order: [['id', `${order ? order : 'ASC'}`]] ,offset: requestPagination.skip, limit: requestPagination.limit});


  if (users.length > 0) {
    const pagination = responsePaginationGenerator(requestPagination,users.length,totalUsers);
    const usersResponse = users.map(user => mapUserResponse(user));
    return response.status(200).json({data: usersResponse, pagination});
  }
  return response.sendStatus(204);
}

export const getUser =  async (request: Request, response: Response) => {
  const {userId} = request.params;

  const user = await UserModel.findByPk(userId);
  if (user) {
    return response.status(200).json({data: mapUserResponse(user)});
  } else {
    generateResponseError(response,404,'RESOURCE NOT FOUND');
  }

}

export const modifyUser = async (request: Request, response: Response) => {
  const {userId} = request.params;
  const { body } = request;

  const user = await UserModel.findByPk(userId);

  if (user) {

    if (body.email) {
      const emailValidation = await UserModel.count({where: {email : body.email}});
  
      if (user.email !== body.email && emailValidation > 0) {
        return generateResponseError(response,400,'EMAIL ALREADY EXIST');
      }
    } 

    user.update(body);
    return response.sendStatus(204);
  } else {
    generateResponseError(response,404,'RESOURCE NOT FOUND');
  }
}

export const deleteUser = async (request: Request, response: Response) => {
  const {userId} = request.params;

  const user = await UserModel.findByPk(userId);
  if (user) {
    user.update({
      deleted: true
    });
    return response.sendStatus(204);
  } else {
    generateResponseError(response,404,'RESOURCE NOT FOUND');
  }
}
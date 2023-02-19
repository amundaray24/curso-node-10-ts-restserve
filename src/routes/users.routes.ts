import { Router } from 'express';
import { body, param, query } from 'express-validator';

import { createUser, deleteUser, getUser, listUsers, modifyUser } from '../controllers/users.controller';
import { validateFields } from '../middleware/fields.validator.middleware';

const router = Router();

router.post('/', [
  body('name').notEmpty().isLength({min:3}),
  body('email').notEmpty().isEmail(),
  validateFields
], createUser);

router.get('/', [
  query('page').optional().isInt({gt:0}),
  query('pageSize').optional().isInt({gt:4}),
  query('order').optional().isIn(['ASC','DESC']),
  validateFields
], listUsers);

router.get('/:userId', [
  param('userId').notEmpty().isNumeric(),
  validateFields
], getUser);

router.patch('/:userId', [
  param('userId').notEmpty().isNumeric(),
  validateFields
], modifyUser);

router.delete('/:userId', [
  param('userId').notEmpty().isNumeric(),
  validateFields
], deleteUser);

export default router;
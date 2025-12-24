import { body, query, param } from "express-validator";

export const createItemValidation = [
  body("name").isString().withMessage("Name must be a string"),
  body("price").isNumeric().withMessage("Price must be a number"),
  body("is_active").optional().isBoolean().withMessage("is_active must be boolean"),
];

export const updateItemValidation = [
  body("name").optional().isString().withMessage("Name must be a string"),
  body("price").optional().isNumeric().withMessage("Price must be a number"),
  body("is_active").optional().isBoolean().withMessage("is_active must be boolean"),
];

export const listItemsValidation = [
  query("is_active").optional().isBoolean().withMessage("is_active must be boolean"),
  query("page").optional().isInt({ min: 0 }).withMessage("page must be >= 0"),
  query("pageSize").optional().isInt({ min: 1 }).withMessage("pageSize must be >= 1"),
  query("sortOrder").optional().isIn(["asc", "desc"]).withMessage("sortOrder must be 'asc' or 'desc'"),
];

export const itemIdValidation = [
  param("id").isString().withMessage("ID must be a string"),
];

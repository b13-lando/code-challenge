import { Router } from "express";
import { ItemController } from "../controllers/item.controller";
import { validateRequest } from "../middlewares/validation.middleware";
import { 
  createItemValidation, 
  updateItemValidation, 
  listItemsValidation, 
  itemIdValidation 
} from "../validators/item.validator";

const router = Router();

router.post(
  "/",
  createItemValidation,
  validateRequest,
  ItemController.create
);

router.get(
  "/",
  listItemsValidation,
  validateRequest,
  ItemController.list
);

router.get(
  "/:id",
  itemIdValidation,
  validateRequest,
  ItemController.get
);

router.put(
  "/:id",
  itemIdValidation,
  updateItemValidation,
  validateRequest,
  ItemController.update
);

router.delete(
  "/:id",
  itemIdValidation,
  validateRequest,
  ItemController.delete
);

export default router;

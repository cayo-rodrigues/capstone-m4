import { NextFunction, Request, Response } from "express";
import { In } from "typeorm";

import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import Category from "../../models/Category.model";
import Ingredient from "../../models/Ingredient.model";
import Product from "../../models/Product.model";

const verifyProductToUpdateInfosMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const productsRepo = AppDataSource.getRepository(Product);
  const ingredientsRepo = AppDataSource.getRepository(Ingredient);
  const categoriesRepo = AppDataSource.getRepository(Category);

  const { id, name, ingredients, categories } = req.updateProductInfos;

  const [nameUnavailable] = (await productsRepo.find()).filter(
    (product) => product.name === name && product.id !== id
  );

  if (nameUnavailable) {
    throw new AppError("Product name already in use", 409);
  }

  if (ingredients?.length) {
    const allIngredients = await ingredientsRepo.findBy({
      id: In(ingredients.map(({ id }) => id)),
    });

    if (allIngredients.length !== ingredients.length) {
      throw new AppError("Invalid list of ingredients ids", 400);
    }
  }

  if (categories?.length) {
    const allCategories = await categoriesRepo.findBy({
      id: In(categories),
    });

    if (allCategories.length !== categories.length) {
      throw new AppError("invalid list of categories ids", 400);
    }
  }

  return next();
};

export default verifyProductToUpdateInfosMiddleware;

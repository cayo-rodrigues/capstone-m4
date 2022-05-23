import AppDataSource from "../../data-source";
import AppError from "../../errors/AppError";
import { IParamsIdProduct } from "../../interfaces/Products.interface";
import Product from "../../models/Product.model";

class ListOneProductService {
  static async execute({ id }: IParamsIdProduct): Promise<Product> {
    const productsRepo = AppDataSource.getRepository(Product);

    const product = await productsRepo.findOne({ where: { id } });

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }
}

export default ListOneProductService;

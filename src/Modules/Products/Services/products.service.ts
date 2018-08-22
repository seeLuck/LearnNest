import { Injectable, HttpException } from '@nestjs/common';
import { CreateProductDTO } from '../DTO/create-products.dto';

@Injectable()
export class ProductsService {
    //假資料
    private products = [
        { "_id": 1, "_name": "Watch", "_price": 1000 },
        { "_id": 2, "_name": "Phone", "_price": 25000 }
    ];

    //使用Promise，盡可能避免使用callback方式。
    async getAllProducts() {
        return this.products;
    }
    async getProduct(id: number) {
        const product = this.products.find((product) => {
            return product._id === id;
        });
        if (!product) {
            //nestjs對於http exception有API可以調用，建議使用。
            throw new HttpException("product not found", 404);
        }
        return product;
    }

    async addProduct(product: CreateProductDTO) {
        this.products.push(product);
        return this.products;
    }
}
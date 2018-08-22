import { Controller, Get, Post, Request, Response, Param, Next, HttpStatus, Body } from '@nestjs/common';
import { CreateProductDTO } from './DTO/create-products.dto';
import { ProductsService } from './Services/products.service';

@Controller('products')
export class ProductsController {

    //依賴注入，建議要使用，這是低耦合作法
    constructor(private productsService: ProductsService) { }

    @Get()
    //使用Express的參數
    async getAllProducts( @Request() req, @Response() res, @Next() next) {
        try {
            let products = await this.productsService.getAllProducts();
            res.status(HttpStatus.OK).json(products);
        }catch (err){
            console.error(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Get('/:id')
    //使用Express的參數
    //@Param('id')可以直接抓id參數
    async getProduct( @Response() res, @Param('id') id) {
        try {
            let product = await this.productsService.getProduct(+id);
            res.status(HttpStatus.OK).json(product);
        }catch (err){
            console.error(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Post()
    async addUProduct( @Response() res, @Body() createProductDTO: CreateProductDTO) {
        try {
            let products = await this.productsService.addProduct(createProductDTO);
            res.status(HttpStatus.OK).json(products);
        }catch (err){
            console.error(err);
            res.status(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
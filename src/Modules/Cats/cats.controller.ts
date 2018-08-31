import { Controller, Get, Post, Patch, Delete, Response, HttpStatus, Param, Body } from '@nestjs/common';
import { CatsServices } from './cats.services';

@Controller()
export class CatsController {

    constructor(private readonly catsServices: CatsServices) { }

    @Get('cats')
    public async getCats( @Response() res) {
        const cats = await this.catsServices.findAll();
        return res.status(HttpStatus.OK).json(cats);
    }

    @Get('cats/find')
    public async findCat( @Response() res) {
        //給定where條件
        let queryCondition = { where: { Name: 'Mary' } };
        const cats = await this.catsServices.findOne(queryCondition);
        return res.status(HttpStatus.OK).json(cats);
    }

    @Post('cats')
    public async createUser( @Response() res, @Body() body) {
        const cats = await this.catsServices.create(body);
        return res.status(HttpStatus.OK).json({});
    }

    @Get('cats/:id')
    public async getCat( @Response() res, @Param() param) {

        const cats = await this.catsServices.findById(param.id);
        return res.status(HttpStatus.OK).json(cats);
    }

    //这俩没人用的
    // @Patch('cats/:ID')
    // public async updateUser( @Param() param, @Response() res, @Body() body) {
    //
    //     const cats = await this.catsServices.update(param.ID,body);
    //     return res.status(HttpStatus.OK).json(cats);
    // }
    //
    // @Delete('cats/:ID')
    // public async deleteUser( @Param() param, @Response() res) {
    //
    //     const cats = await this.catsServices.delete(param.ID);
    //     return res.status(HttpStatus.OK).json(cats);
    // }
}
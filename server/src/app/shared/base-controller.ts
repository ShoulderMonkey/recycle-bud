import { Body, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { FindManyOptions, FindOneOptions } from "typeorm";
import { BaseService } from "./base-service";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
export abstract class BaseController<Entity> {
    
    constructor(public readonly service: BaseService<Entity>) {}

    @Get()
    async getAll(){
        return await this.service.find({})
    }

    @Get(':id')
    async getOneById(@Param('id')id){
        let req: FindOneOptions = {
            where: {
                id: id
            }
        }
        return this.service.findOne(req)
    }

    @Post('findOne')
    async getOne(@Body()body: FindOneOptions){
        return this.service.findOne(body)
    }

    @Post('findMany')
    async getMany(@Body()body: FindManyOptions){

        console.log(body);
        return this.service.find(body)
    }

    @Post()
    async createOne(@Body()body: Entity){
        console.log("CREATE baseController Body -> ", body)
        return this.service.createOne(body)
    }

    @Post('createMany')
    async createMany(@Body()body: Entity[]){
        return this.service.createMany(body)
    }

    @Put(':id')
    async updateOneById(@Param('id')id ,@Body()body: Entity){

        return this.service.updateOne(null, body)
    }

    @Delete(':id')
    async deleteOneById(@Param('id')id){
        let criteria = {
            id: id
        }
        return this.service.deleteOne(criteria)
    }
}
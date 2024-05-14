import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";

import { ServiceDto, ServiceRo } from "../dto/service.dto";
import { CommonResponse } from "src/@common/dto/common-response.dto";
import { Servicesinfo } from "../services/services.service";

@Controller("services")
export class ServiceController {
    constructor(private servicesInfo: Servicesinfo) {}
    @Post()
    async create(@Body() dto: ServiceDto): Promise<CommonResponse<ServiceRo>> {
        const data = await this.servicesInfo.create(dto);
        return {
            success: true,
            message: [""],
            data,
        };
    }

    @Get()
    async findAll(): Promise<CommonResponse<ServiceRo[]>> {
        const data = await this.servicesInfo.findAll();
        return {
            success: true,
            message: [""],
            data,
        };
    }

    @Get(":id")
    async findById(
        @Param("id") id: string
    ): Promise<CommonResponse<ServiceRo>> {
        const data = await this.servicesInfo.findById(id);
        return {
            success: true,
            message: [""],
            data,
        };
    }

    @Get("user/:id")
    async FindByUserId(
        @Param("id") id: string
    ): Promise<CommonResponse<ServiceRo[]>> {
        const data = await this.servicesInfo.FindByUserId(id);
        return {
            success: true,
            message: [""],
            data,
        };
    }

    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() dto: ServiceDto
    ): Promise<CommonResponse<ServiceRo>> {
        const data = await this.servicesInfo.update(id, dto);
        return {
            success: true,
            message: [""],
            data,
        };
    }

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<CommonResponse<ServiceRo>> {
        const data = await this.servicesInfo.delete(id);
        return {
            success: true,
            message: [""],
            data,
        };
    }
}

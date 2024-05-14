import { Body, Controller, Get, Param, Post } from "@nestjs/common";

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
}

import { Body, Controller, Get, Post } from "@nestjs/common";

import { CommonResponse } from "src/@common/dto/common-response.dto";

import {
    RequestServiceDto,
    RequestServiceRo,
} from "../dto/requestServices.dto";
import { RequestServiceService } from "../services/requestServices.services";

@Controller("requestServices")
export class RequestServicesController {
    constructor(private RequestServices: RequestServiceService) {}
    @Post()
    async create(
        @Body() dto: RequestServiceDto
    ): Promise<CommonResponse<RequestServiceRo>> {
        const data = await this.RequestServices.create(dto);
        return {
            success: true,
            message: [""],
            data,
        };
    }

    @Get()
    async findAll(): Promise<CommonResponse<RequestServiceRo[]>> {
        const data = await this.RequestServices.findAll();
        return {
            success: true,
            message: [""],
            data,
        };
    }
}

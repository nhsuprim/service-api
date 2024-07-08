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

    // @Get(":id")
    // async findById(@Param("id") id: string): Promise<CommonResponse<OrderRo>> {
    //     const data = await this.OrderService.findById(id);
    //     return {
    //         success: true,
    //         message: [""],
    //         data,
    //     };
    // }

    // @Get("client/:id")
    // async findByClientId(
    //     @Param("id") id: string
    // ): Promise<CommonResponse<OrderRo[]>> {
    //     const data = await this.OrderService.findByClientId(id);
    //     return {
    //         success: true,
    //         message: [""],
    //         data,
    //     };
    // }

    // @Get("service/:id")
    // async findByServiceId(
    //     @Param("id") id: string
    // ): Promise<CommonResponse<OrderRo[]>> {
    //     const data = await this.OrderService.findByServiceId(id);
    //     return {
    //         success: true,
    //         message: [""],
    //         data,
    //     };
    // }

    // @Delete(":id")
    // async delete(@Param("id") id: string): Promise<CommonResponse<OrderRo>> {
    //     const data = await this.OrderService.delete(id);
    //     return {
    //         success: true,
    //         message: [""],
    //         data,
    //     };
    // }
    // @Patch(":id")
    // async update(
    //     @Param("id") id: string,
    //     @Body() dto: OrderDto
    // ): Promise<CommonResponse<OrderRo>> {
    //     const data = await this.OrderService.update(id, dto);
    //     return {
    //         success: true,
    //         message: [""],
    //         data,
    //     };
    // }
}

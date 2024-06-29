import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
} from "@nestjs/common";
import { OrderDto, OrderRo } from "../dto/order.dto";
import { CommonResponse } from "src/@common/dto/common-response.dto";
import { OrdersService } from "../services/order.services";

@Controller("orders")
export class OrdersController {
    constructor(private OrderService: OrdersService) {}
    @Post()
    async create(@Body() dto: OrderDto): Promise<CommonResponse<OrderRo>> {
        const data = await this.OrderService.create(dto);
        return {
            success: true,
            message: [""],
            data,
        };
    }

    @Get()
    async findAll(): Promise<CommonResponse<OrderRo[]>> {
        const data = await this.OrderService.findAll();
        return {
            success: true,
            message: [""],
            data,
        };
    }

    @Get(":id")
    async findById(@Param("id") id: string): Promise<CommonResponse<OrderRo>> {
        const data = await this.OrderService.findById(id);
        return {
            success: true,
            message: [""],
            data,
        };
    }

    @Get("client/:id")
    async findByClientId(
        @Param("id") id: string
    ): Promise<CommonResponse<OrderRo[]>> {
        const data = await this.OrderService.findByClientId(id);
        return {
            success: true,
            message: [""],
            data,
        };
    }

    @Get("service/:id")
    async findByServiceId(
        @Param("id") id: string
    ): Promise<CommonResponse<OrderRo[]>> {
        const data = await this.OrderService.findByServiceId(id);
        return {
            success: true,
            message: [""],
            data,
        };
    }

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<CommonResponse<OrderRo>> {
        const data = await this.OrderService.delete(id);
        return {
            success: true,
            message: [""],
            data,
        };
    }
    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() dto: OrderDto
    ): Promise<CommonResponse<OrderRo>> {
        const data = await this.OrderService.update(id, dto);
        return {
            success: true,
            message: [""],
            data,
        };
    }
}

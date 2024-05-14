import { Body, Controller, Get, Param, Patch, Post } from "@nestjs/common";
import { UserDetailsDto, UserDetailsRo } from "../dto/userDetails.dto";
import { CommonResponse } from "src/@common/dto/common-response.dto";
import { UserDetailsService } from "../services/userDetails.services";

@Controller("userDetails")
export class UserDetailsController {
    constructor(private UserDetailsService: UserDetailsService) {}
    @Post()
    async create(
        @Body() dto: UserDetailsDto
    ): Promise<CommonResponse<UserDetailsRo>> {
        const data = await this.UserDetailsService.create(dto);
        return {
            success: true,
            message: [""],
            data,
        };
    }

    @Get("user/:id")
    async findUserDetailsByEmail(
        @Param("id") id: string
    ): Promise<CommonResponse<UserDetailsRo>> {
        const data = await this.UserDetailsService.findUserDetailsByEmail(id);
        return {
            success: true,
            message: [""],
            data,
        };
    }

    @Get()
    async findAll(): Promise<CommonResponse<UserDetailsRo[]>> {
        const data = await this.UserDetailsService.findAll();
        return {
            success: true,
            message: [""],
            data,
        };
    }

    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() dto: UserDetailsDto
    ): Promise<CommonResponse<UserDetailsRo>> {
        const data = await this.UserDetailsService.update(id, dto);
        return {
            success: true,
            message: [""],
            data,
        };
    }
}

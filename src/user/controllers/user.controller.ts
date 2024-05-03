import {
    Body,
    Controller,
    Delete,
    Get,
    NotFoundException,
    Param,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe,
} from "@nestjs/common";
import { UserService } from "../services/user.service";
import { UserDto, UserLoginDto, UserRo } from "../dto/user.dto";
import { CommonResponse } from "src/@common/dto/common-response.dto";
import { LocalGuard } from "src/auth/guards/local.guard";
import { JwtAuthGuard } from "src/auth/guards/jwt.guard";

@Controller("users")
export class UserController {
    constructor(private userService: UserService) {}

    //post user
    @Post()
    // @UsePipes(new ValidationPipe())
    async create(@Body() dto: UserDto): Promise<CommonResponse<UserRo>> {
        const data = await this.userService.create(dto);
        return {
            success: true,
            message: [""],
            data,
        };
    }

    //login user
    @Post("login")
    async login(@Body() dto: UserLoginDto): Promise<CommonResponse<UserRo>> {
        const data = await this.userService.login(dto);
        return {
            success: true,
            message: [""],
            data,
        };
    }

    @Get()
    async findAll(): Promise<CommonResponse<UserRo[]>> {
        const data = await this.userService.findAll();
        return {
            success: true,
            message: [""],
            data,
        };
    }
    @Get(":id")
    async findById(@Param("id") id: string): Promise<CommonResponse<UserRo>> {
        const data = await this.userService.findById(id);
        return {
            success: true,
            message: [""],
            data,
        };
    }
    @Get(":email")
    async findByEmail(@Param("email") email: string) {
        try {
            const user = await this.userService.findByEmail(email);
            return user;
        } catch (error) {
            throw new NotFoundException("User not found");
        }
    }

    @Patch(":id")
    async update(
        @Param("id") id: string,
        @Body() dto: UserDto
    ): Promise<CommonResponse<UserRo>> {
        const data = await this.userService.update(id, dto);
        return {
            success: true,
            message: [""],
            data,
        };
    }

    @Delete(":id")
    async delete(@Param("id") id: string): Promise<CommonResponse<UserRo>> {
        const data = await this.userService.delete(id);
        return {
            success: true,
            message: [""],
            data,
        };
    }
}

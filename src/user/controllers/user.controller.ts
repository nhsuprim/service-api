import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UserService } from '../services/user.service';
import { UserDto, UserRo } from '../dto/user.dto';
import { CommonResponse } from 'src/@common/dto/common-response.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  //post user
  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: UserDto): Promise<CommonResponse<UserRo>> {
    const data = await this.userService.create(dto);
    return {
      success: true,
      message: [''],
      data,
    };
  }
  @Get()
  async findAll(): Promise<CommonResponse<UserRo[]>> {
    const data = await this.userService.findAll();
    return {
      success: true,
      message: [''],
      data,
    };
  }
  @Get(':id')
  async findById(@Param('id') id: string): Promise<CommonResponse<UserRo>> {
    const data = await this.userService.findById(id);
    return {
      success: true,
      message: [''],
      data,
    };
  }
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UserDto,
  ): Promise<CommonResponse<UserRo>> {
    const data = await this.userService.update(id, dto);
    return {
      success: true,
      message: [''],
      data,
    };
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<CommonResponse<UserRo>> {
    const data = await this.userService.delete(id);
    return {
      success: true,
      message: [''],
      data,
    };
  }
}

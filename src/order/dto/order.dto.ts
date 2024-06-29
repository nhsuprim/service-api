import {
    IsDate,
    IsDateString,
    IsEnum,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsOptional,
    IsString,
} from "class-validator";
import { OrderStatus } from "../enums/order.enums";
import { Transform } from "class-transformer";
import { ServiceRo } from "src/services/dto/service.dto";
import { UserDetailsRo } from "src/userDetails/dto/userDetails.dto";

export class OrderDto {
    @IsOptional()
    @IsString()
    note?: string;

    @IsNotEmpty()
    @IsNumber()
    @Transform(({ value }) => parseInt(value))
    cost: number;

    @IsString()
    @IsEnum(OrderStatus)
    status: OrderStatus;

    @IsNotEmpty()
    @IsDateString()
    appointedDate: Date;

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    serviceId: string;

    @IsString()
    @IsNotEmpty()
    @IsMongoId()
    clientId: string;
}

export class OrderRo {
    id: string;
    note: string;
    cost: number;
    status: OrderStatus;
    appointedDate: Date;
    serviceId: ServiceRo;
    clientId: UserDetailsRo;
    createdAt: Date;
    updatedAt: Date;
}

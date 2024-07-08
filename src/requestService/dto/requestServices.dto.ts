import { IsNotEmpty, IsString } from "class-validator";

export class RequestServiceDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    serviceName: string;

    @IsNotEmpty()
    @IsString()
    serviceCategory: string;

    @IsNotEmpty()
    @IsString()
    serviceDescription: string;
}

export class RequestServiceRo {
    id: string;
    name: string;
    address: string;
    phone: string;
    serviceName: string;
    serviceCategory: string;
    serviceDescription: string;
    createdAt: Date;
    updatedAt: Date;
}

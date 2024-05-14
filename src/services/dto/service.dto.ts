import { ApiProperty } from "@nestjs/swagger";
import { IsMongoId, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { UserDetailsRo } from "src/userDetails/dto/userDetails.dto";
export class ServiceDto {
    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    serviceName: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    category: string;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    discription: string;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    price: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    image: string;

    @ApiProperty()
    @IsString()
    @IsMongoId()
    @IsNotEmpty()
    userDetails: string;
}

export class ServiceRo {
    id: string;
    serviceName: string;
    category: string;
    discription: string;
    price: number;
    image: string;
    userDetails: UserDetailsRo;
    createdAt: Date;
    updatedAt: Date;
}

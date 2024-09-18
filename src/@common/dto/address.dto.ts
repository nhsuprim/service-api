import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNotEmpty, MinLength, Min, IsNumber, Max } from 'class-validator';

export class AddressBodyDTO {
    @ApiProperty()
    @IsNotEmpty()
    @MinLength(2)
    city: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(2)
    state: string;

    @ApiProperty()
    @IsNotEmpty()
    @MinLength(2)
    country: string;

    @ApiProperty()
    @IsNotEmpty()
    formattedAddress: string;

    @ApiProperty()
    @IsNotEmpty()
    @Min(-180)
    @IsNumber()
    @Max(180)
    @Type(() => Number)
    longitude: number;

    @ApiProperty()
    @IsNotEmpty()
    @Min(-90)
    @Max(90)
    @IsNumber()
    @Type(() => Number)
    latitude: number;
}

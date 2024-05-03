import {
    IsEmail,
    IsMongoId,
    IsNotEmpty,
    IsNumber,
    IsString,
} from "class-validator";

export class UserDto {
    @IsString()
    @IsNotEmpty()
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    createdAt: Date;
    updatedAt: Date;
}
export class UserLoginDto {
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;
}

export class UserRo {
    id: string;
    username: string;
    email: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
}

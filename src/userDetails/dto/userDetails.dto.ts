import { IsEmail, IsMongoId, IsNotEmpty, IsString } from "class-validator";

export class UserDetailsDto {
    @IsNotEmpty()
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsNotEmpty()
    @IsString()
    division: string;

    @IsNotEmpty()
    @IsString()
    address: string;

    @IsNotEmpty()
    @IsString()
    image?: string;

    // @IsNotEmpty()
    // @IsMongoId()
    // user: string;
}

export class UserDetailsRo extends UserDetailsDto {
    id: string;
    createdAt: Date;
    updatedAt: Date;
}

import * as bcrypt from "bcrypt";
import { Injectable } from "@nestjs/common";
import { AuthPayloadDto } from "./dto/auth.dto";
import { JwtService } from "@nestjs/jwt";
import { UserLoginDto } from "src/user/dto/user.dto";
import { UserService } from "src/user/services/user.service";

const fakeUsers = [
    {
        id: 1,
        email: "anson",
        password: "password",
    },
    {
        id: 2,
        email: "jack",
        password: "password123",
    },
];

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private readonly userService: UserService
    ) {}

    async validateUser({ email, password }: UserLoginDto) {
        const users = await this.userService.findAll();
        console.log(users);
        const findUser = users.find((user) => user.email === email);
        if (!findUser) return null;
        const matchPassword = await bcrypt.compare(findUser.password, password);
        if (matchPassword === findUser.password) {
            const { password, ...user } = findUser;
            return this.jwtService.sign(user);
        }
    }
}

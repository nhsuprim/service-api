import { PassportStrategy } from "@nestjs/passport";
import { Strategy } from "passport-local";
import { AuthService } from "../auth.service";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { UserLoginDto } from "src/user/dto/user.dto";

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
    constructor(private authService: AuthService) {
        super();
    }

    validate({ email, password }: UserLoginDto) {
        console.log("Inside LocalStrategy");
        const user = this.authService.validateUser({ email, password });
        if (!user) throw new UnauthorizedException();
        return user;
    }
}

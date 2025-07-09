import { Injectable, UnauthorizedException } from "@nestjs/common"
import { PassportStrategy } from "@nestjs/passport"
import { InjectRepository } from "@nestjs/typeorm"
import { ExtractJwt, Strategy } from "passport-jwt"
import { User } from "../entities/user.entity"
import { Repository } from "typeorm"
import { ConfigService } from "@nestjs/config"
import { JWTpayload } from "./interfaces/jwt-interfaces"



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService

    ) {
        super({
            secretOrKey: configService.get("JWT_SECRET")!,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        })
    }

    async validate(payload: JWTpayload): Promise<User> {
        const { id } = payload
        const user = await this.userRepository.findOneBy({ id });

        if(!user) throw new UnauthorizedException("Invalid token")

        if(user.deletedAt) throw new UnauthorizedException("User inactive, please contact with an admin.")
        return user
    }
}
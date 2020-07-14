//jwt策略
import { Strategy, StrategyOptions, ExtractJwt } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { InjectModel } from 'nestjs-typegoose';
import { User } from '@libs/db/models/user.model';
import { ReturnModelType } from '@typegoose/typegoose';

export class JwtStrategy extends PassportStrategy(Strategy, 'local') {
  constructor(
    @InjectModel(User) private userModel: ReturnModelType<typeof User>,
  ) {
    super({
      //第一步：取token
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      //第二步：还原token（解token）,涉及secret 和 jwt
      secretOrKey: process.env.SECRET,
    } as StrategyOptions);
  }

  //验证逻辑
  async validate(id) {
    return await this.userModel.findById(id);
  }
}

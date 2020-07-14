import { prop, ModelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { hashSync } from 'bcryptjs';

//定义模型的其他属性
@ModelOptions({
  schemaOptions: {
    //时间
    timestamps: true,
  },
})
export class User {
  @ApiProperty({ description: '用户名', example: 'user1' })
  @prop()
  username: string;

  /**
   *密码需要加密：使用散列
   *
   * @type {string}
   * @memberof User
   */
  @ApiProperty({ description: '用户密码', example: 'pass1' })
  @prop({
    select: false,
    get(val) {
      return val;
    },
    set(val) {
      return val ? hashSync(val) : val;
    },
  })
  password: string;
}

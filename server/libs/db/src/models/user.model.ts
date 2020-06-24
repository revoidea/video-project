import { prop, ModelOptions } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'

//定义模型的其他属性
@ModelOptions({
    schemaOptions:{
        //时间
        timestamps:true
    }
})
export class User {
    @ApiProperty({description:'用户名',example:'user1'})
    @prop()
    username:string

    @ApiProperty({description:'用户密码',example:'pass1'})
    @prop()
    password:string


}
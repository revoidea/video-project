import { prop, arrayProp, Ref } from '@typegoose/typegoose'
import { ApiProperty } from '@nestjs/swagger'
import { Episode } from './episode.model'

export class Course {
    @ApiProperty({description:'课程名称'})
    @prop()
    name:string


    @ApiProperty({description:'封面图'})
    @prop()
    cover:string

    //课程与课时：一对多
    @arrayProp({itemsRef:'Episode'})
    episodes:Ref<Episode>[]

}
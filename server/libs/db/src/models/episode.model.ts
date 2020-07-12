import { prop, modelOptions, Ref } from "@typegoose/typegoose";
import { Course } from "./course.model";
import { ApiProperty } from "@nestjs/swagger";


@modelOptions({
    schemaOptions:{
        timestamps:true
    }
})
export class Episode {

    @ApiProperty({description:'课时名称'})
    @prop()
    name:string

    @ApiProperty({description:'视频文件'})
    @prop()
    file:string

    @prop({ref:'Course'})
    course:Ref<Course>
}
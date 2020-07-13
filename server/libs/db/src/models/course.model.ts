import { prop, arrayProp, Ref, modelOptions } from '@typegoose/typegoose';
import { ApiProperty } from '@nestjs/swagger';
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
    toJSON: { virtuals: true },
  },
})
export class Course {
  @ApiProperty({ description: '课程名称' })
  @prop()
  name: string;

  @ApiProperty({ description: '封面图' })
  @prop()
  cover: string;

  //课程与课时：一对多
  @arrayProp({
    ref: 'Episode',
    localField: '_id', //关联的本地键
    foreignField: 'course', //关联的外键
  })
  episodes: Ref<Episode>[];
}

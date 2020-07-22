import { prop, modelOptions, Ref } from '@typegoose/typegoose';
import { Course } from './course.model';
import { ApiProperty } from '@nestjs/swagger';
import { User } from './user.model';
import { Episode } from './episode.model';

@modelOptions({
  schemaOptions: {
    timestamps: true,
  },
})
export class Action {
  @prop({ ref: 'User' })
  user: Ref<User>;

  @prop({ enum: ['Course', 'Episode'] })
  type: string;

  @prop({ refPath: 'type' })
  object: Ref<Course | Episode>;

  @prop({ enum: ['like', 'upVote'] })
  name: string;
}

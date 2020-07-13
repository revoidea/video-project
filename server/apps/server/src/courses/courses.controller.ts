import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Crud } from 'nestjs-mongoose-crud';
import { Course } from '@libs/db/models/course.model';
import { InjectModel } from 'nestjs-typegoose';

@Crud({
  model: Course,
  routes: {
    create: false,
    update: false,
    delete: false,
  },
})
@ApiTags('课程')
@Controller('courses')
export class CoursesController {
  constructor(@InjectModel(Course) private model) {}
}

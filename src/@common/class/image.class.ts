import { Prop } from '@nestjs/mongoose';

export class ImageSchema {
    @Prop()
    id: string;

    @Prop()
    key: string;

    @Prop()
    url: string;
}

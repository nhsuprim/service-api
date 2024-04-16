import { Prop } from '@nestjs/mongoose';

export class LocationSchema {
    @Prop()
    type: string;

    @Prop()
    coordinates: [number, number];

    @Prop()
    city: string;

    @Prop()
    state: string;

    @Prop()
    country: string;

    @Prop()
    formattedAddress: string;
}

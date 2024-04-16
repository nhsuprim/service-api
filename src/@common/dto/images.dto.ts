import { ApiProperty } from '@nestjs/swagger';

export class IImage {
    @ApiProperty()
    image: string;

    @ApiProperty()
    id: string;
}

export class IImageMeta {
    @ApiProperty()
    id: string;

    @ApiProperty()
    key: string;
}

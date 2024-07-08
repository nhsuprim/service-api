import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import {
    RequestServiceDto,
    RequestServiceRo,
} from "../dto/requestServices.dto";
import {
    RequestServicesDocument,
    RequestServices,
} from "../schemas/requestService.schemas";

@Injectable()
export class RequestServiceService {
    constructor(
        @InjectModel(RequestServices.name)
        private requestServiceModel: Model<RequestServicesDocument>
    ) {}

    async create(dto: RequestServiceDto): Promise<RequestServiceRo> {
        const newRequest = await this.requestServiceModel.create(dto);
        return this.formattedRequest(newRequest);
    }

    async findAll(): Promise<RequestServiceRo[]> {
        const allRequest = await this.requestServiceModel.find();
        return Promise.all(
            allRequest.map((request) => this.formattedRequest(request))
        );
    }

    async formattedRequest(
        requestServiceDocument: RequestServicesDocument
    ): Promise<RequestServiceRo> {
        const {
            _id,
            name,
            address,
            phone,
            serviceName,
            serviceCategory,
            serviceDescription,
            createdAt,
            updatedAt,
        } = requestServiceDocument;
        return {
            id: _id,
            name,
            address,
            phone,
            serviceName,
            serviceCategory,
            serviceDescription,
            createdAt,
            updatedAt,
        };
    }
}

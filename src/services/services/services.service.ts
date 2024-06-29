import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Services, ServicesDocument } from "../schemas/service.schemas";
import { Model } from "mongoose";
import { ServiceDto, ServiceRo } from "../dto/service.dto";

import { UserDetailsService } from "src/userDetails/services/userDetails.services";

@Injectable()
export class Servicesinfo {
    constructor(
        @InjectModel(Services.name)
        private serviceModel: Model<Services>,
        private readonly userDetails: UserDetailsService
    ) {}

    async create(dto: ServiceDto): Promise<ServiceRo> {
        // Check if the email already exists
        try {
            const { serviceName, category, price, discription, image, userId } =
                dto;

            const findUserDetails =
                await this.userDetails.findUserDetailsByEmail(userId);

            const userInfo = await this.userDetails.findById(
                findUserDetails.id
            );

            const NewService = await this.serviceModel.create({
                serviceName,
                category,
                price,
                discription,
                image,
                userId: userInfo.id,
            });
            return this.formatedService(NewService);
        } catch (error) {
            throw new NotFoundException("User not found");
        }
    }
    async findAll(userId?: string): Promise<ServiceRo[]> {
        try {
            const conditions: any = {};
            if (userId) {
                conditions.userId = userId;
            }
            const services = await this.serviceModel.find(conditions).exec();
            return Promise.all(
                services.map((service) => this.formatedService(service))
            );
        } catch (error) {
            throw new NotFoundException("Failed to retrieve services");
        }
    }

    //get all services for single user
    async findById(id: string): Promise<ServiceRo> {
        try {
            const service = await this.serviceModel.findById(id).exec();
            if (!service) {
                throw new NotFoundException("Service not found");
            }
            return this.formatedService(service);
        } catch (error) {
            throw new NotFoundException("Failed to retrieve service");
        }
    }

    async FindByUserId(id: string): Promise<ServiceRo[]> {
        const findUserDetails =
            await this.userDetails.findUserDetailsByEmail(id);

        const services = await this.serviceModel.find().exec();

        const findServices = services.filter(
            (service) =>
                service.userId._id.toString() === findUserDetails.id.toString()
        );

        return Promise.all(
            findServices.map((service) => this.formatedService(service))
        );
    }

    //update service
    async update(id: string, dto: ServiceDto): Promise<ServiceRo> {
        try {
            const { serviceName, category, price, discription, image, userId } =
                dto;

            const findUserDetails =
                await this.userDetails.findUserDetailsByEmail(userId);

            const userInfo = await this.userDetails.findById(
                findUserDetails.id
            );

            const service = await this.serviceModel.findById(id).exec();
            if (!service) {
                throw new NotFoundException("Service not found");
            }

            const updatedService = await this.serviceModel
                .findByIdAndUpdate(
                    id,
                    {
                        serviceName: serviceName,
                        category: category,
                        price: price,
                        discription: discription,
                        image: image,
                        userId: userInfo.id,
                    },
                    { new: true }
                )
                .exec();

            return this.formatedService(updatedService);
        } catch (error) {
            throw new NotFoundException("Failed to update service");
        }
    }

    //delete service
    async delete(id: string): Promise<ServiceRo> {
        try {
            const service = await this.serviceModel.findById(id).exec();
            if (!service) {
                throw new NotFoundException("Service not found");
            }
            const deletedService = await this.serviceModel
                .findByIdAndDelete(id)
                .exec();
            return this.formatedService(deletedService);
        } catch (error) {
            throw new NotFoundException("Failed to delete service");
        }
    }

    async formatedService(
        serviceDocument: ServicesDocument
    ): Promise<ServiceRo> {
        const { serviceName, category, price, discription, image, userId } =
            serviceDocument;
        const userInfo = await this.userDetails.findById(userId._id);
        return {
            id: serviceDocument._id,
            serviceName: serviceDocument.serviceName,
            category: serviceDocument.category,
            discription: serviceDocument.discription,
            price: serviceDocument.price,
            image: serviceDocument.image,
            userId: userInfo,
            createdAt: serviceDocument.createdAt,
            updatedAt: serviceDocument.updatedAt,
        };
    }
}

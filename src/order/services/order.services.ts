import { ServiceController } from "./../../services/controllers/service.controller";
import { OrderDocument } from "./../schemas/order.schemas";
import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Order } from "../schemas/order.schemas";
import { Servicesinfo } from "src/services/services/services.service";
import { OrderDto, OrderRo } from "../dto/order.dto";
import { UserDetailsService } from "src/userDetails/services/userDetails.services";

@Injectable()
export class OrdersService {
    constructor(
        @InjectModel(Order.name)
        private orderModel: Model<Order>,
        // private readonly userService: UserService,
        private readonly serviceInfo: Servicesinfo,
        private readonly userDetailsService: UserDetailsService
    ) {}

    async create(dto: OrderDto): Promise<OrderRo> {
        const { note, cost, status, appointedDate, serviceId, clientId } = dto;

        const serviceDetails = await this.serviceInfo.findById(serviceId);

        const userDetails =
            await this.userDetailsService.findUserDetailsByEmail(clientId);

        const userInfo = await this.userDetailsService.findById(userDetails.id);

        const newOrder = await this.orderModel.create({
            note: note,
            cost: cost,
            status: status,
            appointedDate: appointedDate,
            serviceId: serviceDetails.id,
            clientId: userInfo.id,
        });
        return this.formatedOrder(newOrder);
    }

    //find all orders
    async findAll(): Promise<OrderRo[]> {
        const orders = await this.orderModel.find();
        return Promise.all(orders.map((order) => this.formatedOrder(order)));
    }

    //find order by client id

    async findByClientId(id: string): Promise<OrderRo[]> {
        const userDetails =
            await this.userDetailsService.findUserDetailsByEmail(id);
        // console.log(userDetails.id.toString());

        const orders = await this.orderModel
            .find({ clientId: userDetails.id.toString() })
            .exec();
        return Promise.all(orders.map((order) => this.formatedOrder(order)));
    }

    // find order by service id
    //

    async findByServiceId(id: string): Promise<OrderRo[]> {
        const userDetails =
            await this.userDetailsService.findUserDetailsByEmail(id);

        const userServices = await this.serviceInfo.findAll(userDetails.id);

        const orderlist = await this.orderModel
            .find({
                serviceId: {
                    $in: userServices.map((service) => service.id.toString()),
                },
            })
            .exec();

        return Promise.all(orderlist.map((order) => this.formatedOrder(order)));
    }

    //find a order
    async findById(id: string): Promise<OrderRo> {
        const order = await this.orderModel.findById(id).exec();
        return this.formatedOrder(order);
    }

    //update a order
    async update(id: string, dto: OrderDto): Promise<OrderRo> {
        try {
            const order = await this.orderModel.findById(id).exec();
            if (!order) {
                throw new NotFoundException("Order not found");
            }
            const updatedOrder = await this.orderModel
                .findByIdAndUpdate(id, dto, { new: true })
                .exec();
            return this.formatedOrder(updatedOrder);
        } catch (error) {
            throw new NotFoundException("Failed to update order");
        }
    }

    //delete order
    async delete(id: string): Promise<OrderRo> {
        try {
            const order = await this.orderModel.findById(id).exec();
            if (!order) {
                throw new NotFoundException("Order not found");
            }
            const deletedOrder = await this.orderModel
                .findByIdAndDelete(id)
                .exec();
            return this.formatedOrder(deletedOrder);
        } catch (error) {
            throw new NotFoundException("Failed to delete order");
        }
    }

    async formatedOrder(orderDocument: OrderDocument): Promise<OrderRo> {
        const { _id, note, cost, status, appointedDate, serviceId, clientId } =
            orderDocument;
        const service = await this.serviceInfo.findById(serviceId._id);
        const user = await this.userDetailsService.findById(clientId._id);
        return {
            id: _id,
            note: note,
            cost: cost,
            status: status,
            appointedDate: appointedDate,
            serviceId: service,
            clientId: user,
            createdAt: orderDocument.createdAt,
            updatedAt: orderDocument.updatedAt,
        };
    }
}

import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import {
    UserDetails,
    UserDetailsDocument,
} from "../schemas/userDetails.schemas";
import { Model } from "mongoose";
import { UserDetailsDto, UserDetailsRo } from "../dto/userDetails.dto";
import { User } from "src/user/schemas/user.schemas";
import { UserService } from "src/user/services/user.service";

@Injectable()
export class UserDetailsService {
    constructor(
        @InjectModel(UserDetails.name)
        private userDetailsModel: Model<UserDetails>,
        private readonly userService: UserService
    ) {}

    async create(dto: UserDetailsDto): Promise<UserDetailsRo> {
        const details = await this.userDetailsModel.create(dto);
        return this.formatedDetails(details);
    }

    //find user details by email

    async findUserDetailsByEmail(id: string): Promise<UserDetailsRo> {
        const user = await this.userService.findById(id);
        const userEmail = user.email;
        const allUserdetails = await this.userDetailsModel.find().exec();
        const userDetails = allUserdetails.find(
            (details) => details.email === userEmail
        );
        return this.formatedDetails(userDetails);
    }

    //get all data
    async findAll(): Promise<UserDetailsRo[]> {
        const details = await this.userDetailsModel.find().exec();
        const formattedDetails = await Promise.all(
            details.map(async (details): Promise<UserDetailsRo> => {
                return await this.formatedDetails(details);
            })
        );
        return formattedDetails;
    }

    //get a single data
    async findById(id: string): Promise<UserDetailsRo> {
        try {
            const details = await this.userDetailsModel.findById(id).exec();
            if (!details) {
                throw new NotFoundException("User not found");
            }
            return this.formatedDetails(details);
        } catch (error) {
            throw new NotFoundException("Failed to retrieve user");
        }
    }

    //update
    async update(id: string, dto: UserDetailsDto): Promise<UserDetailsRo> {
        try {
            const userData = await this.userDetailsModel.findById(id).exec();
            if (!userData) {
                throw new NotFoundException("User not found");
            }
            const updatedUserDetails = await this.userDetailsModel
                .findByIdAndUpdate(id, dto, { new: true })
                .exec();
            return this.formatedDetails(updatedUserDetails);
        } catch (error) {
            throw new NotFoundException("Failed to update user");
        }
    }
    async formatedDetails(
        userDetailsDocument: UserDetailsDocument
    ): Promise<UserDetailsRo> {
        const { _id, username, email, phone, address, division, image } =
            userDetailsDocument;

        return {
            id: _id,
            username,
            email,
            phone,
            address,
            division,
            image,
            createdAt: userDetailsDocument.createdAt,
            updatedAt: userDetailsDocument.updatedAt,
        };
    }
}

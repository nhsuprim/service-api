import { UserDocument } from "../schemas/user.schemas";
import {
    ConflictException,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../schemas/user.schemas";
import { Model } from "mongoose";
import { UserDto, UserRo } from "../dto/user.dto";

@Injectable()
export class UserService {
    constructor(
        @InjectModel(User.name)
        private userModel: Model<User>
    ) {}

    // create a new user

    async create(dto: UserDto): Promise<UserRo> {
        try {
            // Check if the email already exists
            const existingUser = await this.userModel
                .findOne({ email: dto.email })
                .exec();
            if (existingUser) {
                throw new ConflictException(
                    "User with this email already exists"
                );
            }

            // Create a new user if email doesn't exist
            const newUser = await this.userModel.create(dto);
            return await this.formatUser(newUser);
        } catch (error) {
            if (error instanceof ConflictException) {
                throw error; // Rethrow ConflictException
            }
            throw new NotFoundException("User creation failed");
        }
    }

    // get all users
    async findAll(): Promise<UserRo[]> {
        try {
            const users = await this.userModel.find().exec();
            return Promise.all(users.map((user) => this.formatUser(user)));
        } catch (error) {
            throw new NotFoundException("Failed to retrieve users");
        }
    }

    // get user by id
    async findById(id: string): Promise<UserRo> {
        try {
            const user = await this.userModel.findById(id).exec();
            if (!user) {
                throw new NotFoundException("User not found");
            }
            return this.formatUser(user);
        } catch (error) {
            throw new NotFoundException("Failed to retrieve user");
        }
    }
    //update user
    async update(id: string, dto: UserDto): Promise<UserRo> {
        try {
            const user = await this.userModel.findById(id).exec();
            if (!user) {
                throw new NotFoundException("User not found");
            }
            const updatedUser = await this.userModel
                .findByIdAndUpdate(id, dto, { new: true })
                .exec();
            return this.formatUser(updatedUser);
        } catch (error) {
            throw new NotFoundException("Failed to update user");
        }
    }

    //delete user
    async delete(id: string): Promise<UserRo> {
        try {
            const user = await this.userModel.findById(id).exec();
            if (!user) {
                throw new NotFoundException("User not found");
            }
            const deletedUser = await this.userModel
                .findByIdAndDelete(id)
                .exec();
            return this.formatUser(deletedUser);
        } catch (error) {
            throw new NotFoundException("Failed to delete user");
        }
    }

    async formatUser(userDocument: UserDocument): Promise<UserRo> {
        const { _id, name, email, password, createdAt, updatedAt } =
            userDocument;

        return {
            id: _id,
            name,
            email,
            password,
            createdAt,
            updatedAt,
        };
    }
}

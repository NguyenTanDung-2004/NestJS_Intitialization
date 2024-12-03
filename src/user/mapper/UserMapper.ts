import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../entities/user.entity";
import { UpdateUserDto } from "../dto/update-user.dto";

@Injectable()
export class UserMapper{
    createUserToUser(createUserDto: CreateUserDto): User{
        const user = new User();
        // map 
        user.email = createUserDto.email;
        user.firstName = createUserDto.firstName;
        user.lastName = createUserDto.lastName;
        user.password = createUserDto.password;
        // return 
        return user;
    }

    updateToUser(updateUserDto: UpdateUserDto): User{
        const user = new User();
        // map 
        user.email = updateUserDto.email;
        user.firstName = updateUserDto.firstName;
        user.lastName = updateUserDto.lastName;
        user.password = updateUserDto.password;
        // return 
        return user;
    }
}
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectConnection, InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserMapper } from './mapper/UserMapper';
import { Connection } from 'mysql2/typings/mysql/lib/Connection';
import { UserException } from 'src/exception/UserException';
import { ErrorCodes } from 'src/exception/ExceptionCode';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly userMapper: UserMapper
  ) {}
  create(createUserDto: CreateUserDto) {
    const user = this.userMapper.createUserToUser(createUserDto);
    this.userRepository.save(user);
    return 'This action adds a new user';
  }

  findAll() {
    const listUsers = this.userRepository.query("select * from user");
    return listUsers;
  }

  findOne(id: number) {
    const user = this.userRepository.findOneBy({id})
  }

  findOneByEmail(email: string){
    return this.userRepository.findOneBy({email});
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // Find the user by ID
    const user = await this.userRepository.findOneBy({ id });

    if (!user) {
      throw new UserException(ErrorCodes.USER_NOT_FOUND);
    }
    // set value 
    Object.assign(user, updateUserDto);

    // Save the updated user back to the database
    return this.userRepository.save(user);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

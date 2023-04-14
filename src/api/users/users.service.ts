import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}


  create(createUserDto: CreateUserDto) {
    return createUserDto;
  }

  findAll() {
    return 'This action returns all users';
  }

  findOne(id: string) {
    return this.usersRepository.findOneBy({ uuid: id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return updateUserDto;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}

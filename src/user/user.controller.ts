import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  HttpStatus,
  HttpException,
} from '@nestjs/common';

import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { OtpUserDto } from './dto/otp-user.dto';
import { User } from './entity/user.entity';
import { UserService } from './user.service';
import { Response } from '../config/Response';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const jwt = require('jsonwebtoken');
const SECRET_KEY = '21d123763dewewq43242dfgasiweyr78e30f14f';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto): Promise<Response> {
    const user = await this.userService.create(createUserDto);
    if (user) {
      return {
        status: 'SUCCESS',
        statusCode: 200,
        message: 'User saved successfully.',
        data: user,
      };
    } else {
      throw new HttpException('Error in save user.', HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  findAll(): Promise<CreateUserDto[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<CreateUserDto> {
    return this.userService.findOne(id);
  }

  @Post('otp')
  public async verifyOtp(@Body() otpUserDto: OtpUserDto): Promise<Response> {
    const user = await this.userService.verifyOtp(otpUserDto);
    if (user === undefined) {
      throw new HttpException('Email or Password is incorrect.', HttpStatus.OK);
    } else {
      return {
        status: 'SUCCESS',
        statusCode: 200,
        message: 'OTP verified successfully.',
        data: user,
      };
    }
  }

  @Post('login')
  public async login(@Body() loginUserDto: LoginUserDto): Promise<Response> {
    const user = await this.userService.login(loginUserDto);
    if (user === undefined) {
      throw new HttpException('Email or Password is incorrect.', HttpStatus.OK);
    } else {
      user.accessToken = await this.jwtSign({
        username: user.email,
        userId: user.id,
        phone: user.phone,
      });
      return {
        status: 'SUCCESS',
        statusCode: 200,
        message: 'User login successfully.',
        data: user,
      };
    }
  }

  jwtSign(payload) {
    const token = jwt.sign(payload, SECRET_KEY, {
      expiresIn: '900s',
    });
    return token;
  }
}

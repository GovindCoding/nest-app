import { Injectable, HttpStatus, HttpException } from '@nestjs/common';
import { Connection } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailTemplates } from '../email-templates/entity/email-templates.entity';
import SendEmail from '../config/sendEmail';
import { LoginUserDto } from './dto/login-user.dto';
import { OtpUserDto } from './dto/otp-user.dto';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const randomize = require('randomatic');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(EmailTemplates)
    private readonly emailTemplateRepository: Repository<EmailTemplates>,
  ) {}

  async create(user: CreateUserDto): Promise<User> {
    const newUser = new User();

    Object.keys(user).forEach((key) => {
      newUser[key] = user[key];
    });
    newUser.otp = randomize('0', 6).toString();

    newUser.status = 'emailSent';

    try {
      const emailTemplate = await this.findEmailTemplate('send_otp');
      emailTemplate[0].email = newUser.email;
      await this.sendOtpEmail(emailTemplate[0], newUser);

      const user = await this.userRepository.save(newUser);
      delete user.otp;
      delete user.password;
      return user;
    } catch (err) {
      return err;
    }
  }

  findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  findOne(id: string): Promise<User> {
    return this.userRepository.findOne(id);
  }

  async verifyOtp(otpUserDto: OtpUserDto) {
    const user = await this.userRepository.find({
      where: { id: otpUserDto.id, otp: otpUserDto.otp },
    });

    if (user[0] !== undefined) {
      const newUser = new User();
      newUser.id = otpUserDto.id;
      newUser.otp = null;
      newUser.status = 'emailVerified';

      try {
        const updatedUser = await this.userRepository.save(newUser);
        console.log('user:' + JSON.stringify(updatedUser));
        return updatedUser;
      } catch (err) {
        return err;
      }
    } else {
      return 'error';
    }
  }

  async findEmailTemplate(templateName: string): Promise<EmailTemplates[]> {
    const emailTemplate = await this.emailTemplateRepository.find({
      name: templateName,
    });
    return emailTemplate;
  }

  async login(loginUserDto: LoginUserDto): Promise<User> {
    const user = await this.userRepository.find({
      where: { email: loginUserDto.email, password: loginUserDto.password },
    });
    if (user.length === 0) {
      throw new HttpException('Email or Password is incorrect.', HttpStatus.OK);
    } else {
      delete user[0].otp;
      delete user[0].password;
      return user[0];
    }
  }

  async sendOtpEmail(emailTemplate: EmailTemplates, user: User) {
    emailTemplate.email = user.email;
    let emailContent = emailTemplate.emailContent;
    emailContent = emailContent.replace('{{OTP}}', user.otp);
    emailTemplate.emailContent = emailContent;
    await SendEmail(emailTemplate);
  }
}

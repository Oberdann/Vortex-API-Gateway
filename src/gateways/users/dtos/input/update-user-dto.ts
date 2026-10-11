import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({
    example: 'Maria da Silva',
    description: 'Novo nome do usuário',
  })
  @IsOptional()
  @IsString({ message: 'O campo [name] precisa ser uma string.' })
  name?: string;

  @ApiProperty({
    example: 'mariadasilva@email.com',
    description: 'Novo e-mail do usuário',
  })
  @IsOptional()
  @IsEmail({}, { message: 'O campo [email] precisa ser um e-mail válido.' })
  email?: string;
}

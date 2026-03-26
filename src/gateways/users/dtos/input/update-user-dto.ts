import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional, IsEmail, MinLength } from 'class-validator';

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

  @ApiProperty({
    example: '654321',
    description: 'Nova senha do usuário',
  })
  @IsOptional()
  @IsString({ message: 'O campo [password] precisa ser uma string.' })
  @MinLength(6, {
    message: 'O campo [password] precisa ter no mínimo 6 caracteres.',
  })
  password?: string;
}

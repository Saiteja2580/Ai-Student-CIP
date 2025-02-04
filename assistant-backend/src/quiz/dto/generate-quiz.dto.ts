import { IsString, IsEnum, IsNotEmpty } from 'class-validator';

export class GenerateQuizDto {
  @IsString()
  @IsNotEmpty()
  topicName: string;

  @IsEnum(['Low', 'Intermediate', 'Advanced'], {
    message: 'Difficulty must be Low, Intermediate, or Advanced',
  })
  difficulty: string;

  @IsEnum(['Theoritical', 'Numerical'], {
    message: 'Type must be Numerical or Theoritical',
  })
  type: string;
}

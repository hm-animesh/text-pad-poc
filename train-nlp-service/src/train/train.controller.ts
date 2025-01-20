import { Controller, Get, Post, Request } from '@nestjs/common';
import { TrainService } from './train.service';
import { Request as ExpressRequest } from 'express';

@Controller('train')
export class TrainController {
  constructor(private readonly trainService: TrainService) { }
  @Post()
  async trainNlp(@Request() request: ExpressRequest) {
    const { question, answer }: any = request.body
    await this.trainService.addDocument(question?.lang, question?.question, question?.intent)
    await this.trainService.addAnswer(answer?.lang, answer?.answer, answer?.agent)
    return 'Trained The Intent'
  }

  @Get('nlp')
  async train(@Request() request: ExpressRequest) {
    return this.trainService.trainNlp()
  }

  @Get('answer')
  async answer(@Request() request: ExpressRequest) {
    const { question } = request.query
    return this.trainService.getAnswer(question)
  }

}

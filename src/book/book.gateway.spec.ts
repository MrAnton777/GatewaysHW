import { Test, TestingModule } from '@nestjs/testing';
import { BookGateway } from './book.gateway';

describe('BookGateway', () => {
  let gateway: BookGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BookGateway],
    }).compile();

    gateway = module.get<BookGateway>(BookGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});

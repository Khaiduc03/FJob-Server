import { Test, TestingModule } from '@nestjs/testing';
import { UserJobController } from './user_job.controller';

describe('UserJobController', () => {
  let controller: UserJobController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserJobController],
    }).compile();

    controller = module.get<UserJobController>(UserJobController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { CreatorAuthGuard } from './creator-auth.guard';

describe('CreatorAuthGuard', () => {
  it('should be defined', () => {
    expect(new CreatorAuthGuard()).toBeDefined();
  });
});

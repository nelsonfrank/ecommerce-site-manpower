import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

@Injectable()
export class PrismaService implements OnModuleInit, OnModuleDestroy {
  async onModuleInit() {
    // Will connect after Prisma schema is migrated in Step 3
  }

  async onModuleDestroy() {
    // Will disconnect after Prisma schema is migrated in Step 3
  }
}

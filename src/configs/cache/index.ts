import { Injectable, CacheOptionsFactory, CacheModuleOptions } from '@nestjs/common';

@Injectable()
export class CacheService implements CacheOptionsFactory {
    async createCacheOptions(): Promise<CacheModuleOptions> {
        return {
            ttl: 5,
            max: 10,
        };
    }
}

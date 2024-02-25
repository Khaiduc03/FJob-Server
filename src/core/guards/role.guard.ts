import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private roles: number[]) {}

    canActivate(context: ExecutionContext): boolean {
        const request = context.switchToHttp().getRequest();
        const role = request.user.role;
        return this.matchRoles(role);
    }

    private matchRoles(role: number): boolean {
        return this.roles.includes(role);
    }
}

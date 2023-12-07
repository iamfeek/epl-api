import { container } from 'tsyringe';
import { PrismaClient } from '@prisma/client';
import { prisma } from '.';

container.register<PrismaClient>('PrismaClient', {
    useValue: prisma,
});
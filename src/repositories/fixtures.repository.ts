import { Fixture, PrismaClient } from '@prisma/client'
import { inject, injectable } from 'tsyringe'
import { FixtureDTO, PaginationOptions } from '../shared/types'

export interface IFixturesRepository {
    paginate(options: PaginationOptions): Promise<FixtureDTO[]>
    betweenDatesInclusive(startDate: Date, endDate: Date): Promise<Fixture[]>
    allCount(): Promise<number>
}


@injectable()
class FixturesRepository implements IFixturesRepository {
    constructor(
        @inject('PrismaClient')
        private prismaClient: PrismaClient
    ) { }

    async paginate({ skip, limit }: PaginationOptions) {
        this.prismaClient.$connect()
        const fixtures = await this.prismaClient.fixture.findMany({
            skip,
            take: limit,
            select: {
                id: true,
                matchDatetime: true,
                homeTeam: {
                    select: {
                        name: true
                    }
                },
                awayTeam: {
                    select: {
                        name: true
                    }
                },
                homeTeamScore: true,
                awayTeamScore: true,
                tournament: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                matchDatetime: "asc"
            }
        });
        this.prismaClient.$disconnect()

        return fixtures.map(fixture => {
            return {
                homeTeam: fixture.homeTeam.name,
                awayTeam: fixture.awayTeam.name,
                homeTeamScore: fixture.homeTeamScore,
                awayTeamScore: fixture.awayTeamScore,
                matchDateTime: fixture.matchDatetime,
                tournament: fixture.tournament.name
            } as FixtureDTO
        })
    }

    async betweenDatesInclusive(startDate: Date, endDate: Date): Promise<Fixture[]> {
        this.prismaClient.$connect();

        const fixtures = await this.prismaClient.fixture.findMany({
            where: {
                matchDatetime: {
                    gte: startDate,
                    lte: endDate
                }
            }
        });

        this.prismaClient.$disconnect();

        return fixtures;
    }

    async allCount() {
        this.prismaClient.$connect();

        const count = await this.prismaClient.fixture.count();

        this.prismaClient.$disconnect();

        return count
    }
}

export { FixturesRepository }

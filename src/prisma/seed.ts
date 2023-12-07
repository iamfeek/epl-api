import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

type ActualFixture = {
    MatchNumber: number;
    RoundNumber: number;
    DateUtc: string;
    Location: string;
    HomeTeam: string;
    AwayTeam: string;
    HomeTeamScore: number | null
    AwayTeamScore: number | null
}

async function main() {
    const response = await fetch("https://fixturedownload.com/feed/json/epl-2023");
    const actualFixtures = await response.json() as ActualFixture[]

    const tournamentName = "English Premier League";

    // upserting tournament EPL
    const epl = await prisma.tournament.upsert({
        where: {
            name: tournamentName
        },
        update: {},
        create: {
            name: tournamentName
        }
    });

    // if fixtures in db is not matching, restart seeding process
    const currentFixturesCount = await prisma.fixture.count();
    if (currentFixturesCount !== actualFixtures.length) {
        console.log(`DB has ${currentFixturesCount} fixtures while actual has ${actualFixtures.length} fixtures. Re-seeding to achieve sync.`)
        // clean out the db 
        await prisma.team.deleteMany();
        await prisma.fixture.deleteMany();

        for (const fixture of actualFixtures) {
            const homeTeam = await prisma.team.upsert({
                where: {
                    name: fixture.HomeTeam
                },
                update: {},
                create: {
                    name: fixture.HomeTeam
                }
            });

            const awayTeam = await prisma.team.upsert({
                where: {
                    name: fixture.AwayTeam
                },
                update: {},
                create: {
                    name: fixture.AwayTeam
                }
            });

            await prisma.fixture.create({
                data: {
                    homeTeamId: homeTeam.id,
                    homeTeamScore: fixture.HomeTeamScore,
                    awayTeamId: awayTeam.id,
                    awayTeamScore: fixture.AwayTeamScore,
                    tournamentId: epl.id,
                    matchDatetime: new Date(fixture.DateUtc)
                }
            });
        }
    } else {
        console.log(`Both the DB and actual have ${actualFixtures.length} fixtures. Continuing.`)
    }
}

main()
    .then(async () => {
        await prisma.$disconnect()
    })
    .catch(async (e) => {
        console.error(e)
        await prisma.$disconnect()
        process.exit(1)
    })
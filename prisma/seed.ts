import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const teams = ['Manchester City', 'Liverpool', 'Chelsea', 'Arsenal', 'Tottenham Hotspur', 'Manchester United', 'Leicester City', 'West Ham United', 'Everton', 'Southampton', 'Wolverhampton Wanderers', 'Crystal Palace', 'Newcastle United', 'Brighton and Hove Albion', 'Burnley', 'Watford', 'Norwich City', 'Aston Villa', 'Bournemouth', 'Sheffield United']

async function main() {
    for (const team of teams) {
        await prisma.team.upsert({
            where: {
                name: team
            },
            update: {},
            create: {
                name: team
            }
        });
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
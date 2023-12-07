import '../../prisma/prisma.symbol'
import { container } from 'tsyringe'

import { FixturesRepository, IFixturesRepository } from '../../repositories/fixtures.repository'

container.registerSingleton<IFixturesRepository>(
    'FixturesRepository',
    FixturesRepository
)
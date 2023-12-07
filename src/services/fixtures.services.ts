import { endOfMonth, format } from "date-fns";
import { uniq } from "lodash";
import { inject, injectable } from "tsyringe";
import { IFixturesRepository } from "../repositories/fixtures.repository";

@injectable()
export class FixturesService {
    constructor(
        @inject("FixturesRepository")
        private repo: IFixturesRepository
    ) { }

    async getCountOfAllFixtures() {
        try {
            return await this.repo.allCount();
        } catch (e: any) {
            throw new Error(`getCountOfAllFixtures: ${e.message}`)
        }
    }

    async getAllWithLimitAndSkip(limit: number, skip: number) {
        try {
            return await this.repo.paginate({ limit, skip })
        } catch (e: any) {
            throw new Error(`getAllWithLimitAndSkip( ${e.message}`)
        }
    }

    async getFixturesForMonthAndYear(month: number, year: number, displayFormat = "dd/MM/yyyy") {
        try {
            const startDate = new Date(`${year}-${month}-1`);
            const endDate = endOfMonth(startDate);

            const fixtures = await this.repo.betweenDatesInclusive(startDate, endDate);

            return uniq(fixtures.map(f => format(new Date(f.matchDatetime), displayFormat)));
        } catch (e: any) {
            throw new Error(`getFixturesForMonthAndYear( ${e.message}`)
        }
    }
}
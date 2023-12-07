import { Controller, Get, Path, Query, Route } from "tsoa";
import { container } from "tsyringe";
import { FixturesService } from "../services/fixtures.services";
import { sanitizeIncomingDate } from "../shared/utils/date-sanitizers";

@Route("fixtures")
export class FixturesController extends Controller {
    /**
     * This endpoint allows the Fixtures listing page to see a list of fixtures.
     * With the limit and skip queries, consumers are able to paginate accoring to their needs.
     * Because of pagination, consumers can achieve an infinite scroll experience.
     * To know when to stop loading more, this endpoint returns `meta.hasNext: boolean` 
     * to realise when the pagination has ended.
     * @param limit How many records to return
     * @param skip How many records to skip before returning 
     * @param fromDate The starting date fixtures records will be looked up from. Format dd/MM/yyyy E.g 23/11/2023
     * @returns an array of FixtureDTO and metadata
     */
    @Get()
    public async listFixturesWithPagination(
        @Query() limit = 10,
        @Query() skip = 0,
        @Query() fromDate?: string
    ) {
        const startDate = fromDate ? sanitizeIncomingDate(fromDate) : new Date()
        try {
            const service = container.resolve(FixturesService)
            const fixtures = await service.getAllWithLimitAndSkip(Number(limit), Number(skip), startDate)

            const allCountOfFixtures = await service.getCountOfAllFixtures();

            return {
                data: fixtures,
                metadata: {
                    total: allCountOfFixtures,
                    hasNext: skip + limit < allCountOfFixtures,
                }
            }
        } catch (e: any) {
            throw new Error(e.message)
        }
    }

    /**
     * This endpoint will enable consumers to power a calendar that is in month view. 
     * This endpoint is also optimised with an database index on the `matchDateTime` column 
     * of the `Fixture` table to allow date range queries to perform better.
     * @param month numerical representation of the month in question. E.g 04 for April, 12 for December
     * @param year 4-digit representation for the year in question. E.g 2023
     * @query displayFormat date-fns format string, defaults to "dd/MM/yyyy"
     * @returns an array of date strings formatted for display 
     */
    @Get("/calendar/{month}/{year}")
    async listDatesWithFixturesForMonth(
        @Path() month: number,
        @Path() year: number,
        @Query() displayFormat?: string
    ) {
        const service = container.resolve(FixturesService)

        const dates = await service.getFixturesForMonthAndYear(Number(month), Number(year), displayFormat as string)

        return {
            data: dates,
        }
    }
}
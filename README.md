# EPL API

## Database

For this project, we are powered by Aiven, a database provider that has a free tier.

## Requirements

### Assumptions

User login and registration are settled.

### Acceptance Criteria

#### AC-1: Fixtures Listing

WHEN user visits Fixtures listing page<br>
THEN user should be able to see list of fixtures (Tournament name, Home & Away team, Match score)<br>
AND user should be able to scroll down to view more fixtures<br>
WHEN user reaches the bottom of Fixtures listing<br>
THEN more fixtures will be loaded

#### AC-2: Fixtures Calendar

WHEN user clicks on the calendar icon on Fixtures listing page<br>
THEN user should be able to a calendar view<br>
AND user should be able to click on dates with matches<br>
AND user should not be able to click on dates without matches<br>

#### AC-3: Documentations
Swagger docs should do it

#### AC-4: README.md 
Hydrate it with all the needed information to run this project locally.

Special shoutout for Prisma, the tool has a series of steps needed to get the thing seeded and ready to rock.

_Note: probably send Aiven's DATABASE_URL privately via email_

#### AC-5: Unit and integration tests


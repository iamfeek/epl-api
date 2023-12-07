import { parse } from "date-fns"

export const sanitizeIncomingDate = (dateString: string) => {
    // expected format will always be dd/MM/yyyy;
    return parse(dateString, "dd/MM/yyyy", new Date())
}
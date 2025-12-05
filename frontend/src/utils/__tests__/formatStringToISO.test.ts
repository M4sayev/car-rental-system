import { formatStringToISO } from "../utils";

describe("formatStringToISO", () => {
  it("returns the ISO date if the string is already ISO format", () => {
    expect(formatStringToISO("2024-05-01")).toBe("2024-05-01");
  });

  it("strips the time portion from an ISO datetime", () => {
    expect(formatStringToISO("2024-05-01T13:45:00Z")).toBe("2024-05-01");
  });

  it("converts mm/dd/yyyy to yyyy-mm-dd", () => {
    expect(formatStringToISO("5/7/2024")).toBe("2024-05-07");
    expect(formatStringToISO("12/31/2023")).toBe("2023-12-31");
  });

  it("handles single-digit month and day correctly", () => {
    expect(formatStringToISO("1/2/2020")).toBe("2020-01-02");
  });

  it("returns '-' for invalid date formats", () => {
    expect(formatStringToISO("05-07-2024")).toBe("-");
    expect(formatStringToISO("not a date")).toBe("-");
    expect(formatStringToISO("2024/05/01")).toBe("-");
    expect(formatStringToISO("")).toBe("-");
  });
});

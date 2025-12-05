import { shortenId } from "../utils";

const mockID = "1413fjkewfn3204913";

describe("shortenId", () => {
  it("renders the shortened ID if the length is greater than 10", () => {
    expect(mockID.length).toBeGreaterThan(10);
    expect(shortenId(mockID)).toBe("1413fjke…4913");
  });
  it("renders the full ID if the length is less than 10", () => {
    expect(mockID.slice(9).length).toBeLessThan(10);
    expect(shortenId(mockID.slice(9))).toBe(mockID.slice(9));
  });

  it("shortens exactly-10-character IDs", () => {
    const id = "1234567890";
    expect(shortenId(id)).toBe("12345678…7890");
  });
});

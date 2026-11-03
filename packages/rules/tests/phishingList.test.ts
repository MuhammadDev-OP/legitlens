import { describe, expect, it } from "vitest";
import { signalPhishingList } from "../src/signals/phishingList.js";
import { PHISHING_SAMPLE } from "../src/data/phishing-sample.js";

describe("phishing list", () => {
  it("hits bundled MIT sample entries", () => {
    for (const d of PHISHING_SAMPLE.slice(0, 3)) {
      const signals = signalPhishingList(d);
      expect(signals[0]?.id).toBe("phishing_list_hit");
      expect(signals[0]?.weight).toBeGreaterThanOrEqual(50);
    }
  });

  it("respects override false", () => {
    expect(signalPhishingList(PHISHING_SAMPLE[0]!, false)).toHaveLength(0);
  });

  it("does not hit clean domains", () => {
    expect(signalPhishingList("example.com")).toHaveLength(0);
  });
});

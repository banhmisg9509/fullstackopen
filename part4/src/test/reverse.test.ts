import { test, expect } from "@jest/globals";
import { reverse } from "../utils/for_testing";

test("reverse of a", () => {
  const result = reverse("a");

  expect(result).toStrictEqual("a");
});

test("reverse of react", () => {
  const result = reverse("react");

  expect(result).toStrictEqual("tcaer");
});

test("reverse of saippuakauppias", () => {
  const result = reverse("saippuakauppias");
  
  expect(result).toStrictEqual("saippuakauppias");
});

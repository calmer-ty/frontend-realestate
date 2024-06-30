import { add } from "@/app/test/jest/page";

it("더하기 잘 되는지 테스트 해보기", () => {
  const result = add(3, 5);
  expect(result).toBe(8);
});

// describe("나만의 테스트 그룹 만들기", () => {
//   it("더하기 잘 되는지 테스트 해보기", () => {});

//   it("더하기 잘 되는지 테스트 해보기", () => {});

//   it("더하기 잘 되는지 테스트 해보기", () => {});
// });

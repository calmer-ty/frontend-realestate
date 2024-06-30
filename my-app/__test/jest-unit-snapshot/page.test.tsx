import JestUnitSnapshotTestPage from "@/app/test/jest-unit-snapshot/page";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";

it("기존 사진이랑 바뀐게 없는지 비교해보자!! - 스냅샷 테스트", () => {
  const result = render(<JestUnitSnapshotTestPage />);
  expect(result.container).toMatchSnapshot();
});

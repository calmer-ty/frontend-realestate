import { initializeTestEnvironment } from "@firebase/rules-unit-testing";
import { collection, getDocs } from "firebase/firestore";
import { render, fireEvent, screen } from "@testing-library/react";
import WritePage from "@/app/write/page";
import "@testing-library/jest-dom";
import type { RulesTestEnvironment } from "@firebase/rules-unit-testing";
import type { Firestore } from "firebase/firestore";

let testEnv: RulesTestEnvironment;
let firestore: Firestore;

beforeAll(async () => {
  testEnv = await initializeTestEnvironment({
    projectId: "frontend-teamproject",
    firestore: {
      host: "localhost",
      port: 8080,
      rules: `
        service cloud.firestore {
          match /databases/{database}/documents {
            match /{document=**} {
              allow read, write: if true;
            }
          }
        }
      `,
    },
  });

  // 인증된 사용자 컨텍스트로 Firestore 인스턴스 가져오기
  firestore = testEnv.authenticatedContext("test-user").firestore();
});

afterAll(async () => {
  await testEnv.cleanup();
});

it("게시글이 잘 등록되는지 테스트", async () => {
  render(<WritePage firestore={firestore} />);

  const testTitle = "임의의 제목";
  const testAddress = "서울시";

  fireEvent.change(screen.getByRole("input-title"), {
    target: { value: testTitle },
  });
  fireEvent.change(screen.getByRole("input-address"), {
    target: { value: testAddress },
  });
  fireEvent.click(screen.getByRole("submit-button"));

  // Firestore에 문서가 잘 추가되었는지 확인
  const buildingCollection = collection(firestore, "building");
  const querySnapshot = await getDocs(buildingCollection);
  expect(querySnapshot.size).toBe(1);

  // 추가된 문서의 내용이 입력한 값과 일치하는지 확인
  const docData = querySnapshot.docs[0].data();
  expect(docData.title).toBe(testTitle);
  expect(docData.address).toBe(testAddress);
});

# Frontend-realestate

### www.calmer96.store

## 프로젝트 개요

- **목적:** 거래된 부동산 시세를 파악하고 직접 매물을 올려볼 수 있도록 한다.
- **주요 기능:**
  - 반응형 디자인 구현
  - 로그인 및 인증
  - CRUD 기능
  - 이미지 업로드
  - 데이터 시각화(맵)

## 시연 영상
  - 등록 기능 및 로그인: [https://youtu.be/Eic1vmnDDPs](https://youtu.be/Eic1vmnDDPs)
  - 맵 기능: [https://youtu.be/Eic1vmnDDPs](https://youtu.be/AaKmrj0IZYU)
  - 매물 리스트 기능: [https://youtu.be/Eic1vmnDDPs](https://youtu.be/Jwc6LpftWF0)
## 기술 스택

- **Frontend:** React, Next.js
- **Backend:** Firebase (Authentication, Firestore, Hosting)

## 설치 및 실행 방법

```bash
# 프로젝트 클론
git clone https://github.com/calmer-ty/frontend-realestate.git

# 의존성 설치
yarn install

# 로컬 실행
yarn dev
```

## 추가 사항

- **맵 데이터를 구마다 분리하여 성능 향상을 하였습니다.**
- **동적 라우팅을 활용하여 새로운 건물 유형이 추가될 경우, URL에 파라미터 값을 받아 추후에 건물 타입에 맞는 API를 요청할 수 있도록 설계하였습니다.**

## 업데이트 내용

**2025.02.04**

- 월세/전세 등록이 추가됐습니다.

![매물유형 추가](https://github.com/user-attachments/assets/2bbbf10d-dcfd-42fb-b7cb-9d5427033574)

- 월세/전세/매매 필터링이 추가됐습니다.
  
![맵 건물필터](https://github.com/user-attachments/assets/fe6ad3fc-1412-45c7-b1f4-5449d58a2c8d)

- 사용자가 보는 지도 영역에 등록된 매물이 있을 때 정보창이 추가됐습니다.

![맵 영역의 정보](https://github.com/user-attachments/assets/439a40bb-206a-4d4b-ae29-14d769593d82)



**2025.02.06**

- 오피스텔 항목이 추가됐습니다.


**2025.02.07**

- 빌라 항목이 추가됐습니다.
- 건물 유형 선택 버튼이 추가됐습니다.

![건물유형 선택](https://github.com/user-attachments/assets/53a968c1-2dc7-4681-8821-1228a339f697)


**2025.02.12**
- 모바일 반응형을 추가하였습니다.

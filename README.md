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
- **동적 라우팅을 활용하여 새로운 건물 유형이 추가될 경우, URL에 맞는 값만 처리하면 자동으로 페이지가 처리되도록 설계했습니다.**

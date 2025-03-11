# 사이트 도메인
### www.calmer96.store

## 프로젝트 개요

- **목적:**
  - 매물 관리(CRUD) 기능을 구현하고, 자산 상승률과 매물 가격 변동을 반영하여 사용자의 자산으로 구매 가능한 매물의 시기를 예측할 수 있도록 개발했습니다.

- **작업 기간:**  2024.06.14~2025.01.21

- **개발 인원:** 1명
    - 기획,개발,배포까지 독립적으로 수행했습니다.

- **주요 기능:**
    - 로그인: Firebase Authentication을 이용한 OAuth 로그인 (Google, Email)![로그인](https://github.com/user-attachments/assets/7eb790d9-0f40-4366-b7dc-7ce1f758b1da)
    - 구매력 분석: 사용자의 자산 상태를 입력받아 구매 가능 시기를 파악할 수 있는 정보 제공![구매력 모드](https://github.com/user-attachments/assets/e134aa0a-2ded-4157-a605-99bbfb0fed76)
    - 거래 유형 필터링: 월세, 전세, 매매 형식으로 데이터 렌더링![거래유형 필터링](https://github.com/user-attachments/assets/1b9916f2-9f3f-4aed-a504-82cca2833dba)
    - 매물 관리(CRUD): 사용자가 직접 부동산 정보를 입력하여 매물을 등록하고, 등록된 매물을 수정, 조회, 삭제할 수 있는 기능 제공
    - 지도 기능: 사용자가 보고 있는 지도 영역에 따라 해당 매물 정보 표시
    - 반응형 UI: 모바일에서도 최적화된 UI 제공![웹- 모바일](https://github.com/user-attachments/assets/b912bae3-960d-403d-9e21-e3144a6d1eb0)



## 기술 스택
- **Frontend:**
  -  React:  UI를 **컴포넌트**화하여 유지보수가 용이하도록 작업했습니다.
  -  Next.js: 서버 사이드에서 데이터를 패칭하고 **SEO 최적화** 및 **빠른 초기 렌더링**이 가능하도록 사용했습니다. 또한 **라우팅 기능**을 통해, usePathname으로 현재 경로를 추적하고, useRouter를 활용해 페이지 이동, <Link> 컴포넌트로 빠르고 효율적인 네비게이션을 구현했습니다.
  -  Emotion: **CSS-in-JS 방식**으로 스타일을 적용하여 **컴포넌트 단위**로 스타일을 관리했습니다.
  -  TypeScript: 타입을 정의함으로써 데이터 구조를 명확히 하고, 코드 가독성을 높였습니다. 타입 덕분에 복잡한 데이터 구조를 한눈에 파악할 수 있어 유지보수가 용이하고, 코드 작성 시 오류를 줄이는 데 큰 도움이 되었습니다.

- **Backend:**
    - Firebase(Firestore, Authentication, Hosting, Functions):
        - Firestore: 실시간 데이터베이스로 사용자 데이터를 처리했습니다.
        - Authentication: 사용자 인증을 처리하여 로그인 기능을 구현했습니다.
        - Hosting: 도메인에 프로젝트를 연결하여 웹 애플리케이션을 배포했습니다.
        - Functions: 서버리스 방식으로 동적 라우팅을 처리할 수 있는 백엔드 로직을 손쉽게 구축했습니다.
        
 
## 기술적 어려움

- **REST API 데이터 패칭:** 처음에는 불완전한 데이터를 가져와 필터링 작업이 어려웠습니다. 이를 해결하기 위해 TypeScript를 적용하여 데이터를 정확하게 필터링 했습니다.

- **지도 시각화:** 모든 데이터를 한 번에 불러와 지도에 시각화했더니, 많은 마커가 생성되어 성능 문제가 발생했습니다. 이를 해결하기 위해 사용자가 선택한 지역에 맞춰 데이터를 패칭하고 시각화를 최적화한 결과, 이전에 1분 이상 걸리던 처리 시간이 3초로 단축되었습니다.

- **Firebase 배포:** Firebase의 배포 방식을 이해하지 못해 배포가 되지 않았습니다. 관련 문서와 커뮤니티를 통하여 배포 과정을 이해하고 문제를 해결했습니다. 

- **인증 기능:** 처음에는 NextAuth로 인증 기능을 구현했지만, 배포 시 로그인이 되지 않는 문제가 발생했습니다. 이 문제를 해결하기 위해 Firebase 인증 기능을 적용하여 해결했습니다.


## 프로젝트 폴더 구조
- `/src`  
  - `/commons`  # API 호출 함수, 공통된 유틸리티와 스타일을 모아서 재사용성을 높였습니다.
  - `/components`  # 재사용 가능한 UI 컴포넌트, 페이지 컴포넌트, layout 컴포넌트  
  - `/pages`  # 페이지 관련 컴포넌트 및 API 호출 함수

## 시연 영상
  - 등록 기능 및 로그인: [https://youtu.be/Eic1vmnDDPs](https://youtu.be/Eic1vmnDDPs)
  - 맵 기능: [https://youtu.be/Eic1vmnDDPs](https://youtu.be/AaKmrj0IZYU)
  - 매물 리스트 기능: [https://youtu.be/Eic1vmnDDPs](https://youtu.be/Jwc6LpftWF0)


## 설치 및 실행 방법

```bash
# 프로젝트 클론
git clone https://github.com/calmer-ty/frontend-realestate.git

# 의존성 설치
yarn install

# 로컬 실행
yarn dev
```

## env 설정

**NEXT_PUBLIC_NCP_CLIENT_ID:** 네이버 맵 API ID

**NCP_CLIENT_SECRET:** 네이버 맵 API 비밀번호

**GOVERNMENT_PUBLIC_DATA:** 공공데이터 API 키

**GOOGLE_CLIENT_ID:** 구글 클라이언트 ID

**GOOGLE_CLIENT_SECRET:** 구글 클라이언트 비밀번호

**FIREBASE_API_KEY**: 파이어베이스 API 키

**FIREBASE_AUTH_DOMAIN:** 파이어베이스 인증 도메인

**FIREBASE_PROJECT_ID:** 파이어베이스 프로젝트 ID

**FIREBASE_STORAGE_BUCKET:** 파이어베이스 스토리지 버킷

**FIREBASE_MESSAGING_SENDER_ID:** 파이어베이스 메세징 송신자 ID

**FIREBASE_APP_ID:** 파이어베이스 APP ID

**FIREBASE_MEASUREMENT_ID:** 파이어베이스 Analytics ID

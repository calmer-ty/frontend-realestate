# 사이트 도메인
### www.calmer96.store

## 프로젝트 개요

- **목적:**
  - 기존 부동산 사이트들이 웹/모바일 버전을 따로 관리하지만, 유지보수가 편하도록 하나의 프로젝트로 작업하고, 또한 **반응형**으로 구현하여 모든 기기에서 사용할 수 있도록 했습니다.
  - 사용자의 현재 자산으로 구매할 수 있는 건물들을 체크해보고, 또한 사용자의 자산 상승률, 매물 가격 상승률을 반영하여 **구매시기를 유추**할 수 있도록 개선했습니다.

- **주요 기능:**
    - 로그인 & 회원가입: Firebase Authentication을 이용한 OAuth 로그인 (Google, Email)![로그인](https://github.com/user-attachments/assets/7eb790d9-0f40-4366-b7dc-7ce1f758b1da)
    - 구매력 분석: 사용자의 자산 상태를 입력받아 구매 가능 시기를 파악할 수 있는 정보 제공![구매력 모드](https://github.com/user-attachments/assets/e134aa0a-2ded-4157-a605-99bbfb0fed76)
    - 거래 유형 필터링: 월세, 전세, 매매 형식으로 데이터 렌더링![거래유형 필터링](https://github.com/user-attachments/assets/1b9916f2-9f3f-4aed-a504-82cca2833dba)
    - 매물 등록/수정/조회/삭제: 사용자가 직접 부동산 정보를 입력하여 매물을 등록하고, 등록된 매물을 수정, 조회, 삭제할 수 있는 기능 제공
    - 지도 기능: 사용자가 보고 있는 지도 영역에 따라 해당 매물 정보 표시
    - 반응형 UI: 모바일에서도 최적화된 UI 제공![웹- 모바일](https://github.com/user-attachments/assets/b912bae3-960d-403d-9e21-e3144a6d1eb0)


 - **개발 인원:** 1명
    - 사용자 인증, 매물 등록/수정/삭제 기능, 지도 API 연동, 반응형 UI 구현 등의 프론트엔드 작업과, 배포까지 독립적으로 수행했습니다.


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
        
    - Node.js: 프론트엔드 개발 환경에서 서버를 구동하고, Next.js 애플리케이션의 서버 사이드 렌더링(SSR)을 지원하는 데 사용되었습니다. 
 
## 기술적 어려움

1.  **로그인 기능 구현**:
    - 기존에 next auth로 로그인을 구현하는데 구글 계정을 인증할 수 없는 문제가 발생했습니다.
    - 해결 방법: Firebase의 Authentication 기능을 사용하는 방식으로 수정했습니다.

2. **지도에 들어가는 API 데이터 최적화**:
    - 처음에는 건물 정보 API를 모두 불러와 지도에 렌더링하는 방식으로 진행하였습니다. 그 결과, 로딩 속도가 1분 이상 지연되고, 또한 한꺼번에 생긴 마커로 인해 페이지에 렉이 발생했었습니다.
    - 해결 방법: 행정 구마다 가지고 있는 고유 값을 url에 변수로 추가해 api 요청을 하여, 사용자가 선택한 구에 해당 하는 데이터만 불러오도록 처리하여, 빠르게 마커를 렌더링 하고, 렉을 줄일 수 있었습니다.
  

## 프로젝트 폴더 구조
- `/src`  
  - `/commons`  # API 호출 함수, 공통된 유틸리티와 스타일을 모아서 재사용성을 높였습니다.
  - `/components`  # 재사용 가능한 UI 컴포넌트, 페이지 컴포넌트, layout 컴포넌트  
  - `/pages`  # 페이지 관련 컴포넌트 및 API 호출 함수

## 시연 영상
  - 등록 기능 및 로그인: [https://youtu.be/Eic1vmnDDPs](https://youtu.be/Eic1vmnDDPs)
  - 맵 기능: [https://youtu.be/Eic1vmnDDPs](https://youtu.be/AaKmrj0IZYU)
  - 매물 리스트 기능: [https://youtu.be/Eic1vmnDDPs](https://youtu.be/Jwc6LpftWF0)


## 블로그 기록
https://velog.io/@ty_calmer96/posts

## 설치 및 실행 방법

```bash
# 프로젝트 클론
git clone https://github.com/calmer-ty/frontend-realestate.git

# 의존성 설치
yarn install

# 로컬 실행
yarn dev
```
"프로젝트 실행 전에, Firebase 환경 변수 설정을 /.env에 추가해야 합니다."

NEXT_PUBLIC_NCP_CLIENT_ID: 네이버 맵 API ID
NCP_CLIENT_SECRET: 네이버 맵 API 비밀번호

GOVERNMENT_PUBLIC_DATA: 공공데이터 API 키

GOOGLE_CLIENT_ID: 구글 클라이언트 ID
GOOGLE_CLIENT_SECRET: 구글 클라이언트 비밀번호

FIREBASE_API_KEY: 파이어베이스 API 키
FIREBASE_AUTH_DOMAIN: 파이어베이스 인증 도메인
FIREBASE_PROJECT_ID: 파이어베이스 프로젝트 ID
FIREBASE_STORAGE_BUCKET: 파이어베이스 스토리지 버킷
FIREBASE_MESSAGING_SENDER_ID: 파이어베이스 메세징 송신자 ID
FIREBASE_APP_ID: 파이어베이스 APP ID
FIREBASE_MEASUREMENT_ID: 파이어베이스 Analytics ID



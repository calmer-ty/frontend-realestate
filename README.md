# 사이트 도메인
### www.calmer96.store

## 프로젝트 개요

- **목적:** 거래된 부동산 시세를 파악하고 직접 매물을 올려볼 수 있도록 한다.
- **주요 기능:**
  
  - 로그인 & 회원가입: Firebase Authentication을 이용한 OAuth 로그인 (Google, Email)
  - 매물 등록: 사용자가 직접 부동산 정보를 입력하고 이미지를 업로드 가능
  - 거래 유형 필터링: 월세, 전세, 매매 선택하여 원하는 매물만 검색 가능
  - 지도 기능: 사용자가 보고 있는 지도 영역에 따라 해당 매물 정보 표시
  - 반응형 UI: 모바일에서도 최적화된 UI 제공

## 시연 영상
  - 등록 기능 및 로그인: [https://youtu.be/Eic1vmnDDPs](https://youtu.be/Eic1vmnDDPs)
  - 맵 기능: [https://youtu.be/Eic1vmnDDPs](https://youtu.be/AaKmrj0IZYU)
  - 매물 리스트 기능: [https://youtu.be/Eic1vmnDDPs](https://youtu.be/Jwc6LpftWF0)

## 기술 스택
- **Frontend:**
  -  React
  -  Next.js

- **Backend:**
    - Firebase(Firestore, Authentication, Hosting, Functions)
    - Node.js

- **기타 라이브러리:**
  - React-slick (슬라이드 라이브러리)
  - p-limit (비동기 API 호출 제한 라이브러리)

## 기술적 어려움

1.  **로그인 기능 구현**:
    - 기존에 next auth로 로그인을 구현하는데 구글 계정을 인증할 수 없는 문제가 발생했습니다.
    - 해결 방법: Firebase의 Authentication 기능을 사용하는 방식으로 수정했습니다.

2. **지도에 들어가는 API 데이터 최적화**:
    - 기존에는 건물 정보 API를 모두 불러와 지도에 렌더링 하는 방식으로 진행하였습니다. 그 결과, 로딩 속도가 1분 이상 지연되고, 또한 한꺼번에 생긴 마커로 인해 페이지에 렉이 발생했었습니다.
    - 해결 방법: 행정 구마다 주어지는 고유 값으로 api 요청을 하여, 사용자가 선택한 구에 해당 하는 데이터만 불러오도록 처리하여, 5초 내에 로딩이 완료 되도록 하였습니다.

## 프로젝트 개선사항

1.  **바뀌지 않는 데이터 상수화**:
    - 기존에는 지역 데이터 값({ city: "서울특별시", district: "송파구", regionCode: "11710" })을 api로 불러와 데이터를 처리했습니다. 하지만, 고유한 데이터이므로 상수로 선언하여 더욱 속도를 개선하였습니다.
      
2.  **rem 단위 사용**:
    - 기존에는 px 단위를 사용하여 스타일을 지정했으나, 다양한 모바일 기기에서 일관된 사용자 경험을 제공하기 위해, rem 단위를 사용하여 스타일을 작성했습니다. 

## 프로젝트 폴더 구조
- `/src`  
  - `/commons`  # API 호출 함수, 공통 스타일, 타입 정의, 유틸리티 함수  
  - `/components`  # 재사용 가능한 UI 컴포넌트, 페이지 컴포넌트, layout 컴포넌트  
  - `/pages`  # 페이지 관련 컴포넌트 및 API 호출 함수
  
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

## 업데이트 내용

**2025.02.04**
- 월세/전세 등록이 추가됐습니다
- 월세/전세/매매 필터링이 추가됐습니다.
- 사용자가 보는 지도 영역에 등록된 매물이 있을 때 정보창이 추가됐습니다.


**2025.02.06**
- 오피스텔 항목이 추가됐습니다.


**2025.02.07**
- 빌라 항목이 추가됐습니다.
- 건물 유형 선택 버튼이 추가됐습니다.


**2025.02.12**
- 모바일 반응형을 추가하였습니다.

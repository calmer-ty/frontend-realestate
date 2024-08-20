# 나만의 가짜 컴퓨터 만드는 설명서

# 2. 이미 리눅스, 노드, npm, yarn까지 모두 깔려있는 컴퓨터 다운로드
FROM node:20

# 2-2. 패키지 먼저 설치하기
COPY ./package.json /my-app/
COPY ./yarn.lock /my-app/
WORKDIR /my-app/
RUN yarn install

# 2-3 소스코드 복사하기
COPY . /my-app/
RUN yarn build

# 2-3 도커 안에서 프로그램 실행하기
CMD yarn start
# board-api-assignment

[프리온보딩 백엔드 코스의 선발 과제](https://www.wanted.co.kr/events/pre_onboarding_course_4)

사용 언어와 패키지

- 언어: JavaScript
- 프레임워크: Express.js
- 주요 패키지: bcrypt, mongodb-memory-server, mongoose, passport, passport-local

## 구현한 방법과 이유

1. JavaScript, Express.js 를 이용해 애플리케이션을 제작했습니다. in-memory database 는 [mongodb-memory-server](https://www.npmjs.com/package/mongodb-memory-server)를 이용해 mongoDB 로 구축했습니다.

2. babel 을 이용해 컴파일링을 수행했습니다. 최신 문법으로 제작하는 것이 더 편리하며, 그에 따라 코드 작성의 효율성을 높일 수 있기 때문입니다.

3. core 디렉토리에 Express app 을 담은 app.js, mongoose 로 DB 를 설정하는 database.js, 로그인 전략을 지정하는 passport.js 를 넣었습니다.

   이들을 core 에 배치한 이유는 app, DB, passport 모두 애플리케이션의 핵심을 담당하기 때문이며, 또한 하나의 폴더로 묶어 구분하면 애플리케이션의 구조를 보다 수월하게 파악할 것이라 판단했습니다.

4. routes 디렉토리에는 auth, users, boards 라우트를 담아 index.js 에서 URI 를 지정해주도록 했습니다. 모든 URI 는 REST API 디자인 가이드를 준수하는 데 중점을 뒀습니다.

5. models 디렉토리에 boards, users 모델을 담았습니다. 이들은 mongoDB 의 컬렉션(SQL 의 테이블) 모델으로, 후에 service 에서 CRUD 를 수행할 때 활용합니다.

6. middlewares 디렉토리에는 isLoggedIn 함수가 있는 authority.js 파일이 있습니다. 이 미들웨어는 글의 작성과 수정, 삭제 API 앞에 배치하여, 로그인을 하지 않으면 로그인을 하라는 응답을 보내는 역할을 합니다.

7. utils 디렉토리에는 HTTP 에러를 생성하여 리턴하는 createError 함수가 있습니다. [http-errors](https://www.npmjs.com/package/http-errors) 패키지를 사용해 status, message 를 임의로 설정하여, 응답을 보다 편하게 전달할 수 있도록 돕는 역할을 합니다.

8. api 디렉토리는 모든 API 를 배치했습니다. 요청과 응답을 담당하는 컨트롤러, 데이터베이스에 접근해 비즈니스 로직을 수행하는 서비스로 구분하여 작성했습니다. [nest.js](https://nestjs.com/)의 영향을 받아 작성한 것으로, 로직을 구분함으로써 가독성이 높아지고 에러가 발생했을 때 그 원인을 찾기가 더욱 수월한 장점이 있기에 이러한 방식을 선택했습니다.
   - 로그인, 로그아웃 기능은 인증 미들웨어인 [passport.js](https://www.passportjs.org/)를 사용했습니다. 유저의 인증을 편리하게 도와주며, 또한 [passport-local](https://www.passportjs.org/packages/passport-local/)으로 세션과 쿠키까지 지원해줄 수 있기에 이를 선택했습니다.

## 실행 방법

`npm install`으로 패키지들을 설치한 후, `npm start`로 실행합니다.

URL 은 `http://localhost:5000`으로, postman 또는 insomnia 같은 API 도구를 이용해 기능을 테스트하실 수 있습니다.

in-memory database 으로 인해 처음에는 빈 데이터로 시작하기 때문에, 회원가입 -> 로그인 -> 글 작성 -> 조회, 수정, 삭제의 순서로 진행하셔야 합니다.

## API 명세

### users

유저의 회원가입을 담당합니다.

- POST `/users` : body 에 id, password 를 입력하여 계정을 생성합니다.

### auth

로그인과 로그아웃을 담당합니다.

- POST `/auth/login` : body 에 id, password 를 입력합니다.
- POST `/auth/logout` : 로그인한 계정을 로그아웃합니다.

### boards

글에 대한 CRUD 를 담당합니다.

- GET `/boards?page=1` : query 의 page 를 통해 pagination 을 구현했습니다. 현재는 한번에 두 개씩 출력됩니다.
- GET `/boards/:board_id` : params 의 board_id 를 가진 특정 글을 가져옵니다. 여기서의 board_id 는 mongoDB 의 objectId 를 입력해야 합니다.
- POST `/boards` : body 에 title, content 를 입력해서 글을 생성합니다. 유저의 objectId 가 필요하기 때문에 미들웨어로 사전에 로그인 여부를 검사합니다.
- PATCH `/boards/:board_id` : body 에 title, content 을 입력하고, params 의 board_id 로 특정 글을 수정합니다.
- DELETE `/boards/:board_id` : params 의 board_id 를 가진 글을 삭제합니다.

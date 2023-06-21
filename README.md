## 👑 면접왕(Interview King)

**면접 스터디 모임을 할 수 있는 서비스**

**1. 프로젝트 소개**<br/>
가. 프로젝트명: 면접왕(Interview King)<br/>
나. 서비스 목적 : 면접 스터디를 하고 싶은 사용자들에게 서비스를 제공함으로써<br/>
본인이 원하는 목표를 이룰 수 있도록 지원합니다.<br/><br/>

**1-2. 페르소나**<br/>
"취준생들의 마지막 취업 관문은 면접이다! 면접 스터디를 모집하는 사이트가 있었으면 좋겠는걸?"<br/>
<br/>

**2. 구현 기능 소개**<br/>
가. 회원가입, 로그인, 회원정보 조회 및 수정 등 사용자 정보 관련 CRUD<br/>
나. 스터디 개설·신청, 스터디 피드백 남기기 등 스터디 정보 관련 CRUD<br/>
다. 스터디장의 스터디원 수락 등의 스터디관리자 권한 기능<br/>
라. 커뮤니티(게시판) 목록 조회, 등록, 수정, 삭제 등 커뮤니티 정보 관련 CRUD<br/>
마. AWS S3 를 이용한 파일 업로드, 다운로드 기능 구현<br/>

**3. 데모 사이트**<br/>

- https://web-interview-dihik2mlj5tbghi.sel4.cloudtype.app/
  <br/>

**4. API 설계문서**<br/>

- [노션페이지 참고](https://www.notion.so/elice/13-f3aabba967fe4fbeb0138da5d788012d?p=2bc36f954548418e8b58297e10234fa2&pm=s)
  <br/><br/>
  ![13team_main_logo_230617](/uploads/84d85e4a39db1835229ef11a8e072971/13team_main_logo_230617.png)
  <br/>

**5. 기술스택** <br />
![13team_tech_stack_230617](/uploads/1ab20358dc175fe8bf941c8955576676/13team_tech_stack_230617.jpg)
<br/><br />
가. 프론트엔드<br/>

- React, TypeScript<br/>
- Fetch: Axios, 리액트쿼리<br/>
- UI: 스타일컴포넌트, MUI<br/>
- 상태관리: Recoil<br/>

나. 백엔드<br/>

- Node, Express<br/>
- DB: MongoDB, Mongoose<br/>
- File Upload/Download : amazon s3

다. 배포<br/>

- NGINX, PM2<br/>

라. auth<br/>

- JWT Token, bcrypt<br/>
  <br/>

**6. 데모영상**<br />
▼ 회원가입<br />
▼ 로그인<br />
▼ 스터디 개설<br />
▼ 스터디 정보관리<br />
▼ 커뮤니티<br />
<br/><br/>

**7. 구성원 역할 및 상세**<br/>

| 이름   | 담당 업무      |
| ------ | -------------- |
| 고병욱 | FE(팀장)       |
| 공지아 | FE(부팀장)     |
| 이용섭 | FE(프론트리더) |
| 임준영 | FE             |
| 정채진 | FE             |
| 박세진 | BE(백엔드리더) |
| 강혜리 | BE             |
| 윤혜진 | BE             |

<br />

### 프론트엔드

- React, ReactQuery
- TypeScript
- amazon S3
- Recoil
- 병욱
  - 스터디 신청 페이지, 스터디 관리(스터디장)
- 지아
  - 상단바/푸터, 회원가입/로그인, 커뮤니티
- 용섭
  - 스터디 상세페이지(소개, 회의링크, 피드백)
- 준영
  - 회원 정보 관리, 마이페이지
- 채진
  - 페이지 레이아웃, 화면 UI 디자인, 메인/스터디정보 검색 페이지

### 백엔드

- node, express
- CommonJS
- mongoDB, moongose
- amazon S3
- cors, JWT Token, bcrypt
- 세진 : user 관련 기능 구현<br />
  - 회원가입, 로그인, 내 정보조회, 회원탈퇴 등<br />
- 혜리 : study 관련 기능 구현 <br />
  - 스터디 개설, 신청, 화상채팅, 피드백, 스터디 정보조회 등<br />
- 혜진 : community 관련 기능 구현<br /> - 게시글 및 댓글 작성·수정·삭제, 파일 업로드 및 다운로드 기능 등<br />
  <br />

**9. 폴더 구조**

- 프론트 : src/pages, src/components, src/img, src/fonts 폴더<br />
- 백엔드 : 프론트 폴더 이외 src 폴더 내 전체<br />
  <br />

**8. 데이터 구조**
<br/>
![13team_InterviewKing_ERD_2](/uploads/0f1fe70f0e6c90fb54d99e2897b3bd86/13team_InterviewKing_ERD_2.png)
<br />

**9. 협업툴**

- Figma : 서비스 기획 및 화면 UI 디자인<br />
- Notion : 회의록 작성, API 명세, 구현기능 확인 등<br />
- Discord : 스크럼, 진행상황 공유 등<br />
- Gitlab : Code Repository<br />
- Gitlab Issue : 진행상황 및 Trouble Shooting 내역 작성<br />
- Postman Teams : API 테스트 진행<br />
  <br />

**10. 스크럼**<br />

- 평일 오후 9시를 기본으로 Discord 에서 진행하되, 탄력적으로 운영.<br />
- YTB(Yesterday, Today, Blocking) 기반 스크럼 회의 진행<br />
  - 어제할일, 오늘할일, 막히는 상황 스크럼 회의때 공유<br />
- 필요시 수시로 프론트/백엔드/전체 스크럼 잡아서 진행<br />
  <br />

**11. 코드 컨벤션**<br />

- 컴포넌트는 함수형으로 작성<br />
- 컴포넌트 함수명은 PascalCase으로 작성<br />
- 일반 함수명, 변수명은 lower Camel Case 사용<br />
- file-scope 함수명: Upper Camel Case <br />
- Boolean 타입의 변수명: is, has, can 같은 접두사 붙임<br />
- 핸들러 함수명: 핸들링하는 명사 + 동사 + 핸들러 형태로 작성<br />
- 백엔드 : commonJS 문법 사용<br />
  <br />

**12. Git 컨벤션**<br />

- 커밋 유형은 영어 대문자로 작성하기<br />
- Feat: 새로운 기능추가<br />
- Fix: 수정사항 발생시, 버그 수정<br />
- Comment: 필요한 주석 추가 및 변경<br />
- Docs: 문서 수정<br />
- Style: 코드 formatting, 세미콜론 누락, 코드 자체의 변경이 없는 경우<br />
- Refactor: 코드 리팩토링<br />
- Test: 테스트코드, 리팩토링 테스트 코드 추가<br />
- Chore: 패키지 매니저 수정, 그 외 기타 수정(ex. .gitignore)<br />
- Design: CSS 등 사용자 UI 디자인 변경<br />
- Rename: 파일 또는 폴더 명을 수정하거나 옮기는 작업만인 경우<br />
- Remove: 파일을 삭제하는 작업만 수행한 경우<br />
- !BREAKING CHANGE: 커다란 API 변경의 경우<br />
- !HOTFIX: 급하게 치명적인 버그를 고쳐야 하는 경우<br />
  <br />

**13. 브랜치 전략**<br />

- 배포 : master 브랜치<br />
- 파트 별로 dev-BE, dev-FE 브랜치 내 feature 브랜치 생성<br />
- feature 기능 구현 후 dev 에 pull request<br />
  <br />
  ![13team_git_branch_0617](/uploads/c3cb7471e57e54afad31f8a280310cba/13team_git_branch_0617.png)

<br />

**14. 배포**

- NGINX, PM2 를 이용한 배포<br />
  <br />

**15. 실행방법**<br />

```javascript
git clone {.....repository_name}.git
cd {repository_name}
npm install
npm run start
```

<br />

**16. env 설정**<br />

```javascript
DB_Link = { DB링크 };
PORT = { 포트번호 };

SECRET_KEY = { 비밀키 };

AWS_ACCESS = { 아마존 };
AWS_SECRET = { 아마존키 };
AWS_REGION = { 지역 };
```

<br />

---

본 프로젝트에서 제공하는 모든 코드 등은 저작권법에 의해 보호 받고 있으며, 엘리스 SW4기 13팀 및 (주)엘리스의 자산입니다.<br />
무단 사용 및 도용, 복제 및 배포를 금합니다.<br />
Copyright 2023 엘리스 Inc. All rights reserved.<br />

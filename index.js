//express 모듈 불러오기
const express = require("express");
//express 사용
const app = express(); 

/**
 * @path http://localhost:3000/ 경로
 */
app.get("/", (req, res) => {
    res.send("Hello World");
});
  
// http listen port 생성 서버 실행
app.listen(3000, () => console.log("송휘의 API Server 입니다. \nhttp://localhost:3000 에 접속하셔서 확인하실 수 있습니다."));
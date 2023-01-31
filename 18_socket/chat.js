const express = require("express");
const app = express();
const http = require("http").Server(app);
// socket은 express 가 아닌 http 모듈에 연결해야 사용할 수 있음.
// 따라서, listen()도 http에 걸어야 함
const io = require("socket.io")(http); // http - socket 연결
const PORT = 8000;

app.set("view engine", "ejs");
app.use("/views", express.static(__dirname + "/views"));
// app.use('/static', express.static(__dirname + '/static'));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get("/", (req, res) => {
  res.render("chat");
});

const nickArray = {};

// [실습44-2] 채팅창 입장 안내 문구 socket.id -> nickname
// 유저 목록 업데이트
function updateList() {
  io.emit("updateNicks", nickArray); // { socket.id: nick1, socket.id: nick2, ... }
}

// io.on()
// : socket과 관련된 통신 작업 모두 처리
io.on("connection", (socket) => {
  // "connection" event
  // - 클라이언트가 접속했을 때 발생
  // - 콜백으로 소캣 객체 제공

  // 최초 입장시 (연결시)
  console.log("**** ⭕️ Server Socket Connected >> ", socket.id); // 클라이언트와 동일한 socket id 생성됨
  // socket.id: 소켓 고유 아이디 -> socket은 웹 페이지 별로 생김!
  // -> 크롬 브라우저 2개 띄우면 socket id(고유번호) 각각 2개 생성
  // ex. socket.id: 13ZYyAr4KA2F7hm9AAAB

  // "disconnect" event
  // - 클라이언트가 연결을 끊었을 때 발생
  // socket.on('disconnect', () => {
  //   console.log('**** ❌ Server Socket Disonnected!! ');
  // });

  /*
  // [실습42] 각 버튼 누를 때 마다 서버로 메세지 보내기
  // - socket.emit('이벤트명', 정보): 정보 보낼 때 사용
  // - socket.on('이벤트명', 콜백): 정보 받을 때 사용
  socket.on('hello', (data) => {
    console.log(`${data.who} : ${data.msg}`);
    socket.emit('helloKr', { who: 'hello', msg: '안녕~~' });
  });

  socket.on('study', (data) => {
    console.log(`${data.who} : ${data.msg}`);
    socket.emit('studyKr', { who: 'study', msg: '공부하자~~' });
  });

  socket.on('bye', (data) => {
    console.log(`${data.who} : ${data.msg}`);
    socket.emit('byeKr', { who: 'bye', msg: '빠이~~' });
  });
  */

  // [실습44] 채팅창 입장 안내 문구
  // io.emit('notice', `${socket.id.slice(0, 5)}님이 입장하셨습니다.`); // [실습44-2] 이전 입장메세지 socket.id
  // [실습44-2] 채팅창 입장 안내 문구 socket.id -> nickname
  // : 채팅 참가자 리스트(배열) 추가
  socket.on("setNick", (nick) => {
    console.log("socket on setNick >> ", nick); // 프론트에서 입력한 닉네임 값

    if (Object.values(nickArray).indexOf(nick) > -1) {
      socket.emit("error", "이미 존재하는 닉네임입니다.");
    } else {
      nickArray[socket.id] = nick;
      // console.log('접속 유저 목록 >> ', nickArray); { socket.id: nick1, socket.id: nick2, ... }
      io.emit("notice", `${nick}님이 입장하셨습니다.`); // [실습44-2] 이후 입장메세지 socket.id -> nick
      socket.emit("entrySuccess", nick); // [실습44-2] 이후 입장메세지 socket.id -> nick (입장 성공시)
      updateList();
    }
  });

  // [실습44-3] 접속자 퇴장시
  // "notice" 이벤트로 퇴장 공지 전송
  socket.on("disconnect", () => {
    console.log("**** ❌ Server Socket Disonnected >> ", socket.id);
    io.emit("notice", `${nickArray[socket.id]}님이 퇴장하셨습니다.`);
    delete nickArray[socket.id];
    updateList();
  });

  // [실습45] 채팅창 메세지 전송 Step1
  socket.on("send", (data) => {
    // console.log('socket on send >> ', data); // { myNick: 'c', dm: 'all', msg: 'd' }

    // [실습45] 채팅창 메세지 전송 Step2
    // const sendData = { nick: data.myNick, msg: data.msg };
    // io.emit('newMessage', sendData);

    // [실습46] DM 기능 추가
    if (data.dm != "all") {
      // dmSocketId: '전체' 일 때만 'all', 나머지는 각 nickname에 해당하는 socket.id 가 저장되어 있음
      let dmSocketId = data.dm;
      console.log("data.dm >>>", data.dm);
      console.log("socket.id >>>", socket.id);

      const sendData = { nick: data.myNick, msg: data.msg, dm: "(속닥속닥) " };
      if (data.dm !== socket.id) {
        io.to(dmSocketId).emit("newMessage", sendData); // 소켓아이디에 해당하는 클라이언트에게 메세지 전송
      }
      socket.emit("newMessage", sendData); // 자기 자신한테 메세지 추가
    } else {
      const sendData = { nick: data.myNick, msg: data.msg };
      io.emit("newMessage", sendData);
    }
  });
});

// 주의) 소켓을 사용하기 위해서는 http.listen으로 포트를 열어줘야 함
http.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

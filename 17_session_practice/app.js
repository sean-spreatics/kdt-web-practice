const express = require('express');
const session = require('express-session');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use('/views', express.static(__dirname + '/views'));
app.use('/static', express.static(__dirname + '/static'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(
  session({
    secret: 'secretKey',
    resave: false,
    saveUninitialized: true,
  })
);

const userInfo = { id: 'a', pw: '1' };

app.get('/', (req, res) => {
  const user = req.session.user;
  // user = 'a';
  // user = undefined;
  console.log('req.session >> ', req.session);

  if (user !== undefined) {
    res.render('index', { isLogin: true, user: user });
  } else {
    res.render('index', { isLogin: false });
  }
});

app.get('/login', (req, res) => {
  res.render('login');
});

app.post('/login', (req, res) => {
  if (req.body.id === userInfo.id && req.body.pw === userInfo.pw) {
    req.session.user = req.body.id;
    console.log('req.session >> ', req.session);
    res.redirect('/');
  } else {
    res.send(
      `<script>
        alert('로그인 실패..🥺');
        document.location.href = '/';
      </script>`
    );
  }
});

app.get('/logout', (req, res) => {
  const user = req.session.user;
  console.log('GET /logout | req.session.user >> ', user); // 'a'

  if (user !== undefined) {
    req.session.destroy((err) => {
      console.log('GET /logout 2 | req.session >> ', req.session); // undefined
      res.redirect('/');
    });
  } else {
    // 유저가 브라우저에 /logout 경로로 직접 접근할 때
    res.send(`
      <script>
        alert('잘못된 접근입니다😨');
        document.location.href = '/';
      </script>
    `);
  }
});

app.listen(PORT, () => {
  console.log(`http://localhost:${PORT}`);
});

// req 객체
// req.session: 사용자별로 해당 객체 안에 세션 정보 유지됨

// 세션쿠키 설정
// req.session.키 = 값

// 세션쿠키 사용
// req.session.키

// 세션 삭제
// req.session.destroy(콜백)

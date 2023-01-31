const express = require('express');
const app = express();
const PORT = 8000;

app.set('view engine', 'ejs');
app.use('/views', express.static(__dirname + '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', function (req, res) {
  res.render('index', { title: '실습 풀이' });
});

app.get('/practice26', function (req, res) {
  res.render('practice26');
});

app.get('/practice27', function (req, res) {
  res.render('practice27');
});

app.get('/result26', function (req, res) {
  console.log(req.query);
  res.render('result', {
    success: '실습26 폼 전송 완료!',
    userInfo: req.query,
  });
});

app.post('/result27', function (req, res) {
  console.log(req.body);
  res.render('result', {
    success: '실습27 폼 전송 완료!',
    userInfo: req.body,
  });
});

app.listen(PORT, function () {
  console.log(`http://localhost:${PORT}`);
});

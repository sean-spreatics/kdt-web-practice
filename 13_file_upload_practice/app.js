const express = require('express');
const app = express();
const PORT = 8000;

// multer 관련 설정
const multer = require('multer');
const path = require('path');
const uploadDetail = multer({
  storage: multer.diskStorage({
    destination(req, file, done) {
      console.log('destination: ', req.body);
      done(null, 'uploads/'); // 경로 설정
    },
    filename(req, file, done) {
      console.log('filename: ', req.body);
      const ext = path.extname(file.originalname); // file.originalname에서 "확장자"를 추출

      // done(null, req.body.userid + Date.now() + ext);
      // ver1 [요청 body 객체의 userid + 현재시간.확장자] 형식으로 파일 업로드!!

      done(null, path.basename(file.originalname, ext) + Date.now() + ext);
      // ver2 [파일명 + 현재시간.확장자] 형식으로 파일 업로드!!
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  // storage : 저장할 공간에 대한 정보
  //  - diskStorage : 파일을 디스크에 저장하기 위한 모든 제어 기능을 제공
  //    - destination : 저장할 경로
  //    - filename : 저장할 파일명 ( 파일명 + 날짜 + 확장자 형식 )
  // limits : 파일을 제한할 수 있다.
  //  - fileSize: 파일 사이즈 제한 ( 현재 5MB )
});

app.set('view engine', 'ejs');
app.use('/views', express.static(__dirname + '/views'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/uploads', express.static(__dirname + '/uploads')); // 동적 파일 업로드를 위한 이미지 폴더 설정
app.use('/static', express.static(__dirname + '/static'));

app.get('/', function (req, res) {
  res.render('index', { title: '파일 업로드 실습31!!!' });
});

app.post('/result', uploadDetail.single('profile'), function (req, res) {
  console.log(req.file);
  console.log(req.body);

  // res.send('Upload!!');
  res.render('result', {
    userInfo: req.body,
    src: req.file.path,
  });
});

app.listen(PORT, function () {
  console.log(`http://localhost:${PORT}`);
});

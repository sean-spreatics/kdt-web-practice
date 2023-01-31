const User = require('../model/User');

exports.main = (req, res) => {
  res.render('index', { title: '동적 폼 실습' });
};

exports.practice30 = (req, res) => {
  // [추가 실습] 풀이
  // 사용자가 폼에 입력한 값
  // { userId: 'banana', userPw: '4321' }
  console.log('req.body: ', req.body);

  // (임시) DB로부터 가져온 회원정보
  // { realId: 'banana', realPw: '4321' };
  console.log('User.users: ', User.users);
  const userDatas = User.users.split('\n');
  console.log(userDatas);

  const users = []; // 유저 배열
  const userIds = []; // 유저 아이디 배열
  for (let user of userDatas) {
    users.push({
      realId: user.split('//')[0],
      realPw: user.split('//')[1],
      name: user.split('//')[2],
    });
    userIds.push(user.split('//')[0]);
  }
  console.log(users);
  console.log(userIds);

  const idx = userIds.indexOf(req.body.userId);
  if (idx >= 0) {
    console.log('아이디 있음');
    console.log(users[idx]);
    console.log(users[idx].realId);
    console.log(users[idx].realPw);
    if (users[idx].realPw === req.body.userPw) {
      console.log('비밀번호 일치');
      res.send({ userInfo: users[idx], isSuccess: true });
    } else {
      console.log('비밀번호 불일치');
      res.send({ isSuccess: false });
    }
  } else {
    console.log('아이디 없음');
    res.send({ isSuccess: false });
  }
};

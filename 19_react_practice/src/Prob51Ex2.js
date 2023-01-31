import { useState } from 'react';

const Prob51Ex2 = () => {
  const [data, setData] = useState([
    { id: 1, user: '지민', email: 'user1@gmail.com' },
    { id: 2, user: '규진', email: 'user2@gmail.com' },
  ]);

  const [inputUser, setInputUser] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [nextId, setNextId] = useState(data.length + 1); // useState(3)

  // useEffect(() => {
  //   console.log(data);
  // });

  const onChangeUser = (e) => setInputUser(e.target.value);

  const onChangeEmail = (e) => setInputEmail(e.target.value);

  const onKeyPressEnter = (e) => {
    if (e.key === 'Enter') {
      eventClick();
    }
  };

  const onRemoveData = (id) => {
    const NextData = data.filter((data) => data.id !== id);
    setData(NextData);
  };

  const eventClick = () => {
    const Nextdata = data.concat({
      id: nextId,
      user: inputUser,
      email: inputEmail,
    });

    setNextId(nextId + 1);
    setData(Nextdata);
    setInputUser('');
    setInputEmail('');
  };

  const dataList = data.map((data) => (
    <h2 key={data.id} onDoubleClick={() => onRemoveData(data.id)}>
      {data.user}: {data.email}
    </h2>
  ));

  return (
    <div>
      <input
        type="text"
        name="user"
        placeholder="이름"
        value={inputUser}
        onChange={onChangeUser}
      />

      <input
        type="text"
        name="email"
        placeholder="이메일"
        value={inputEmail}
        onChange={onChangeEmail}
        onKeyPress={onKeyPressEnter}
      />

      <button onClick={eventClick}>등록</button>

      <div>{dataList}</div>
    </div>
  );
};

export default Prob51Ex2;

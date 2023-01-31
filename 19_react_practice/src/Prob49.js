import { useState } from 'react';

const Prob49 = () => {
  const [color, setColor] = useState('black');
  const [text, setText] = useState('검정');

  const onClickRed = () => {
    setColor('red');
    setText('빨간');
  };

  const onClickBlue = () => {
    setColor('blue');
    setText('파란');
  };

  return (
    <div>
      <h1 style={{ color: color }}>{text}색 글씨</h1>

      <button onClick={onClickRed}>빨간색</button>
      <button onClick={onClickBlue}>파란색</button>
    </div>
  );
};

// useState 한번만 사용하기
// const [state, setState] = useState({
//   color: 'black',
//   text: '검정',
// });

// const onClickRed = () => {
//   setState({
//     color: 'red',
//     text: '빨간',
//   });
// };

// const onClickBlue = () => {
//   setState({
//     color: 'blue',
//     text: '파란',
//   });
// };

// return (
//   <div>
//     <h1 style={{ color: state.color }}>{state.text}색 글씨</h1>

//     <button onClick={onClickRed}>빨간색</button>
//     <button onClick={onClickBlue}>파란색</button>
//   </div>
// );
// };

export default Prob49;

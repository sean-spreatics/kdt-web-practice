import { useState } from 'react';

const Prob48Func = () => {
  const [message, setMessage] = useState('Hello World!');
  const onClick = () => setMessage('Goodbye World!');

  return (
    <div>
      <h2>{message}</h2>
      <br />
      <button onClick={onClick}>클릭</button>
    </div>
  );
};

export default Prob48Func;

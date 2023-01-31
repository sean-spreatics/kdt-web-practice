import { useState, useRef } from 'react';

const Prob54 = () => {
  const [inputWriter, setInputWriter] = useState('');
  const [inputTitle, setInputTitle] = useState('');
  const [comment, setComment] = useState([
    {
      writer: '민수',
      title: '안뇽',
    },
    {
      writer: '지민',
      title: '하이하이',
    },
    {
      writer: '희수',
      title: '멋쟁이',
    },
  ]);
  const writerInputElem = useRef();
  const titleInputElem = useRef();

  // useEffect(() => {
  //   console.log(comment);
  // });

  const checkInputValue = () => {
    if (inputWriter.trim().length === 0) {
      writerInputElem.current.focus();
      return false;
    }

    if (inputTitle.trim().length === 0) {
      titleInputElem.current.focus();
      return false;
    }

    return true;
  };

  const addComment = () => {
    // 리팩토링 전
    // if (inputWriter.trim().length === 0) {
    //   writerInputElem.current.focus();
    //   return;
    // }

    // if (inputTitle.trim().length === 0) {
    //   titleInputElem.current.focus();
    //   return;
    // }

    // 리팩토링 후: 함수로 분리
    if (!checkInputValue()) {
      return;
    }

    let newComment = {
      writer: inputWriter,
      title: inputTitle,
    };

    // state 추가
    // console.log(...comment);
    setComment([...comment, newComment]);
    // comment = [
    //     { writer: xxx, title: xxx },
    //     { writer: xxx, title: xxx },
    //     { writer: xxx, title: xxx },
    //     { writer: xxx, title: xxx },
    // ]

    // // input 초기화
    setInputWriter('');
    setInputTitle('');
  };

  return (
    <div>
      <form>
        <label htmlFor="writer3">작성자:</label>
        <input
          ref={writerInputElem}
          id="writer3"
          type="text"
          name="writer"
          value={inputWriter}
          onChange={(e) => setInputWriter(e.target.value)}
        />
        <label htmlFor="title3">제목:</label>
        <input
          ref={titleInputElem}
          id="title3"
          type="text"
          name="title"
          value={inputTitle}
          onChange={(e) => setInputTitle(e.target.value)}
        />
        <button type="button" onClick={addComment}>
          작성
        </button>
      </form>

      <table border={1} style={{ margin: '30px auto', width: '500px' }}>
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
          </tr>
        </thead>
        <tbody>
          {comment.map((value, idx) => {
            // value = { writer: xxx , titlex: xxx };
            return (
              <tr key={idx + 1}>
                <td>{idx + 1}</td>
                <td>{value.title}</td>
                <td>{value.writer}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Prob54;

import book from './book.jpeg';

const Prob46Ex2 = ({ title, author, price, type }) => {
  return (
    <div className="all">
      <div className="best">이번주 베스트셀러</div>
      <img
        src={book}
        className="book_img"
        style={{ width: '200px' }}
        alt="book"
      />
      <div className="title">{title}</div>
      <div className="content">저자: {author}</div>
      <div className="content">판매가: {price}</div>
      <div className="content">구분: {type}</div>
    </div>
  );
};

export default Prob46Ex2;

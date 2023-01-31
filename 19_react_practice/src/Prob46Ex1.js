const Prob46Ex1 = (props) => {
  return (
    <h1>
      제가 좋아하는 음식은
      <span style={{ color: 'red' }}> {props.food}</span>
      입니다.
    </h1>
  );
};

Prob46Ex1.defaultProps = {
  food: '김치찌개',
};

export default Prob46Ex1;

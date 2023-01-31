// import './styles/Prob56.css';
import './styles/Prob56.scss';

const Prob56 = () => {
  return (
    <div className="lavar">
      <div className="body body1">
        <div className="eye eye-white">
          <div className="eye eye-black"></div>
        </div>
      </div>
      <div className="body body2"></div>
      <div className="body body3"></div>
      <div className="body body4"></div>
      <div className="body body5"></div>
      <div className="body body6"></div>

      {/*  process.env.PUBLIC_URL: /public 폴더 경로 */}
      <img
        class="grass"
        src={process.env.PUBLIC_URL + '/image/grass.png'}
        alt="잔디"
      />
    </div>
  );
};

export default Prob56;

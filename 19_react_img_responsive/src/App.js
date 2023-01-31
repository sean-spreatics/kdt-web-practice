import './App.scss';

function App() {
  return (
    <div className="App">
      <div>
        <img src={process.env.PUBLIC_URL + '/images/1.png'} />
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/2.png'} />
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/3.png'} />
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/4.png'} />
      </div>
      <div>
        <img src={process.env.PUBLIC_URL + '/images/5.png'} />
      </div>
    </div>
  );
}

export default App;

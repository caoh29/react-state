import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card/Card';

export interface IUser {
  data: {
    name: string;
    photo: string;
    resume: string;
    company: {
      name: string;
      role: string;
    }
  }
}

function App() {
  const [data, setData] = useState({
    name: '',
    photo: '',
    resume: '',
    company: {
      name: '',
      role: ''
    }
  });

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('https://jsonplaceholder.typicode.com/users/1');
        const json = await response.json();
        setData(json);
    };
    fetchData();
}, []);

  const [displayContent, setDisplayContent] = useState(false);

  return (
      <div className="App">
        <div>
          <h1>Big Community of <br/> People Like You</h1>
          <button onClick={() => setDisplayContent(!displayContent)}>Toggle Content</button>
          {displayContent && <Card data={data}/>}
        </div>    
        <div>
          <h1>Join Our Program</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quisquam.</p>
          <form>
            <input type="email" placeholder="Email"/>
            <button type='submit' onClick={() => console.log('MAKING POST REQUEST')}>subscribe</button>
          </form>
        </div>
      </div>
  )
}

export default App;

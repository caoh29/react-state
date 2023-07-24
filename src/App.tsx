import { FormEvent, useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card/Card';

export type User = {
  name:    string;
  photo:   string;
  resume:  string;
  company: {
    name: string;
    role: string;
  }
}

const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  const email = (e.currentTarget.firstChild as HTMLInputElement)?.value;
  subscribe(email);
  e.currentTarget.reset();
};

const subscribe = async (email: string) => {
  const response = await fetch('http://localhost:4000/subscribe', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });
  const json = await response.json();
  if (json.error) {
    alert(json.error);
  } else {
    console.log(json);
  }
};


function App() {
  const [data, setData] = useState([]);
  const [description, setDescription] = useState('');

  useEffect(() => {
    const fetchData = async () => {
        const response = await fetch('http://localhost:4000/community');
        const json = await response.json();
        setData(json.data);
        setDescription(json.description);
    };
    fetchData();
}, []);

  const [displayContent, setDisplayContent] = useState(false);

  return (
      <div className="App">
        <div>
          <h1>Big Community of <br/> People Like You</h1>
          <button onClick={() => setDisplayContent(!displayContent)}>{displayContent ? 'Hide' : 'Show'} section</button>
          {displayContent && (
            <div>
              <h4>{description}</h4>
              {data.map((user: User) => <Card key={user.name} content={user}/>)}
            </div>
          )}
        </div>    
        <div>
          <h1>Join Our Program</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quisquam.</p>
          <form onSubmit={handleSubmit}>
            <input type="email" placeholder="Email"/>
            <button type='submit'>subscribe</button>
          </form>
        </div>
      </div>
  )
}

export default App;

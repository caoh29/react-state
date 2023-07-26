import { useEffect, useState } from 'react';
import './App.css';
import Card from './components/Card/Card';
import Form from './components/Form/Form';

export type User = {
  name:    string;
  photo:   string;
  resume:  string;
  company: {
    name: string;
    role: string;
  }
}

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
      <div className='App'>
        <section>
          <h1 className='mt-72 mb-0 title'>Big Community of <br/> People Like You</h1>
          <button className='mt-24 mb-0' onClick={() => setDisplayContent(!displayContent)}>{displayContent ? 'Hide' : 'Show'} section</button>
          {displayContent && (
            <div>
              <h4 className='mt-24 mb-0 description'>{description}</h4>
              {data.map((user: User) => <Card key={user.name} content={user}/>)}
            </div>
          )}
        </section>    
        <section>
          <h1>Join Our Program</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quas, quisquam.</p>
          <Form />
        </section>
      </div>
  )
}

export default App;
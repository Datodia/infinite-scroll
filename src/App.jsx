import { useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'

function App() {
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fetchData = () => {
    setIsLoading(true);
    axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${page}/30`)
      .then(res => {
        const newData = res.data.list;
        setData(prevData => [...prevData, ...newData]);
        setPage(prevPage => prevPage + 1);
        setIsLoading(false);
      })
      .catch(err => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
      fetchData();
    }
  };

  return (
    <div className="App">
      <div className='container'>
        {data.map(item => (
          <div className='card'>
            <img src={`${item.imageUrl}${item.id}`} alt="" />
            <h3>{item.prefix} {item.name} {item.lastName}</h3>
            <h3>{item.title}</h3>
          </div>
        ))}
      </div>
      {isLoading && <p>Loading...</p>}
    </div>
  )
}

export default App

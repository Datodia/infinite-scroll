import { useEffect, useState } from 'react'
import style from '../HomePage/Home.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';

function Homepage() {
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
        <div className={style.container}>
            {data.map(item => (
                <Link to={`user/${item.id}`} className={style.card}>
                    <img src={`${item.imageUrl}?v=${item.id}`} alt="" />
                    <h3>{item.prefix} {item.name} {item.lastName}</h3>
                    <h3>{item.title}</h3>
                </Link>
            ))}
            {isLoading && <p>Loading...</p>}
        </div>

    )
}

export default Homepage

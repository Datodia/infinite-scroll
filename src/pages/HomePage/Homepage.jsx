import { useEffect, useState } from 'react'
import style from '../HomePage/Home.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom';
import { Audio } from 'react-loader-spinner'

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
            {data.map((item, index) => (
                <Link key={index} to={`user/${item.id}`} state={{ user: item }} className={style.card}>
                    <img src={`${item.imageUrl}?v=${item.id}`} alt="" />
                    <h3>{item.prefix} {item.name} {item.lastName}</h3>
                    <h4>{item.title}</h4>
                </Link>
            ))}
            {isLoading &&
                <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color='green'
                    ariaLabel='three-dots-loading'
                    wrapperStyle
                    wrapperClass={isLoading ? { className: 'loading-spinner' } : undefined}
                />}
        </div>

    )
}

export default Homepage

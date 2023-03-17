import axios from 'axios'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { useParams, Link, useHref, useRoutes, useLocation } from 'react-router-dom'
import style from '../User/User.module.css'
import { Audio } from 'react-loader-spinner'

export const User = (props) => {
    const [user, setUser] = useState({})
    const [friends, setFriends] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [page, setPage] = useState(1)
    const [routerHistory, setRouterHistory] = useState([])
    const [names, setNames] = useState([])
    const [merged, setMerged] = useState([])
    const { id } = useParams()
    const history = useHref()

    const { state } = useLocation()
    console.log(state)
    useLayoutEffect(() => {
        fetchData();
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [id])

    useEffect(() => {
        setRouterHistory([history])
        setNames([`${state.user.prefix} ${state.user.name} ${state.user.lastName}`])

    }, [])



    const fetchData = () => {
        setIsLoading(true)

        axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`)
            .then(res => setUser(res.data))


        axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/30`)
            .then(res => {
                const newData = res.data.list;
                setFriends(newData);
                setIsLoading(false);
            })
    }


    const handleScroll = () => {
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight) {
            setIsLoading(true)
            axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/${page}/30`)
                .then(res => {
                    const newData = res.data.list;
                    setFriends(prevData => [...prevData, ...newData]);
                    setPage(prevPage => prevPage + 1);
                    setIsLoading(false);
                })
        }
    };

    const handleClick = () => {
        window.scrollTo({
            top: 0
        })
        setRouterHistory(prevHistory => [...prevHistory, history])
        setNames(prevState => [...prevState, `${user.prefix} ${user.name} ${user.lastName}`])
        // setMerged(routerHistory.map((path, index) => ({ name: names[index], path })))
    }

    useEffect(() => {
        setMerged(routerHistory.map((path, index) => ({ name: names[index], path })))
    }, [routerHistory, names])



    return (
        <div className={style.container}>
            <div className={style.user}>
                <img className={style.img} src={`${user.imageUrl}?v=${user.id}`} />
                <div className={style.info}>
                    <h5 className={style.infoTitle}>Info</h5>
                    <h2>{user.prefix} {user.name} {user.lastName}</h2>
                    <h4>{user.title}</h4>
                    <p><span>Email:</span> {user.email}</p>
                    <p><span>Ip Address:</span> {user.ip}</p>
                    <p><span>Ip Address:</span> {user.ip}</p>
                    <p><span>Job Area:</span> {user.jobArea}</p>
                    <p><span>Job Type:</span> {user.jobType}</p>
                </div>
                <div className={style.address}>
                    <h5 className={style.addressTitle}>Address</h5>
                    <h2>{user.company?.name} {user.company?.suffix}</h2>
                    <p><span>city:</span> {user.address?.city}</p>
                    <p><span>country:</span> {user.address?.country}</p>
                    <p><span>state:</span> {user.address?.state}</p>
                    <p><span>street Address:</span> {user.address?.streetAddress}</p>
                    <p><span>ZIP:</span> {user.address?.zipCode}</p>
                </div>
            </div>
            <div className={style.history}>
                {merged.length > 0 && merged.map((item, index) => (
                    <div className={style.flex} key={index}>
                        <Link to={item?.path}>{item?.name}</Link>
                        <h3>{`>`}</h3>
                    </div>
                ))}
            </div>

            <div className={style.friend}>
                <h2>Frineds: </h2>
                <div className={style.friends}>
                    {friends?.map((item, index) => (
                        <Link key={index} onClick={handleClick} to={`/user/${item.id}`} className={style.card}>
                            <img src={`${item.imageUrl}?v=${item.id}`} alt="" />
                            <h3>{item.prefix} {item.name} {item.lastName}</h3>
                            <h4>{item.title}</h4>
                        </Link>
                    ))}
                </div>
                {isLoading && <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color='green'
                    ariaLabel='three-dots-loading'
                    wrapperStyle
                    wrapperClass={isLoading ? { className: 'loading-spinner' } : undefined}
                />}
            </div>
        </div >
    )
}

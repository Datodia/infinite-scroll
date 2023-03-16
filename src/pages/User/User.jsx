import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import style from '../User/User.module.css'

export const User = () => {
    const [user, setUser] = useState({})
    const [friends, setFriends] = useState([])

    const { id } = useParams()

    console.log(useParams())
    useEffect(() => {
        axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}`)
            .then(res => setUser(res.data))

        axios.get(`http://sweeftdigital-intern.eu-central-1.elasticbeanstalk.com/user/${id}/friends/1/30`)
            .then(res => setFriends(res.data.list))
    }, [id])

    console.log(id)

    return (
        <div className={style.container}>
            <div className={style.user}>
                <img className={style.img} src={`${user.imageUrl}?v=${user.id}`} />
                <div className={style.info}>
                    <h2>{user.prefix} {user.name} {user.lastName}</h2>
                    <p>{user.title}</p>
                    <p>Email: <span>{user.email}</span></p>
                    <p>Ip Address: <span>{user.ip}</span></p>
                    <p>Ip Address: <span>{user.ip}</span></p>
                    <p>Job Area: <span>{user.jobArea}</span></p>
                    <p>Job Type: <span>{user.jobType}</span></p>
                </div>
                <div className={style.address}>
                    <h2>{user.company?.name} {user.company?.suffix}</h2>
                    <p>city: <span>{user.address?.city}</span></p>
                    <p>country: <span>{user.address?.country}</span></p>
                    <p>state: <span>{user.address?.state}</span></p>
                    <p>street Address: <span>{user.address?.streetAddress}</span></p>
                    <p>ZIP: <span>{user.address?.zipCode}</span></p>
                </div>
            </div>

            <div>
                <h2>Frineds</h2>
                <div className={style.friends}>

                    {friends?.map(item => (
                        <Link to={`/user/${item.id}`} className={style.card}>
                            <img src={`${item.imageUrl}?v=${item.id}`} alt="" />
                            <h3>{item.prefix} {item.name} {item.lastName}</h3>
                            <h3>{item.title}</h3>
                        </Link>
                    ))}
                </div>
            </div>
        </div >
    )
}

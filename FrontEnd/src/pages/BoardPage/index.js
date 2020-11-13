import { useEffect, useState } from 'react'
import { Redirect } from 'react-router-dom';

import BoardList from './boardList/index'
import Header from './../../components/header/index'
import Authorization from './../../until/callAuth'

const BoardPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [isAuth, setIsAuth] = useState(false);
    const [userID, setUserID] = useState(false);
    useEffect(() => {
        Authorization('profile', JSON.parse(localStorage.getItem('token')))
            .then(res => { setUserID(res.data.userId); setIsLogin(true); setIsAuth(true) })
            .catch(err => { console.log("Lỗi"); setIsLogin(false); setIsAuth(true) })
    }, []);

    if (!isAuth) return <></>;

    if (!isLogin) return <Redirect to={{
        pathname: process.env.PUBLIC_URL + '/login',
        state: {
            type: 'error',
            message: "You must login!",
            open: true
        }
    }} />

    return (
        <>
            <Header />
            <BoardList userID={userID} />
        </>
    )
}

export default BoardPage;
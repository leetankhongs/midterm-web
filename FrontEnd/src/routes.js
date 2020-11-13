import React from 'react';
import BoardPage from './pages/BoardPage/index';
import BoardDetail from './pages/BoardDetailPage/index'
import SignIn from './pages/LoginPage/index'
import SignUp from './pages/SignUpPage/index'
import Account from './pages/AccountView/index'
const routes = [
    {
        path:  process.env.PUBLIC_URL +'/',
        exact: true,
        main: () => <BoardPage />
    },
    {
        path:  process.env.PUBLIC_URL +'/login',
        exact: true,
        main: ({ location }) => <SignIn location={location} />
    },
    {
        path:  process.env.PUBLIC_URL+'/signup',
        exact: true,
        main: () => <SignUp />
    },
    {
        path: process.env.PUBLIC_URL+  '/profile',
        exact: true,
        main: () => <Account />
    },
    {
        path:  process.env.PUBLIC_URL+ '/boards',
        exact: true,
        main: ({ location }) => <BoardDetail location={location} />
    },
    {
        path: '',
        exact: false,
        main: () => <BoardPage />
    }
]

export default routes;
import { useEffect, useState } from 'react';

import TaskList from './taskList/index'
import Header from './../../components/header/index'
import BoardHeader from './boardHeader/index'

const BoardDetail = (props) => {
    const [id, setID] = useState(null);
    useEffect(() => {
        if (props.location) {
            setID(new URLSearchParams(props.location.search).get('id'));
        }
    }, [props.location]);

    return (
        <div >
            <Header />
            {id !== null ? <BoardHeader boardID={id} /> : ""}
            {id !== null ? <TaskList boardID={id} /> : ""}
        </div>
    )
}

export default BoardDetail;
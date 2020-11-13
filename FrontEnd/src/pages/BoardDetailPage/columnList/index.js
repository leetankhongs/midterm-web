import { useEffect, useState } from 'react';
import { Grid, CircularProgress, makeStyles } from '@material-ui/core';
import { DragDropContext } from 'react-beautiful-dnd';
import CustomizedSnackbars from './../../../components/snackbar/index'

import ColumnItem from './../columnItem/index'
import APICaller from './../../../until/callAPI'
import io from "socket.io-client";
import * as Config from './../../../constants/config'


const socket = io(Config.API_URL);

const useStyles = makeStyles((theme) => ({
    load: {
        position: 'fixed',
        top: '50%',
        left: '50%',
        zIndex: '100000'
    },
}));

const ColumnList = (props) => {
    const classes = useStyles();

    const [datas, setDatas] = useState([]);
    const [error, setError] = useState(false);
    const [canDrag, setCanDrag] = useState(true);
    const [isLoad, setIsLoad] = useState(true);
    const [isExist, setIsExist] = useState(true);
    const [realtime, setRealTime] = useState(true);

    useEffect(() => {
        APICaller('boards/' + props.boardID, 'GET', null).then(res => {
            if (!res.data) {
                setIsExist(false);
                return;
            }
        });
    }, [props.boardID]);

    useEffect(() => {
        const fetchData = async () => {
            const columns = (await APICaller('columns', 'GET', null)).data;
            await socket.emit('msgToServer', props.boardID);
            socket.on('msgToClient', ({ tasks, boardID }) => {
                if (props.boardID !== boardID)
                    return;

                const result = columns.map(column => {
                    const matchTasks = (tasks.filter(task => task.type === column.value)).sort((a, b) => a.index - b.index);
                    return {
                        column,
                        tasks: matchTasks
                    }
                })
                setDatas(result);
            });
            setIsLoad(false);
            setCanDrag(true);
        }

        fetchData();
        if (error === true) {
            setTimeout(() => setError(false), 3000);
        }

    }, [realtime, props.boardID, error]);

    const handleAddNewTask = (task) => {
        console.log(task)
        const copiedData = datas.map(data => {
            if (data.column.value === task.type) {
                data.tasks.splice(task.index, 0, task);
            }
            return data;
        });

        setDatas(copiedData);
        setCanDrag(false);
        setIsLoad(true);
    }

    const handleDeteleTask = (task) => {
        const copiedResult = datas.map(data => {
            if (data.column.value === task.type) {
                data.tasks.splice(task.index, 1);

                for (let i = task.index; i < data.tasks.length; i++) {
                    data.tasks[i].index = i;
                }
            }
            return data;
        })

        setDatas(copiedResult);
        setCanDrag(false);
        setIsLoad(true);
    }

    const handleEditTask = (taskEdit, newContent) => {
        const copiedResult = datas.map(data => {
            data.tasks.map(task => {
                if (task._id === taskEdit._id) {
                    task.description = newContent;
                }
                return task;
            })
            return data;
        })

        setDatas(copiedResult);
        setCanDrag(false);
        setIsLoad(true);
    }

    const onDragEnd = result => {

        const { source, destination } = result;

        console.log(result)
        if (destination === null) {
            console.log("error")
            return;
        }

        setCanDrag(false);
        setIsLoad(true);
        if (source.droppableId !== destination.droppableId) {
            const copiedDatas = [...datas];
            const [removed] = copiedDatas[Number(source.droppableId)].tasks.splice(source.index, 1);
            removed.type = Number(destination.droppableId);
            for (let i = source.index; i < copiedDatas[Number(source.droppableId)].tasks.length; i++) {
                copiedDatas[Number(source.droppableId)].tasks[i].index = i;
            }
            copiedDatas[Number(destination.droppableId)].tasks.splice(destination.index, 0, removed);
            for (let i = destination.index; i < copiedDatas[Number(destination.droppableId)].tasks.length; i++) {
                copiedDatas[Number(destination.droppableId)].tasks[i].index = i;
            }

            setDatas(copiedDatas);

            APICaller('tasks/move', 'POST', {
                boardID: props.boardID,
                columnSource: Number(source.droppableId),
                columnDestination: Number(destination.droppableId),
                indexSource: source.index,
                indexDestination: destination.index
            })
                .then(res => {
                    setCanDrag(true);
                    handleRealTime();
                    setIsLoad(false);

                })
                .catch(err => {
                    setRealTime(!realtime);
                    setError(true)
                    setIsLoad(false);
                })

        }
        else {
            const copiedDatas = datas.map(data => {
                if (data.column.value === Number(source.droppableId)) {
                    const result = [...data.tasks];
                    const [removed] = result.splice(source.index, 1);
                    result.splice(destination.index, 0, removed);

                    const start = source.index > destination.index ? destination.index : source.index
                    for (let i = start; i < result.length; i++) {
                        result[i].index = i;
                    }

                    data.tasks = result;
                }
                return data;
            });
            setDatas(copiedDatas);

            APICaller('tasks/reorder', 'POST', {
                boardID: props.boardID,
                column: Number(source.droppableId),
                indexSource: source.index,
                indexDestination: destination.index
            })
                .then(res => {
                    setCanDrag(true);
                    handleRealTime();
                    setIsLoad(false);
                })
                .catch(err => {
                    setRealTime(!realtime);
                    setError(true)
                    setIsLoad(false);
                })
        }

    }

    const handleRealTime = () => {
        setRealTime(!realtime)
    }

    if (!isExist) return (<h1>This board does not exist</h1>)
    return (
        <>
            {
                isLoad ?
                    <div className={classes.load}>
                        <CircularProgress color="secondary" />
                    </div>
                    : <></>
            }

            <Grid container spacing={2} style={isLoad ? { opacity: '0.5' } : {}}>

                {<CustomizedSnackbars open={error} type="error" message="Bạn thao tác nhanh quá, tôi không xử lý kịp" />}
                <DragDropContext onDragEnd={onDragEnd}>
                    {datas.map(data =>
                        <ColumnItem infor={data.column} key={data.column._id}
                            boardID={props.boardID} columnType={data.column.value}
                            tasks={data.tasks} onAddNewTask={handleAddNewTask}
                            onDeleteTask={handleDeteleTask}
                            onEditTask={handleEditTask}
                            onRealTime={handleRealTime}
                            canDrag={canDrag} />
                    )}
                </DragDropContext>

            </Grid></>
    );
}

export default ColumnList;

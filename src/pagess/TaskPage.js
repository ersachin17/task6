import React, { useEffect, useState } from 'react'
import TaskForm from '../Components/TaskForm'
import TaskList from '../Components/TaskList'
import TaskAssignyForm from '../Components/TaskAssignyForm'
import { v4 as uuidv4 } from 'uuid';
import { auth, db } from '../Firebase';
// import { collection, doc, getDoc, getDocs } from 'firebase-firestore'
import { collection, doc, getDoc, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

let todos = [
    {
        id : uuidv4(),
        title : 'buy car',
        description : 'buy a new car',
        level : 'low',
        assignee : 'surya',
        createdAt : new Date().toString().slice(0, 25),
        // createdBy : ''
    },
    {
        id : uuidv4(),
        title : 'buy car 2',
        description : 'buy a new car',
        level : 'medium',
        assignee : 'surya',
        createdAt : new Date().toString().slice(0, 25)

    },
    {
        id : uuidv4(),
        title : 'buy car 3',
        description : 'buy a new car',
        level : 'high',
        assignee : 'shivam',
        createdAt : new Date().toString().slice(0, 25)
    },
]

const assignees = [];

todos.forEach(task => {
 if(!assignees.includes(task.assignee)){
    assignees.push(task.assignee)
 }
});


const TaskPage = () => {
  const navigate = useNavigate()

    const [taskList, setTaskList] = useState([])
    const [totalAssignee, setTotalAssignee] = useState([])

    const [user, setUser] = useState("")
    const [fetchingUser, setFetchinUser] = useState(true)
     
   useEffect(() => {
    auth.onAuthStateChanged(async(user) => {
      if(user){
        setUser({ uid : user.uid, name : user.displayName, email : user.email })

        const docRef = doc(db, "assignees", user.uid);
        const docSnap = await getDoc(docRef);
        
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const assignees = docSnap.data().totalAssignees || []
            setTotalAssignee(assignees)

          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }

          const todoRef = doc(db, "todos", user.uid);
          const todoSnap = await getDoc(todoRef);

          if (todoSnap.exists()) {
                console.log("Document data:", todoSnap.data());
                const tasks = todoSnap.data().assinedTask || []
                setTaskList(tasks)

          } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
          }

        setFetchinUser(false)
      }else {
        navigate('/login')}
    })
   },[])

  return (
    <>
    {
        fetchingUser ? <div className='font-bold'>Loading...</div> : 
        <>
            <TaskAssignyForm setTotalAssignee={setTotalAssignee} totalAssignee={totalAssignee} user={user} />
            <TaskForm taskList={taskList} setTaskList={setTaskList} totalAssignee={totalAssignee} user={user} />
            <TaskList taskList={taskList} setTaskList={setTaskList} totalAssignee={totalAssignee} user={user}   />
        </>
    }
    </>
  )
}

export default TaskPage;

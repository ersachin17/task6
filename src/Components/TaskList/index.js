import React from 'react'
import LowTask from '../Tasks/LowTask'
import MediumTask from '../Tasks/MediumTask'
import HighTask from '../Tasks/HighTask'
import { DragDropContext } from '@hello-pangea/dnd'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../Firebase'

const TaskList = ({ taskList, setTaskList, totalAssignee, user }) => {

  const onDragEnd = async(event) =>{
    const { destination, source, type, draggableId } = event
    console.log(event, 'event')
    console.log({ destination, source, type })
        if(!destination){
            return 
        }

        // DROPPED IN SAME POSITION
        if(destination.droppableId === source.droppableId && destination.index === source.index){
          return 
        }

        let newList = taskList.map((task, index) =>{
          console.log(task.id === draggableId)
            return task.id === draggableId ? { ...task, level : destination.droppableId.split('-')[1], assignee : destination.droppableId.split('-')[0] } : { ...task }
        })

        console.log(newList, 'New list')

        try {
          await setDoc(doc(db, "todos", user.uid), { assinedTask : newList });
          setTaskList(() => newList)

        } catch (error) {
          console.log(error, 'error')
        }
       
  }

  console.log(new Date().toString())
  console.log(new Date().toString().slice(0, 25))

  return (
    <DragDropContext onDragEnd={onDragEnd}>
    
      <h4 className='text-center bg-gray-400 text-black px- w-52 rounded-sm m-auto py-2 font-semibold'>Todo List</h4>
    <div className=' w-[50%] mx-auto'>
      <section class="text-gray-600 body-font">
        <div class="my-3">

        {
          totalAssignee.map((assignee) =>{
            const assigneeTasks = taskList.filter((task) => task.assignee === assignee)
            return <div key={assignee}>
              <h4 className=' my-2 py-2 pl-5 rounded-md font-medium text-black w-72 bg-blue-400 mt-12 m-auto' >List Name : {assignee}</h4>
              <div class="flex gap-2">
                <LowTask tasks={assigneeTasks.filter((task) => task.level === 'low')} assignee={assignee} />
                
                <MediumTask tasks={assigneeTasks.filter((task) => task.level === 'medium')} assignee={assignee} />
            
                <HighTask tasks={assigneeTasks.filter((task) => task.level === 'high')} assignee={assignee} />
              </div>
            </div>
          })
        }
        </div>
      </section> 
    </div>
    </DragDropContext>
  )
}

export default TaskList

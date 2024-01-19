import React from 'react'
import Task from './Task'
import { Droppable } from '@hello-pangea/dnd'

const HighTask = ({ tasks, assignee }) => {
  return (
    <Droppable droppableId={assignee + '-high'} type='card'>
    {(provided) => {
        return <div {...provided.droppableProps} ref={provided.innerRef} class="p-4 lg:w-1/3 border-2 min-h-[200px]">
        <h1 className='text-center font-semibold text-blue-800'>High</h1>  
        <div className='todos-container mt-4'>
            {tasks.map((task, index) => <Task key={task.id} task={task} index={index} /> )} 
        </div>
    </div>
    }}
    </Droppable>
  )
}

export default HighTask

import React from 'react'
import Task from './Task'
import { Droppable } from '@hello-pangea/dnd'

const MediumTask = ({tasks, assignee}) => {
  return (
    <Droppable droppableId={assignee + '-medium'} type='card'>
    {(provided) => {
       return <div {...provided.droppableProps} ref={provided.innerRef} class="p-4 lg:w-1/3 border-2 min-h-[200px]">
            <h1 className='text-center font-semibold text-blue-800'>Medium</h1>  
            <div className=' mt-4'>
                {tasks.map((task, index) => <Task key={task.id} task={task} index={index} /> )}      
            </div>   
        </div>
    }}
    </Droppable>
  )
}

export default MediumTask

import { Draggable } from '@hello-pangea/dnd'
import React from 'react'

const Task = ({ task, index }) => {
  return (
    <Draggable draggableId={`${task.id}`} index={index} assignee={task.assignee}>
         {
            (provided) =>{
               return <div {...provided.draggableProps} ref={provided.innerRef} {...provided.dragHandleProps} className='border-2 border-blue-500 py-2 mb-2 cursor-pointer'>
                    <h4 className='px-1 font-semibold'>
                    Task Name : <span className='text-black'>{task.title}</span> 
                    </h4>
                    <p className='px-1 mt-2'>
                    Description : <span className='text-black'>{task.description}</span>
                    </p>
                    <p className='px-1 mt-2'>
                    Priority : <span className='text-black'>{task.level}</span>
                    </p>
                    <p className='px-1 mt-2'>
                    List Name : <span className='text-black'>{task.assignee}</span>
                    </p>
                </div>        
            }}
    </Draggable>
  )
}

export default Task

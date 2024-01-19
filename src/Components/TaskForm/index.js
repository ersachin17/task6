import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import { db } from '../../Firebase';
import { doc, setDoc } from 'firebase/firestore';
const TaskForm = ({ taskList, setTaskList, totalAssignee, user }) => {
    const [formState, setFormState] = useState({ title : '', description : '', level : 'low', assignee : totalAssignee[0] || '' })

    
    const handleSubmit = async(e) =>{
        e.preventDefault()
        console.log('submit')
        
        try {

          const newTaskList = [...taskList, { id : uuidv4(), createdBy : user.uid, createdAt : new Date().toString().slice(0, 25), ...formState }]

          await setDoc(doc(db, "todos", user.uid), {assinedTask : newTaskList});
          setTaskList(newTaskList)
          setFormState((pre) =>({ ...pre, title : '', description : '', level : 'low', }))

        } catch (error) {
          console.log(error, 'error')
        }


    }

  return (
    <form onSubmit={handleSubmit} class="text-gray-600 body-font relative">
    <div class="container px-5 py-24 mx-auto">
      
      <div class="lg:w-1/2 md:w-2/3 mx-auto">
        <div class="flex flex-wrap -m-2">
          <div class="p-2 w-full">
            <label for="small" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">SelectList </label>
            <div class="relative">
            <select id="small" value={formState.assignee} onChange={(e) => setFormState(pre=>({...pre, assignee : e.target.value }))} required class=" bg-gray-50  rounded border border-gray-300  h-8 pr-72">
              <option value=''>Select List</option>
              {totalAssignee.map(assingee =><option value={assingee}>{assingee}</option>)}
            </select>   
            </div>
          </div>
          <div class="p-2 w-full">
              <label for="name" class="leading-7 text-sm font-medium text-black">Task Name</label>
            <div class="relative">
              <input placeholder='Enter Task name' type="text" id="name" name="title" value={formState.title} onChange={(e) => setFormState((pre) =>({...pre, title : e.target.value}))} required class=" bg-gray-50  rounded border border-gray-300  h-8 pr-72" />
            </div>
          </div>
  
          <div class="p-2 w-full">
              <label for="message" class="leading-7 text-sm bold  font-medium text-black">Description</label>
            <div class="relative">
              <textarea placeholder='Enter description' required id="message" name="description" value={formState.description} onChange={(e) => setFormState((pre) =>({...pre, description : e.target.value}))} class="bg-gray-50  rounded border border-gray-300  h-8 pr-72"></textarea>
            </div>
          </div>
  
          <div>
              <h3 className='mb-2 font-medium text-black'>Priority</h3>
              <div className='flex'>
                  <div class="flex items-center mr-5">
                          <input id="low" checked type="radio" value="low" onChange={(e) => setFormState(pre =>({
                            ...pre, level : e.target.value
                          })) } name="level" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                          <label for="low" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Low</label>
                  </div>
                  <div class="flex items-center mr-5">
                          <input id="medium" type="radio" value="medium" onChange={(e) => setFormState(pre =>({
                            ...pre, level : e.target.value
                          })) } name="level" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <label for="medium" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">Medium</label>
                  </div>
                  <div class="flex items-center mr-5">
                          <input id="high" type="radio" value="high" onChange={(e) => setFormState(pre =>({
                            ...pre, level : e.target.value
                          })) } name="level" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"/>
                          <label for="high" class="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">High</label>
                  </div>
          <div class="p-2 w-full">
            <button className=" text-center mx-auto text-white bg-purple-500 border-0  px-4  rounded ">Add Task</button>
          </div>
              </div>
          </div>
  
  
        
        </div>
      </div>
    </div>
  </form>
  )
}

export default TaskForm

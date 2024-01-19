import { doc, setDoc } from 'firebase/firestore'
import React, { useState } from 'react'
import { db } from '../Firebase'

const TaskAssignyForm = ({ setTotalAssignee, totalAssignee, user }) => {
  const [assigny, setAssigny] = useState('')

  const createAssignee = async(assigny) =>{
    try {

      const newAssigneesList = [...totalAssignee, assigny]

      await setDoc(doc(db, "assignees", user.uid), { totalAssignees : newAssigneesList });
      
      setTotalAssignee(newAssigneesList)
      setAssigny('')


    } catch (error) {
      console.log(error, 'error')
      alert(error.message)
    }

  }
  return (
    <div className='w-fit mx-auto'>
      <h4 className='text-center bg-gray-400 w-fit mx-auto px-2 py-2 rounded-md'>Welcome To user in Todo app</h4>
                <input type="text" id="name" name="name" value={assigny} onChange={(e) => setAssigny(() =>e.target.value)} placeholder='Enter list name' required  style={{border:"1px solid black", borderRadius:"4px"}} className='pr-52 mt-5 h-10'/>
      <button className='bg-purple-500 text-white px-3 py-1 rounded-md ml-2' onClick={() =>{
        if(totalAssignee.includes(assigny)){
          alert("This assingee already present")
          return
        }
        
        createAssignee(assigny)
      }}>Add List</button>
    </div>
  )
}

export default TaskAssignyForm

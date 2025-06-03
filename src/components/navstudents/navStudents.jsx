import { useEffect, useState } from "react"

const NavStudents = ({students, studentActive, setStudentActive}) => {


  const handleClick=(student)=>{
    setStudentActive(student)
  }

  return (
    <div className="bg-[#64748B] w-full p-4">
      {students.map((student) => (
        <button
          key={student.id_student}
          className={ `p-2 rounded-xl shadow-md text-black my-4 flex items-center justify-center w-full hover:bg-gray-400 cursor-pointer
            ${student.atRisk?'bg-red-500' : 'bg-green-300'}`
          }
          onClick={()=>handleClick(student)}
        
        >
          <h2 className="text-lg font-bold">{student.student.name} {student.student.lastname}</h2>
          {/* <p>Email: {student.email}</p> */}
        </button>
      ))}
    </div>
  )
}

export default NavStudents
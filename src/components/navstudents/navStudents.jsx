import { useEffect, useState } from "react"
import AddStudent from "./addStudent"
import { data } from "react-router-dom"

const NavStudents = ({students, studentActive, setStudentActive, setRechargeNavbarStudents,subject, rechargeNavbarStudents }) => {
  
 const [addStudentActive, setAddStudentActive] = useState(false) //se toco el boton agregar estudiante?
  
  const handleClick=(student)=>{
    setStudentActive(student)
  }


  return (
    <div className="bg-[#64748B] w-full p-4 min-h-screen">

      <div className="mx-auto flex justify-center">
          <button 
            className="button2"
            onClick={()=>setAddStudentActive(true)}
            >Agregar estudiante</button>
        </div>

      {students.map((student) =>( 
        <button
          key={student.id_student}
          className={ `button3 ${student.totalPoints === 0? 'bg-amber-200' : student.atRisk? 'bg-red-500' : 'bg-green-300'}`
          }
          onClick={()=>handleClick(student)}
        >
          <p className="text-lg font-bold">{student.student.name} {student.student.lastname}</p>
        </button>
      ))}
   
    {
      addStudentActive && 
      (<AddStudent 
          addStudentActive = {addStudentActive} //para saber si se clickeo o no el boton agregar estudiante
          setAddStudentActive={setAddStudentActive} //boton para sacar el form
          setRechargeNavbarStudents = {setRechargeNavbarStudents}
          subject={subject}
      />)
    }

    </div>
  )
}

export default NavStudents
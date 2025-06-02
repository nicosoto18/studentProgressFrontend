import { useEffect, useState } from "react"

const NavStudents = () => {
  const [students, setStudents] = useState([])

  useEffect(() => {
    fetch("http://localhost:4000/students")
      .then((res) => res.json())
      .then((data) => {
          setStudents(data)
          console.log(data)      
        }
    )
      .catch((error) => console.error("Error fetching students:", error))
  }, [])

  return (
    <div className="bg-[#64748B] w-full p-4">
      {students.map((student) => (
        <button
          key={student.id_student}
          className="bg-white p-2 rounded-xl shadow-md text-black my-4 flex items-center justify-center w-full hover:bg-gray-400 cursor-pointer"
        >
          <h2 className="text-lg font-bold">{student.name} {student.lastname}</h2>
          {/* <p>Email: {student.email}</p> */}
        </button>
      ))}
    </div>
  )
}

export default NavStudents
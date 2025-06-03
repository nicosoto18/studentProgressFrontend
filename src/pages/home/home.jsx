import { useEffect, useState } from "react"
import NavStudents from "../../components/navstudents/navStudents";
import ProgressGraph from "../../components/progressgraph/progressGrap";

const Home = ()=>{

    const idSubject = "224648e4-3283-44ca-a3d2-b35a2b7caeb0" //esto no debe quedar asi
    const [students, setStudents] = useState([])
    const [studentActive, setStudentActive] = useState({});

    useEffect(() => {
    fetch(`http://localhost:4000/analyticsController/studentsBySubject/${idSubject}`)
      .then((res) => res.json())
      .then((data) => {
          setStudents(data) 
        }
    )
      .catch((error) => console.error("Error fetching students:", error))
  }, [])

    return(
        <div>
            <section className="flex">
                <div className="flex w-[20%] h-screen mr-auto">
                    <NavStudents students={students} studentActive={studentActive} setStudentActive={setStudentActive}/>
                </div>
                <div className="flex w-[80%] ml-auto">
                    <div className="mx-auto my-auto w-[90%]">
                        { studentActive.id_student && (<ProgressGraph studentActive={studentActive}/>)}
                    </div>
                </div>
            </section>


        <h2>SOY EL HOMEEE</h2>
        </div>
    )
}

export default Home; 


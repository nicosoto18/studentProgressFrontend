import { useEffect, useState } from "react";
import NavStudents from "../../components/navstudents/navStudents";
import ProgressGraph from "../../components/progressgraph/progressGrap";
import NavBar from "../../components/navbar/navBar";

const Home = () => {
    const idTeacher = "afcc48ea-1540-4be8-adc4-0650a5d58345";
    const subject = "b2fa0671-62ac-4797-af6d-1f2bd18d1c66"
    const [students, setStudents] = useState([]);
    const [studentActive, setStudentActive] = useState(null);

    //recargar componentes  recargarnavbar, recargarestudiantesmateria
    const [rechargeNavbar, setRechargeNavbar] = useState(0);
    const [rechargeNavbarStudents, setRechargeNavbarStudents] = useState(0)

    //trae todas los estudiantes
    useEffect(() => {
        const fetchStudents = async () => {
            const res = await fetch(`http://localhost:4000/analyticsController/studentsBySubject/${subject}`);
            const data = await res.json();
            setStudents(data);
        };
        fetchStudents().catch(console.error);
    }, [rechargeNavbarStudents]);


    return (
        <div>
            <section className="w-full">
                <NavBar
                    idTeacher={idTeacher}   
                    setRechargeNavbar = {setRechargeNavbar}
                    setRechargeNavbarStudents = {setRechargeNavbarStudents}
                />
            </section>

            <section className="flex">
                <div className="flex w-[20%] min-h-screen mr-auto">
                    <NavStudents
                        students={students}
                        studentActive={studentActive}
                        setStudentActive={setStudentActive}
                        setRechargeNavbarStudents={setRechargeNavbarStudents}
                        subject={subject}
                        rechargeNavbarStudents = {rechargeNavbarStudents}
                    />
                </div>

                <div className="flex w-[80%] ml-auto">
                    <div className="mx-auto mt-10 w-[90%]">
                        {studentActive?.id_student && (
                            <ProgressGraph
                                studentActive={studentActive}
                                setStudentActive={setStudentActive}
                                setRechargeNavbarStudents={setRechargeNavbarStudents}
                                subject ={subject}
                            />
                        )}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Home;

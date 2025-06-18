import React, { useEffect, useState } from "react";

const NavBar = ({ idTeacher, setRechargeNavbar, setRechargeNavbarStudents}) => {
  
 

  return (
    <div className="bg-gray-700 flex p-2 ">
       
        {/* <section className="w-[20%] flex">
            <div className="mx-auto">
                    {allSubjectsTeacher.length > 0 ? ( 
                        <select
                        className="button2"
                        onChange={handleChange}
                        >
                        {allSubjectsTeacher.map((subject) => (
                            <option key={subject.id_subject} value={subject.id_subject}>
                            {subject.subject_name}
                            </option>
                        ))}
                        </select>
                    ) : (
                        <p className="text-white">Cargando materias o ninguna materia asignada...</p>
                        )}
            </div>
        </section>
        
        <section>
            <CreateSubject idTeacher={idTeacher} setRechargeNavbar={setRechargeNavbar}  />
        </section> */}

    </div>
  );
};

export default NavBar;
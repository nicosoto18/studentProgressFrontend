import { useEffect, useState } from "react";
import Swal from 'sweetalert2';

const AddStudent = ({ addStudentActive, setAddStudentActive, setRechargeNavbarStudents, subject}) => {                                                          

    const [name, setName] = useState("");
    const [lastname, setLastName] = useState("");

    
    const onSubmitRegisterStudent = (e) => {
        console.log(name);
        console.log(lastname);
         console.log(subject);


        e.preventDefault();
        fetch('http://localhost:4000/students', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name: name, lastname: lastname, id_subject: subject}),
        })
        .then(response => response.json())
        .then(data => {
                Swal.fire(
                '¡Estudiante agregado!',
                'Tu operación se ha completado con éxito.',
                'success'
                );
            setRechargeNavbarStudents(prev=>prev+1);
            setAddStudentActive(false);
            setName("");
            setLastName("");
        })
        .catch((error) => {
             Swal.fire({
                icon: 'error',
                title: '¡Oops...',
                text: 'Algo salió mal. Inténtalo de nuevo.',
              });
            console.error('Error al registrar el alumno:', error);
        });
    };

    return (
        <div>
            {addStudentActive && (
                <div className="min-w-84 z-50 bg-[#64748B] absolute left-1/2 transform -translate-x-1/2 top-1/4 p-2 rounded-lg">
                    <h2 className="mx-auto flex text-center justify-center">Registrar alumno</h2>
                    <form className="flex flex-col mt-6 gap-4" onSubmit={onSubmitRegisterStudent}>
                        <div>
                            <input
                                type="text"
                                placeholder="Nombre..."
                                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                            />
                        </div>
                        <div>
                            <input
                                type="text"
                                placeholder="Apellido..."
                                className="w-full p-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                value={lastname} 
                                onChange={(e) => setLastName(e.target.value)} 
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <button className="buttonCancel" onClick={()=>setAddStudentActive(false)}>Cancelar</button>
                            <button type="submit" className="buttonSave"> Registrar alumno</button>

                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default AddStudent;
import { useState } from "react";
import Swal from 'sweetalert2';

const AddNoteForm = ({  studentActive, subject, onClose, setRechargeNavbarStudents}) => {
  const today = new Date().toISOString().split("T")[0];
 
  const [newNoteData, setNewNoteData] = useState({
    id_subject: subject,
    id_student: studentActive.id_student,
    type: "",
    date_grade: today,
    total_points: "",
    points_obtained: "",
    description: ""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setNewNoteData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:4000/grades", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newNoteData)
      });

        Swal.fire(
            'Nota agregada',
            'Tu operación se ha completado con éxito.',
            'success'
            );

      setRechargeNavbarStudents(prev=>prev+1)
      onClose();
    } catch (err) {
        console.error("Error al enviar la nota:", err);
        Swal.fire({
          icon: 'error',
          title: '¡Oops...',
          text: 'Algo salió mal. Inténtalo de nuevo.',
        });
    }
  };

  return (
    <div className="min-w-84 z-50 bg-[#64748B] absolute left-1/2 -translate-x-1/2 top-1/8 p-4 rounded-lg flex flex-col">
      <h2 className="mx-auto mb-5">Agregar nota a {studentActive.name}</h2>
      <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
        <input
          id="type"
          type="text"
          placeholder="Tipo de nota (Ej: Parcial, Laboratorio…) "
          value={newNoteData.type}
          onChange={handleChange}
        />

        <input
          id="date_grade"
          type="date"
          value={newNoteData.date_grade}
          onChange={handleChange}
        />

        <input
          id="total_points"
          type="number"
          placeholder="Puntos totales"
          value={newNoteData.total_points}
          onChange={handleChange}
        />

        <input
          id="points_obtained"
          type="number"
          placeholder="Puntos obtenidos"
          value={newNoteData.points_obtained}
          onChange={handleChange}
        />

        <textarea
          id="description"
          placeholder="Descripción (opcional)…"
          rows={3}
          value={newNoteData.description}
          onChange={handleChange}
        />

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="buttonCancel"
          >
            Cancelar
          </button>
          <button
            type="submit"
            className="buttonSave"
          >
            Guardar
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNoteForm;

import { useState } from "react";
import Swal from "sweetalert2";

const CreateSubject = ({ idTeacher, setRechargeNavbar}) => {
  const [isAddSubjectOpen, setIsAddSubjectOpen] = useState(false);
  const [nameSubject, setNameSubject] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:4000/subjects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject_name: nameSubject,
          id_teacher: idTeacher,
        }),
      });

      if (!response.ok) {
        throw new Error("Error en la respuesta del servidor");
      }

      await response.json();

      Swal.fire(
        "¡Materia agregada!",
        "Tu operación se realizó con éxito.",
        "success"
      );

      setNameSubject("");
      setIsAddSubjectOpen(false);
      setRechargeNavbar(true);

    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "¡Oops…",
        text: "Algo salió mal. Inténtalo de nuevo.",
      });
      console.error("Error al registrar la materia:", error);
    }
  };

  return (
    <div>
      {!isAddSubjectOpen && (
        <button
          className="button2"
          onClick={() => setIsAddSubjectOpen(true)}
        >
          Agregar materia
        </button>
      )}

      {isAddSubjectOpen && (
        <section className="absolute z-50 left-1/2 -translate-x-1/2 top-1/4 min-w-[21rem] rounded-lg bg-slate-500 p-6">
          <h2 className="mb-6 text-center text-xl font-bold text-amber-50">
            Añadir materia
          </h2>

          <form onSubmit={()=>handleSubmit()} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Nombre de la materia…"
              value={nameSubject}
              onChange={(e) => setNameSubject(e.target.value)}
              className="w-full rounded-md border border-gray-300 p-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />

            <div className="flex justify-end gap-2">
              <button
                type="button"
                className="buttonCancel"
                onClick={() => setIsAddSubjectOpen(false)}
              >
                Cancelar
              </button>
              <button type="submit" className="buttonSave">
                Añadir materia
              </button>
            </div>
          </form>
        </section>
      )}
    </div>
  );
};

export default CreateSubject;

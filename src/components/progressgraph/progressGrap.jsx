import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import ConfigureRecharts from "./configureRecharts";
import AddNoteForm from "./addNoteForm";
import { deleteStudent } from "../../api/deleteStudent";

const ProgressGraph = ({ studentActive, setRechargeNavbarStudents, setStudentActive, subject }) => {

  const [data, setData] = useState([]);
  const [isAddNoteOpen, setIsAddNoteOpen,] = useState(false);

  const totalObtained = data.reduce((sum, item) => sum + item.obtainedPoints, 0);
  const totalPossible = data.reduce((sum, item) => sum + item.totalPoints, 0);
  const avgProgress = totalPossible > 0 ? (totalObtained / totalPossible) * 100 : 0;
  const lineColor = data.length === 0 ? '#FFFFFF' : avgProgress < 60 ? 'red' : '#82ca9d';

  useEffect(() => {
    if (!studentActive || !studentActive.id_student || !subject) {
      setData([]);
      return;
    }

    const fetchProgress = async () => {
      try {
        const res = await fetch(`http://localhost:4000/students/${studentActive.id_student}/${subject}`);

        if (!res.ok) {
          throw new Error(`Error HTTP! Status: ${res.status}`);
        }

        const json = await res.json();

        const formatted = json.progres.map((entry) => ({
          date: new Date(entry.date).toLocaleDateString(),
          performance: entry.performance,
          totalPoints: entry.totalPoints,
          obtainedPoints: entry.obtainedPoints,
          title: entry.title,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error al obtener datos:", err);
        setData([]);
      }
    };

    setRechargeNavbarStudents(prev => prev + 1);
    fetchProgress();
  }, [studentActive, isAddNoteOpen, subject, setRechargeNavbarStudents]);

  const handleDelete = async () => {
    try {
      await deleteStudent(studentActive.id_student);
      setRechargeNavbarStudents(prev => prev + 1);
      setStudentActive(null);
    } catch (error) {
      console.error('No se pudo eliminar el estudiante:', error);
    }
  }

  return (
    <div className="p-4">
      {!isAddNoteOpen && (
        <button className="button2 absolute left-1/2 top-8" onClick={() => setIsAddNoteOpen(true)}>
          Agregar nota a {studentActive?.name}
        </button>
      )}

      {isAddNoteOpen && (
        <AddNoteForm
          studentActive={studentActive}
          onClose={() => setIsAddNoteOpen(false)}
          setRechargeNavbarStudents={setRechargeNavbarStudents}
          subject={subject}
        />
      )}

      {!isAddNoteOpen && (
        <button className="button2 absolute right-1/6 top-8" onClick={() => handleDelete()}>
          Borrar estudiante
        </button>
      )}

      {/* Título y Gráfico */}
      <div className="w-full h-96 mb-8">
        <h2 style={{ color: lineColor }} className="mb-2 ml-5 text-xl font-semibold">
          Progreso de {studentActive?.student?.name} {studentActive?.lastname}
        </h2>
        <ResponsiveContainer>
          <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#9ca3af" />
            <YAxis domain={[0, 100]} stroke="#9ca3af" tickFormatter={(val) => `${val}%`} />
            <Tooltip content={<ConfigureRecharts />} />
            <Line type="monotone" dataKey="performance" stroke={lineColor} strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </div>



      {/* Tabla de Notas */}
      {data.length > 0 && (
        <div className="overflow-x-auto rounded-lg shadow-md border border-gray-200 mt-20">
          <h3 className="text-lg font-semibold text-white px-4 pt-4">Detalle de Notas</h3>
          <table className="min-w-full divide-y divide-gray-200 mt-3">
            <thead className="bg-gray-100">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Fecha</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Título</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Puntos Obtenidos</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Puntos Totales</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">Rendimiento (%)</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {data.map((item, index) => (
                <tr key={index} className={index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.obtainedPoints}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.totalPoints}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{item.performance ? item.performance.toFixed(2) : 'N/A'}%</td>
                </tr>
              ))}
              <tr className="bg-gray-200 font-bold">
                <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-800">Promedio General</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{avgProgress.toFixed(2)}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ProgressGraph;
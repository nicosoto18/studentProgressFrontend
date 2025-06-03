import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


const ProgressGraph = ({studentActive})=>{

    const [data, setData] = useState([]);
    
    //calcular promedio
    const avgProgress = data.length > 0? data.reduce((sum, item) => sum + item.performance, 0) / data.length: 0;

    //elegir color basado en promedio
    const lineColor = avgProgress < 60 ? 'red' : '#82ca9d';

    //despues debo cambiar y recibir subject id por parametro
    const id_subject = "224648e4-3283-44ca-a3d2-b35a2b7caeb0"
    
   
    useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch(`http://localhost:4000/students/${studentActive.id_student}/${id_subject}`);
        const json = await res.json();

        // Procesar fechas
        const formatted = json.progres.map((entry) => ({
          date: new Date(entry.date).toLocaleDateString(),
          performance: entry.performance,
        }));

        setData(formatted);
      } catch (err) {
        console.error("Error al obtener datos:", err);
      }
    };

    fetchProgress();
  }, [studentActive]);

    return(
        <div>
            <div style={{ width: "100%", height: 400 }}>
                <h2 style={{color: lineColor}} className="mb-2 ml-5">Progreso de {studentActive.student.name} {studentActive.student.lastname}</h2>
                <ResponsiveContainer>
                    <LineChart data={data} width={100} height={400}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" stroke="#9ca3af" />
                    <YAxis domain={[0, 100]} stroke="#9ca3af" tickFormatter={(val) => `${val}%`} />
                    <Tooltip formatter={(val) => `${val}%`} />
                    <Line type="monotone" dataKey="performance" stroke={lineColor} strokeWidth={2} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    )
}

export default ProgressGraph;



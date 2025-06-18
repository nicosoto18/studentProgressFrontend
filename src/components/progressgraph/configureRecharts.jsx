import { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";


const ConfigureRecharts = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        // payload[0].payload contiene el objeto completo del entry de datos
        const dataPoint = payload[0].payload;
        return (
            <div className="custom-tooltip bg-gray-800 text-white p-3 rounded-md shadow-lg border border-gray-700">
                <p className="label font-bold mb-1">{`Fecha: ${label}`}</p>
                <p className="intro">{`Rendimiento: ${dataPoint.performance}%`}</p>
                {/* Aquí mostramos la información adicional */}
                <p className="intro">{`Título: ${dataPoint.title}`}</p>
                <p className="intro">{`Puntos Obtenidos: ${dataPoint.obtainedPoints}`}</p>
                <p className="intro">{`Puntos Totales: ${dataPoint.totalPoints}`}</p>
            </div>
        );
    }
    return null;
};


export default ConfigureRecharts;


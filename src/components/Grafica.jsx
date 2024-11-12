import React, { useRef, useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import {jsPDF} from "jspdf";
import autoTable from 'jspdf-autotable';

// Registrar los componentes necesarios de Chart.js
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  BarElement
);

const colores = [
    'rgba(239, 55, 65, 0.5)',
    'rgba(250, 162, 27, 0.5)',
    'rgba(89, 44, 128, 0.5)',
    'rgba(91, 192, 235, 0.5)',
    'rgba(155, 197, 61, 0.5)',
    'rgba(45, 71, 57, 0.5)',
    'rgba(9, 129, 74, 0.5)',
    'rgba(228, 183, 229, 0.5)',
    'rgba(178, 136, 192, 0.5)',
];

const borderColores = [
    'rgba(239, 55, 65, 1)',
    'rgba(250, 162, 27, 1)',
    'rgba(89, 44, 128, 1)',
    'rgba(91, 192, 235, 1)',
    'rgba(155, 197, 61, 1)',
    'rgba(45, 71, 57, 1)',
    'rgba(9, 129, 74, 1)',
    'rgba(228, 183, 229, 1)',
    'rgba(178, 136, 192, 1)',
];

function Grafica({labels, data, title, tituloLocal}) {
    const graficaRef = useRef(null);

    // Limpiar la instancia del gráfico al desmontar el componente
    useEffect(() => {
        return () => {
            if (graficaRef.current) {
                graficaRef.current.destroy();
            }
        };
    }, []);

    const dataGrafica = {
        labels: labels,
        datasets: [
            {
                label: tituloLocal,
                data: data,
                fill: true,
                backgroundColor: colores,
                borderColor: borderColores,
            },
        ],
    }

    const opciones = {
        plugins: {
            legend: {
                position: 'top'
            },
            title: {
                display: true,
                text: title,
            },
        },
    }

    const descargarGrafica = () => {
        const canvas = graficaRef.current?.canvas;
        if (!canvas) return;

        const img = canvas.toDataURL('image/png');
        const pdf = new jsPDF();
        pdf.setFontSize(16);
        pdf.setFont('helvetica', 'bold');
        pdf.text(title, 10, 10);
        pdf.setFontSize(10);
        pdf.setFont('helvetica', 'normal');
        pdf.addImage(img, 'PNG', 10, 30, 190, 100);

        autoTable(pdf, {
            head: [['Entidad', tituloLocal]],
            body: [...labels.map((label, index) => [label, data[index]])],
            startY: 140,
        })
        pdf.save(`grafica_${title}.pdf`);
    }

    return (
        <div className="grafica" style={{width:"100%", display:"flex", flexDirection:"column", gap:"1rem", alignItems:"center"}}>
            <Bar data={dataGrafica} options={opciones} ref={graficaRef}/>
            <button type="button" className="button" onClick={descargarGrafica}>
                Descargar gráfica en PDF
            </button>
        </div>
    );
}

export default Grafica;
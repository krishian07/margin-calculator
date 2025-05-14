
import './index.css'
import { useState } from "react";

export default function GananciaCalculadora() {
  const [costo, setCosto] = useState(0);
  const [precio, setPrecio] = useState(0);
  const [margen, setMargen] = useState(null);
  const [mensajeError, setMensajeError] = useState("");
  const [margenObjetivo, setMargenObjetivo] = useState(0);
  const [precioSugerido, setPrecioSugerido] = useState(null);

  const calcularMargen = () => {
    if (precio <= 0) {
      setMensajeError("El precio debe ser mayor a 0.");
      setMargen(null);
      return;
    }
    if (costo < 0) {
      setMensajeError("El costo no puede ser negativo.");
      setMargen(null);
      return;
    }
    if (costo > precio) {
      setMensajeError("El costo no puede ser mayor que el precio.");
      setMargen(null);
      return;
    }

    const resultado = ((precio - costo) / precio) * 100;
    setMargen(parseFloat(resultado.toFixed(2)));
    setMensajeError("");
  };

  const calcularPrecioSugerido = () => {
    if (margenObjetivo <= 0 || margenObjetivo >= 100) {
      setMensajeError("El margen objetivo debe ser mayor que 0 y menor que 100.");
      setPrecioSugerido(null);
      return;
    }
    if (costo < 0) {
      setMensajeError("El costo no puede ser negativo.");
      setPrecioSugerido(null);
      return;
    }
    const sugerido = costo / (1 - margenObjetivo / 100);
    setPrecioSugerido(parseFloat(sugerido.toFixed(2)));
    setMensajeError("");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full shadow-lg bg-white p-6 rounded-xl space-y-4">
        <h1 className="text-xl font-bold text-center">Calculadora de Margen de Ganancia</h1>

        <div>
          <label className="block text-sm mb-1">Costo del producto ($)</label>
          <input
            className="w-full border rounded px-2 py-1"
            type="number"
            value={costo}
            onChange={(e) => setCosto(parseFloat(e.target.value))}
            min={0}
          />
        </div>

        <div>
          <label className="block text-sm mb-1">Precio de venta ($)</label>
          <input
            className="w-full border rounded px-2 py-1"
            type="number"
            value={precio}
            onChange={(e) => setPrecio(parseFloat(e.target.value))}
            min={0}
          />
        </div>

        <button className="w-full bg-green-600 text-white rounded px-4 py-2" onClick={calcularMargen}>
          Calcular Margen
        </button>

        {margen !== null && (
          <div className="text-center text-lg font-medium text-green-700">
            Margen: {margen}%
          </div>
        )}

        <hr className="my-4" />

        <div>
          <label className="block text-sm mb-1">Margen objetivo (%)</label>
          <input
            className="w-full border rounded px-2 py-1"
            type="number"
            value={margenObjetivo}
            onChange={(e) => setMargenObjetivo(parseFloat(e.target.value))}
            min={0}
            max={99.99}
          />
        </div>

        <button className="w-full bg-blue-600 text-white rounded px-4 py-2" onClick={calcularPrecioSugerido}>
          Calcular Precio Sugerido
        </button>

        {precioSugerido !== null && (
          <div className="text-center text-lg font-medium text-blue-700">
            Precio sugerido: ${precioSugerido}
          </div>
        )}

        {mensajeError && (
          <div className="text-center text-sm text-red-600">
            {mensajeError}
          </div>
        )}
      </div>
    </div>
  );
}

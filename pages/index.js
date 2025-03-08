import { useState } from 'react';

export default function Home() {
  const [producto, setProducto] = useState('');
  const [valor, setValor] = useState('');
  const [peso, setPeso] = useState('');
  const [transporte, setTransporte] = useState('Aéreo');
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [alto, setAlto] = useState('');
  const [numPaquetes, setNumPaquetes] = useState('');
  const [cotizacion, setCotizacion] = useState(null);

  const calcularCotizacion = () => {
    const valorNumerico = parseFloat(valor);
    const pesoNumerico = parseFloat(peso);
    const largoNumerico = parseFloat(largo);
    const anchoNumerico = parseFloat(ancho);
    const altoNumerico = parseFloat(alto);
    const numPaquetesNumerico = parseInt(numPaquetes);

    if (isNaN(valorNumerico) || isNaN(pesoNumerico) || isNaN(largoNumerico) || isNaN(anchoNumerico) || isNaN(altoNumerico) || isNaN(numPaquetesNumerico)) {
      alert('Por favor, completa todos los campos con valores numéricos válidos.');
      return;
    }

    const volumen = (largoNumerico * anchoNumerico * altoNumerico) / 1000000 * numPaquetesNumerico; // Volumen en m3
    const pesoVolumetrico = volumen * 167; // Peso volumétrico aproximado para aéreo

    const pesoFinal = transporte === 'Aéreo' ? Math.max(pesoNumerico, pesoVolumetrico) : pesoNumerico;

    let costo = 0;
    if (transporte === 'Aéreo') {
      costo = pesoFinal * 10 + valorNumerico * 0.05; // Ejemplo de tarifas aéreas
    } else if (transporte === 'Courrier') {
      costo = pesoFinal * 8 + valorNumerico * 0.04;
    } else if (transporte === 'Marítimo') {
      costo = volumen * 200 + valorNumerico * 0.03; // Ejemplo de tarifas marítimas
    }

    setCotizacion(costo.toFixed(2));
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>Cotizador de Importaciones</h1>
      <input placeholder="Producto" value={producto} onChange={e => setProducto(e.target.value)} /><br />
      <input placeholder="Valor en USD" value={valor} onChange={e => setValor(e.target.value)} /><br />
      <input placeholder="Peso en KG" value={peso} onChange={e => setPeso(e.target.value)} /><br />
      <input placeholder="Largo en cm" value={largo} onChange={e => setLargo(e.target.value)} /><br />
      <input placeholder="Ancho en cm" value={ancho} onChange={e => setAncho(e.target.value)} /><br />
      <input placeholder="Alto en cm" value={alto} onChange={e => setAlto(e.target.value)} /><br />
      <input placeholder="Número de paquetes" value={numPaquetes} onChange={e => setNumPaquetes(e.target.value)} /><br />
      <select value={transporte} onChange={e => setTransporte(e.target.value)}>
        <option value="Aéreo">Aéreo</option>
        <option value="Courrier">Courrier</option>
        <option value="Marítimo">Marítimo</option>
      </select><br />
      <button onClick={calcularCotizacion}>Calcular Cotización</button>
      {cotizacion !== null && <h2>Costo Estimado: ${cotizacion} USD</h2>}
    </div>
  );
}

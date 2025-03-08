import { useState } from 'react';

export default function Cotizador() {
  const [producto, setProducto] = useState('');
  const [valorUSD, setValorUSD] = useState('');
  const [pesoKG, setPesoKG] = useState('');
  const [tipoTransporte, setTipoTransporte] = useState('Aéreo');
  const [largo, setLargo] = useState('');
  const [ancho, setAncho] = useState('');
  const [alto, setAlto] = useState('');
  const [numCajas, setNumCajas] = useState('');
  const [cotizacion, setCotizacion] = useState('');

  const calcularCotizacion = () => {
    const volumenCBM = (largo / 100) * (ancho / 100) * (alto / 100) * numCajas;
    let costoTransporte = 0;

    switch (tipoTransporte) {
      case 'Aérreo':
        costoTransporte = volumenCBM * 9000000;
        break;
      case 'Marítimo':
        costoTransporte = volumenCBM * 2500000;
        break;
      case 'Courrier':
        costoTransporte = volumenCBM * 5000000;
        break;
      default:
        costoTransporte = 0;
    }

    setCotizacion(`Costo estimado de transporte: $${costoTransporte.toLocaleString()}`);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold' }}>Cotizador de Importaciones</h1>
      <input type="text" placeholder="Producto" value={producto} onChange={(e) => setProducto(e.target.value)} />
      <input type="number" placeholder="Valor en USD" value={valorUSD} onChange={(e) => setValorUSD(e.target.value)} />
      <input type="number" placeholder="Peso en KG" value={pesoKG} onChange={(e) => setPesoKG(e.target.value)} />
      <input type="number" placeholder="Largo en cm" value={largo} onChange={(e) => setLargo(e.target.value)} />
      <input type="number" placeholder="Ancho en cm" value={ancho} onChange={(e) => setAncho(e.target.value)} />
      <input type="number" placeholder="Alto en cm" value={alto} onChange={(e) => setAlto(e.target.value)} />
      <input type="number" placeholder="Número de Cajas/Paquetes" value={numCajas} onChange={(e) => setNumCajas(e.target.value)} />
      <select value={tipoTransporte} onChange={(e) => setTipoTransporte(e.target.value)}>
        <option value="Aéreo">Aéreo</option>
        <option value="Marítimo">Marítimo</option>
        <option value="Courrier">Courrier</option>
      </select>
      <button onClick={calcularCotizacion}>Calcular Cotización</button>
      {cotizacion && <p>{cotizacion}</p>}
    </div>
  );
}

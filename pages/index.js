import React, { useState } from 'react';

const CotizadorImportaciones = () => {
    const [producto, setProducto] = useState('');
    const [valor, setValor] = useState('');
    const [peso, setPeso] = useState('');
    const [largo, setLargo] = useState('');
    const [ancho, setAncho] = useState('');
    const [alto, setAlto] = useState('');
    const [cantidad, setCantidad] = useState('');
    const [modoTransporte, setModoTransporte] = useState('Aéreo');
    const [costoTransporte, setCostoTransporte] = useState('');

    const tarifas = {
        Aéreo: 9000000,
        Courrier: 5000000,
        Marítimo: 2500000
    };

    const calcularCosto = () => {
        const volumen = (largo * ancho * alto * cantidad) / 1000000;
        const costoTransporte = volumen * tarifas[modoTransporte];
        const iva = valor * 0.19;
        const arancel = valor * 0.05;
        const costoTotal = valor + costoTransporte + iva + arancel;

        setCostoTransporte(`Costo estimado de transporte: $${costoTransporte.toLocaleString()}
IVA: $${iva.toLocaleString()}
Arancel: $${arancel.toLocaleString()}
Costo total estimado: $${costoTotal.toLocaleString()}`);
    };

    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Cotizador de Importaciones</h1>
            <input type="text" placeholder="Producto" value={producto} onChange={(e) => setProducto(e.target.value)} />
            <input type="number" placeholder="Valor en USD" value={valor} onChange={(e) => setValor(Number(e.target.value))} />
            <input type="number" placeholder="Peso en KG" value={peso} onChange={(e) => setPeso(e.target.value)} />
            <input type="number" placeholder="Largo en CM" value={largo} onChange={(e) => setLargo(e.target.value)} />
            <input type="number" placeholder="Ancho en CM" value={ancho} onChange={(e) => setAncho(e.target.value)} />
            <input type="number" placeholder="Alto en CM" value={alto} onChange={(e) => setAlto(e.target.value)} />
            <input type="number" placeholder="Cantidad de cajas/paquetes" value={cantidad} onChange={(e) => setCantidad(e.target.value)} />
            <select value={modoTransporte} onChange={(e) => setModoTransporte(e.target.value)}>
                <option value="Aéreo">Aéreo</option>
                <option value="Courrier">Courrier</option>
                <option value="Marítimo">Marítimo</option>
            </select>
            <button onClick={calcularCosto}>Calcular Cotización</button>
            <p>{costoTransporte}</p>
        </div>
    );
};

export default CotizadorImportaciones;

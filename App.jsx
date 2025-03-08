import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    description: '',
    value: '',
    dimensions: '',
    quantity: '',
    mode: 'both'
  });
  const [quote, setQuote] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const calculateCBM = (dimensions, quantity) => {
    const [length, width, height] = dimensions.split('x').map(Number);
    return (length * width * height * quantity) / 1000000;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cbm = calculateCBM(formData.dimensions, formData.quantity);
    const seaCost = cbm * 2900000;
    const airCost = cbm * 9000000;
    const tariff = formData.value * 0.15;
    const vat = (formData.value + tariff) * 0.19;

    setQuote({
      cbm,
      seaCost,
      airCost,
      totalSea: seaCost + tariff + vat,
      totalAir: airCost + tariff + vat
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-xl font-bold mb-6">Cotiza tu Importación</h1>
        <input type="text" name="description" placeholder="Descripción" value={formData.description} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <input type="number" name="value" placeholder="Valor total en USD" value={formData.value} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <input type="text" name="dimensions" placeholder="Medidas (LxWxH cm)" value={formData.dimensions} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <input type="number" name="quantity" placeholder="Cantidad" value={formData.quantity} onChange={handleChange} className="w-full p-2 mb-4 border rounded" required />
        <select name="mode" value={formData.mode} onChange={handleChange} className="w-full p-2 mb-4 border rounded">
          <option value="both">Aéreo y Marítimo</option>
          <option value="air">Aéreo</option>
          <option value="sea">Marítimo</option>
        </select>
        <button type="submit" className="bg-blue-500 text-white w-full p-2 rounded-xl hover:bg-blue-600">Cotizar</button>
      </form>

      {quote && (
        <div className="bg-white p-6 rounded-2xl shadow-lg mt-8">
          <h2 className="text-lg font-bold">Resultados de Cotización</h2>
          <p>CBM Total: {quote.cbm.toFixed(2)} m³</p>
          {formData.mode !== 'air' && <p>Costo Marítimo: ${quote.seaCost.toLocaleString()}</p>}
          {formData.mode !== 'sea' && <p>Costo Aéreo: ${quote.airCost.toLocaleString()}</p>}
          {formData.mode !== 'air' && <p>Total Aproximado Marítimo: ${quote.totalSea.toLocaleString()}</p>}
          {formData.mode !== 'sea' && <p>Total Aproximado Aéreo: ${quote.totalAir.toLocaleString()}</p>}
        </div>
      )}
    </div>
  );
}


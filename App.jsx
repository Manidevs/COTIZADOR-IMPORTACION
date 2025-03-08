import { useState } from 'react';
import { Input, Button, Select } from '@/components/ui';

export default function ImportQuoteApp() {
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');
  const [length, setLength] = useState('');
  const [width, setWidth] = useState('');
  const [height, setHeight] = useState('');
  const [quantity, setQuantity] = useState('');
  const [mode, setMode] = useState('');
  const [quote, setQuote] = useState(null);

  const calculateQuote = () => {
    const cbm = (length * width * height * quantity) / 1000000;
    const maritimeCost = cbm * 2900000;
    const airCost = cbm * 9000000;
    const duty = value * 0.15;
    const vat = (parseFloat(value) + duty) * 0.19;

    setQuote({
      cbm: cbm.toFixed(2),
      maritimeTotal: (maritimeCost + duty + vat).toFixed(2),
      airTotal: (airCost + duty + vat).toFixed(2)
    });
  };

  const sendToWhatsApp = () => {
    const message = `Hola, quiero empezar mi importación. \nDescripción: ${description}\nValor: $${value}\nCBM: ${quote.cbm} m3\nCosto marítimo: $${quote.maritimeTotal}\nCosto aéreo: $${quote.airTotal}`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/1234567890?text=${encodedMessage}`);
  };

  return (
    <div className="p-6 max-w-md mx-auto bg-white rounded-2xl shadow-lg">
      <h2 className="text-xl font-bold mb-4">Cotiza tu importación</h2>
      <Input placeholder="Descripción del producto" value={description} onChange={e => setDescription(e.target.value)} />
      <Input placeholder="Valor total en USD" type="number" value={value} onChange={e => setValue(e.target.value)} />
      <div className="grid grid-cols-3 gap-2">
        <Input placeholder="Largo (cm)" type="number" value={length} onChange={e => setLength(e.target.value)} />
        <Input placeholder="Ancho (cm)" type="number" value={width} onChange={e => setWidth(e.target.value)} />
        <Input placeholder="Alto (cm)" type="number" value={height} onChange={e => setHeight(e.target.value)} />
      </div>
      <Input placeholder="Cantidad de cajas" type="number" value={quantity} onChange={e => setQuantity(e.target.value)} />
      <Select value={mode} onChange={e => setMode(e.target.value)}>
        <option value="">Selecciona modalidad</option>
        <option value="maritime">Marítimo</option>
        <option value="air">Aéreo</option>
        <option value="both">Ambas</option>
      </Select>
      <Button onClick={calculateQuote} className="w-full mt-4">Calcular cotización</Button>

      {quote && (
        <div className="mt-4 p-4 bg-gray-100 rounded-lg">
          <p>CBM total: {quote.cbm} m3</p>
          <p>Tarifa marítima: ${quote.maritimeTotal}</p>
          <p>Tarifa aérea: ${quote.airTotal}</p>
          <Button onClick={sendToWhatsApp} className="w-full mt-4 bg-green-500 text-white">Empezar importación</Button>
        </div>
      )}
    </div>
  );
}

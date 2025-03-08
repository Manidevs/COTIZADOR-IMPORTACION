import { useState } from 'react';

export default function Home() {
  const [product, setProduct] = useState('');
  const [value, setValue] = useState('');
  const [weight, setWeight] = useState('');
  const [shippingMethod, setShippingMethod] = useState('Aéreo');
  const [quote, setQuote] = useState(null);

  const calculateQuote = () => {
    const valueNum = parseFloat(value);
    const weightNum = parseFloat(weight);

    if (isNaN(valueNum) || isNaN(weightNum)) {
      alert('Por favor, ingresa valores numéricos válidos para valor y peso.');
      return;
    }

    let shippingCost = 0;
    switch (shippingMethod) {
      case 'Aéreo':
        shippingCost = weightNum * 10;
        break;
      case 'Courrier':
        shippingCost = weightNum * 8;
        break;
      case 'Marítimo':
        shippingCost = weightNum * 5;
        break;
      default:
        shippingCost = 0;
    }

    const totalCost = valueNum + shippingCost;
    setQuote(totalCost);
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1 style={{ fontWeight: 'bold' }}>Cotizador de Importaciones</h1>
      <input
        type="text"
        placeholder="Producto"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
      />
      <input
        type="text"
        placeholder="Valor en USD"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <input
        type="text"
        placeholder="Peso en KG"
        value={weight}
        onChange={(e) => setWeight(e.target.value)}
      />
      <select value={shippingMethod} onChange={(e) => setShippingMethod(e.target.value)}>
        <option value="Aéreo">Aéreo</option>
        <option value="Courrier">Courrier</option>
        <option value="Marítimo">Marítimo</option>
      </select>
      <button onClick={calculateQuote}>Calcular Cotización</button>
      {quote !== null && (
        <div>
          <h2>Cotización Total: ${quote.toFixed(2)} USD</h2>
        </div>
      )}
    </div>
  );
}

export default function Home() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <h1>Cotizador de Importaciones</h1>
      <form style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
        <input type="text" placeholder="Producto" required />
        <input type="number" placeholder="Valor en USD" required />
        <input type="number" placeholder="Peso en KG" required />
        <select required>
          <option value="aereo">Aéreo</option>
          <option value="courrier">Courrier</option>
          <option value="maritimo">Marítimo</option>
        </select>
        <button type="submit">Calcular Cotización</button>
      </form>
    </div>
  );
}

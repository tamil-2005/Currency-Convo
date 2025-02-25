import { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setFromCurrency] = useState("USD");
  const [toCurrency, setToCurrency] = useState("INR");
  const [convertedAmount, setConvertedAmount] = useState(null);
  const [currencies, setCurrencies] = useState([]);
  const [rates, setRates] = useState({});
  
  useEffect(() => {
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
      .then((response) => response.json())
      .then((data) => {
        if (data.rates) {
          setRates(data.rates);
          setCurrencies(Object.keys(data.rates));
        }
      })
      .catch((error) => console.error("Error fetching exchange rates:", error));
  }, []);

  const convertCurrency = () => {
    if (rates[fromCurrency] && rates[toCurrency]) {
      const rate = rates[toCurrency] / rates[fromCurrency];
      setConvertedAmount((parseFloat(amount) * rate).toFixed(2));
    }
  };

  return (
    <div className="container">
      <div className="box">
        <h2>Currency Converter</h2>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value ? parseFloat(e.target.value) : 0)}
        />
        <div className="selection">
          <select value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
            {currencies.length > 0 ? currencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            )) : <option>Loading...</option>}
          </select>

          <select value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
            {currencies.length > 0 ? currencies.map((currency) => (
              <option key={currency} value={currency}>{currency}</option>
            )) : <option>Loading...</option>}
          </select>
        </div>
        <button onClick={convertCurrency}>Convert</button>
        {convertedAmount !== null && (
          <p>Converted Amount: {convertedAmount} {toCurrency}</p>
        )}
      </div>
    </div>
  );
};

export default App;

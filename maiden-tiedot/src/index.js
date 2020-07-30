import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';
import Countries from './components/countries';

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState('');

  const changeSearch = (e) => {
    setSearch(e.target.value);
  }

  const searchCountries = () => {
    return countries.filter(country => {
        return country.name.toUpperCase()
            .includes(search.toUpperCase());
    });
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data);
      })
  }, []);

  return (
    <div>
      <label>
        Find countries: <input type='text' value={search} onChange={changeSearch} />
      </label>
      { countries.length
        ? <Countries foundCountries={searchCountries()} />
        : <p>Loading countries...</p>
      }
      
    </div>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
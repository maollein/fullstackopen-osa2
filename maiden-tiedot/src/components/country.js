import React from 'react';

const Country = ({country}) => {

    const getLanguages = () => {
        return country.languages.map(lang => {
            return <li key={lang.name}>{lang.name}</li>
        });
    }

    return (
        <div>
            <h2>{country.name}</h2>
            <p>Capital: {country.capital}</p>
            <p>Population: {country.population}</p>
            <h3>Languages</h3>
            <ul>
                {getLanguages()}
            </ul>
            <img alt={`The flag of ${country.name}`} src={country.flag} style={{maxWidth: '200px'}}/>
            <hr />
        </div>
    );
}

export default Country;
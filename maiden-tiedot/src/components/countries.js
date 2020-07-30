import React, {useState, useEffect} from 'react';
import Country from './country';

const Countries = ({foundCountries}) => {
    
    const [countriesToShow, setCountriesToShow] = useState([]);

    useEffect(() => {
        setCountriesToShow(foundCountries);
    }, [foundCountries])

    const countryList = () => {
        return countriesToShow.map(country => {
            return (
                <div key={country.name}>
                    <p>{country.name}</p>
                    <input type="button" value="Show" onClick={() => chooseCountry(country)} />
                </div>
            )
        });
    }

    const chooseCountry = (country) => {
        setCountriesToShow([country]);
    }

    const showCountries = () => {
        if (countriesToShow.length > 10) {
            return <p>Too many matches, specify another filter</p>
        } else if (countriesToShow.length < 10 && countriesToShow.length > 1) {
            return countryList();
        } else if (countriesToShow.length === 1) {
            return <Country country={countriesToShow[0]} />;
        } else {
            return <p>No countries to show</p>;
        }
    }

    return (
        <div>
            { showCountries() }
        </div>
    );

}

export default Countries;
import React, { useState, useEffect } from 'react';
import Person from './components/person';
import AddPerson from './components/addPerson';
import Filter from './components/filter';
import personService from './services/personService';
import Notification from './components/notification';
import classes from './constants/classes';

const App = () => {
  const [ persons, setPersons] = useState([]);
  const [ newName, setNewName ] = useState('');
  const [ newNumber, setNewNumber ] = useState('');
  const [ search, setSearch ] = useState('');
  const [ notification, setNotification ] = useState(null);
  
  useEffect(() => {
    personService
      .getPersons()
      .then(persons => {
        console.log(persons);
        setPersons(persons);
      });
  }, []);

  const notify = (message, style) => {
    setTimeout(() => {
      setNotification(null);
    }, 3000);
    setNotification({message: message, style: style});
  }

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  }

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  }

  const handleChangeSearch = (e) => {
    setSearch(e.target.value);
  }

  const addPerson = (e) => {
    e.preventDefault();
    if (!persons.map(person => person.name).includes(newName)) {
      personService
        .addPerson({name: newName, number: newNumber})
        .then( person => {
          setPersons(persons.concat(person))
          notify('Added new person', classes.SUCCESS);
        });
    } else {
      if (window.confirm(`${newName} is already added to phonebook. Replace old number?`)) {
        const person = persons.find(person => person.name === newName)
        const newPerson = {...person, number: newNumber};
        personService
          .changeNumber(newPerson)
          .then(modifiedPerson => {
            setPersons(persons.map(p => p.id !== modifiedPerson.id ? p : modifiedPerson));
            notify('Number changed', classes.SUCCESS)
          })
          .catch(reason => {
            notify('Number change failed, person does not exist', classes.ERROR);
          });
      }
    }
    setNewName('');
    setNewNumber('');
  }

  const deletePerson = (personToDelete) => {
    if (window.confirm(`Delete ${personToDelete.name}?`)){
      personService
      .deletePerson(personToDelete.id)
      .then(status => {
        if (status === 200) {
          setPersons(persons.filter(person => person.id !== personToDelete.id))
          notify('Person deleted', classes.SUCCESS);
        } else {
          alert('Error: Could not delete person')
        }
      });
    } else return;
  }

  const getPersons = () => {
    return (
      persons.filter(person => person.name.toUpperCase().includes(search.toUpperCase()))
      .map(person => <Person 
                        person={person} 
                        key={person.id}
                        deletePerson={() => deletePerson(person) }
                      />)
    );
  }

  return (
    <div>
      { notification
        ? <Notification message={notification.message} styling={notification.style} />
        : null
      }
      <h2>Phonebook</h2>
      <Filter search={search} changeSearch={handleChangeSearch} />
      <h2>Add new</h2>
      <AddPerson addPerson={addPerson} 
        changeName={handleChangeName} 
        changeNumber={handleChangeNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      {getPersons()}
    </div>
  )

}

export default App
import React from 'react';

const AddPerson = ({addPerson, changeName, 
    changeNumber, newNumber, newName}) => {
    return (
        <form onSubmit={addPerson}>
            <div>
              name: <input value={newName} onChange={changeName} />
              <br/>
              number: <input value={newNumber} onChange={changeNumber} />
            </div>
            <div>
              <button type="submit">add</button>
            </div>
        </form>
    )
}

export default AddPerson;
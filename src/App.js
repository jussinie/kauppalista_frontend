import { React, useState, useEffect } from 'react';
import axios from 'axios'
import { Button, Input, Header, List, Container } from 'semantic-ui-react'

// create backend
// async-await
// change state to redux for training purposes
// use 


const Item = (props) => {
  const { items } = props;
  return (
    <div>
      <List>
      {items.map(item => 
        <List.Item key={item.id}><List.Header>{item.name}</List.Header>kappaleita: {item.amount}</List.Item>
      )}
      </List>
    </div>
  )
}; 

const App = (props) => {
  console.log('app', props)
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    axios.get('http://localhost:3001/api/items')
    .then(response => {
      setItems(response.data)
      console.log(items)
    })
  }, [])

  const handleItemChange = (event) => {
    setNewItem(event.target.value);
  };

  const handleAmountChange = (event) => {
    console.log(event.target.value);
    setAmount(event.target.value);
  };

  const addItem = (event) => {
    event.preventDefault();
    const itemObject = {
      name: newItem,
      amount: amount,
      id: items.length + 1,
    };

    setItems(items.concat(itemObject));
    setNewItem('');
    setAmount('');
  };

  console.log('items useState', items);
  return (
    <Container textAlign='center'>
    <div>
      <Header as='h2'>Kauppalista - revisited </Header>
      <form onSubmit={addItem}>
        <div className='ui focus input'>
        <Input type="text" placeholder="Lisää ostos" value={newItem} onChange={handleItemChange}/>
        </div>
        <div className='ui focus input'>
        <Input type="text" placeholder="Lisää lukumäärä" value={amount} onChange={handleAmountChange}/>
        </div>
        <Button>Lisää listalle</Button>
      </form>
      <Container textAlign='left'>
      <Item items={items}/>
      </Container>
    </div>
    </Container>
  );
};

export default App;

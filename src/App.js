import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, Container, TextField, List, ListItem, ListItemText, CircularProgress, Grid } from '@mui/material';
import axios from 'axios';

function App() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  // Fetch data from the API on component mount
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/posts')
      .then(response => {
        setData(response.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("There was an error fetching the data!", error);
      });
  }, []);

  // Update search state on input change
  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  // Filter data based on search input
  const filteredData = data.filter(item => 
    item.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">React Material-UI App</Typography>
        </Toolbar>
      </AppBar>
      <div className='container'>
      <Container >
        <Typography variant="h4" gutterBottom>
          List 
        </Typography>
        <TextField 
          label="Search" 
          variant="outlined" 
          fullWidth 
          margin="normal"
          value={search}
          onChange={handleSearchChange}
        />
        {loading ? (
          <Grid container justifyContent="center">
            <CircularProgress />
          </Grid>
        ) : (
          <List >
            {filteredData.map(item => (
              <ListItem key={item.id} alignItems="flex-start">
                <ListItemText 
                  primary={item.title} 
                  secondary={item.body} 
                />
              </ListItem>
            ))}
          </List>
        )}
      </Container>
      </div>
    </div>
  );
}

export default App;

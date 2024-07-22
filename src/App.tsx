import React, { useState } from 'react';
import { Box, Button, Container } from '@mui/material';
import TableHeader from './components/layouts/TableHeader';
import SegmentScreen from './pages/SegmentSchemaScreen';

const App: React.FC = () => {


  return (
    <Container sx={{ marginTop: "10px" }}>

      <SegmentScreen />
    </Container>
  );
};

export default App;

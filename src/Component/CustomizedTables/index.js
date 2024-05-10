import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 12,
    
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));

function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }



export default function CustomizedTables({data,className}) {
  return (
    <TableContainer className={className} component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
          <StyledTableCell align="left">Nom Complet</StyledTableCell>
            <StyledTableCell>Nb.flotte</StyledTableCell>
            <StyledTableCell align="left">Type Devices</StyledTableCell>
            <StyledTableCell align="left">Adress</StyledTableCell>
            <StyledTableCell align="left">Raison social</StyledTableCell>
            <StyledTableCell align="left">Secteur Activité</StyledTableCell>
            <StyledTableCell colSpan={6} align="left">Email</StyledTableCell>
            <StyledTableCell align="left">Tel</StyledTableCell>
            
          
          </TableRow>
        </TableHead>
        <TableBody>
        
            <StyledTableRow>
            <StyledTableCell align="left">{data?.nomComplet}</StyledTableCell>
              <StyledTableCell component="th" scope="row">
              {data?.nbFlotte}
              </StyledTableCell>
              <StyledTableCell align="left">
  {data &&data?.typeDevice?.map((type, index) => (
   <span key={index}>{index > 0 && " "}{type}</span>
  ))}
</StyledTableCell>
              <StyledTableCell align="left">{data?.adress}</StyledTableCell>
              <StyledTableCell align="left">{data?.raisonSocial}</StyledTableCell>
              <StyledTableCell align="left">{data?.secteurActivite}</StyledTableCell>
              <StyledTableCell colSpan={6} align="left">{data?.email}</StyledTableCell>
              <StyledTableCell align="left">{data?.tel}</StyledTableCell>
              
            </StyledTableRow>
          
        </TableBody>
      </Table>
    </TableContainer>
  );
}
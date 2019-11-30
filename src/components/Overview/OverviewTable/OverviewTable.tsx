import React, { useState, useReducer } from 'react';
import { ClientsPaginated } from 'api/responses/clients.type';
import {
  IconButton,
  useTheme,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableFooter,
  TablePagination,
  TableHead,
  Theme,
} from '@material-ui/core';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { ThemeProvider, withStyles, createStyles } from '@material-ui/styles';
import styles from './OverviewTable.module.scss';
import { searchAll, searchAllOk } from 'store/actions/clientActions';
import { connect } from 'react-redux';
import { searchClients } from 'api/clients';

interface TablePaginationActionsProps {
  count: number;
  page: number;
  rowsPerPage: number;
  onChangePage: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number,
  ) => void;
}

function TablePaginationActions(props: TablePaginationActionsProps) {
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, 1);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, page - 1);
    // console.log('handle back page button click');
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    console.log('handle next page button click');
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    console.log('handle last page button click');
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div style={{ flexShrink: 0, marginLeft: theme.spacing(2.5) }}>
      <ThemeProvider theme={theme}>
        <IconButton
          onClick={handleFirstPageButtonClick}
          disabled={page === 0}
          aria-label='first page'
        >
          {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
        </IconButton>
        <IconButton
          onClick={handleBackButtonClick}
          disabled={page === 0}
          aria-label='previous page'
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowRight />
          ) : (
            <KeyboardArrowLeft />
          )}
        </IconButton>
        <IconButton
          onClick={handleNextButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label='next page'
        >
          {theme.direction === 'rtl' ? (
            <KeyboardArrowLeft />
          ) : (
            <KeyboardArrowRight />
          )}
        </IconButton>
        <IconButton
          onClick={handleLastPageButtonClick}
          disabled={page >= Math.ceil(count / rowsPerPage) - 1}
          aria-label='last page'
        >
          {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
        </IconButton>
      </ThemeProvider>
    </div>
  );
}

interface Props {
  tableData: ClientsPaginated;
  clientsTableHeader: string[];
  searchAllOk: (clients) => void;
}

const initialState = { page: 0 };

function reducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, page: action.payload };
    default:
      return {
        ...state,
      };
  }
}
const OverviewTable = ({
  tableData,
  clientsTableHeader,
  searchAllOk,
}: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  // const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  // const emptyRows =
  //   rowsPerPage -
  //   Math.min(rowsPerPage, tableData.items.length - state.page * rowsPerPage);

  const handleChangePage = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    if (newPage === tableData.pageCount - 1) {
      tableData.next = `http://localhost:3000/api/clients?page=${newPage +
        1}&limit=3`;
    }
    if (newPage === 1) {
      tableData.next = `http://localhost:3000/api/clients?page=&limit=3`;
    }
    searchClients(
      newPage > state.page ? tableData.next : tableData.previous,
    ).then(res => {
      searchAllOk(res);
      dispatch({ type: 'increment', payload: newPage });
    });
    // searchAll({ url: tableData.next });
    // dispatch({ type: 'increment', payload: newPage });
    // setPage()
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    // here i have to send a request to api with asking for x amount of rows
    // setRowsPerPage(parseInt(event.target.value, 10));
    // setPage(0);
  };
  console.log(state.page);
  return (
    <Paper style={{ width: '100%', marginTop: '20px' }}>
      <div style={{ overflowX: 'auto' }}>
        <Table style={{ minWidth: 500 }} aria-label='custom pagination table'>
          <TableHead>
            <TableRow>
              {clientsTableHeader.map((item, index) => (
                <TableCell align='center' key={index}>
                  {item}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {tableData.items.map(row => (
              <TableRow key={row.name}>
                <TableCell component='th' scope='row'>
                  {row.name}
                </TableCell>
                <TableCell align='right'>{row.email}</TableCell>
                <TableCell align='right'>{row.telephone1}</TableCell>
                <TableCell align='right'>{row.telephone2}</TableCell>
                <TableCell align='right'>{row.address}</TableCell>
                <TableCell align='right'>{row.city}</TableCell>
              </TableRow>
            ))}
            {/* {emptyRows > 0 && (
              <TableRow style={{ height: 53 * emptyRows }}>
                <TableCell colSpan={6} />
              </TableRow>
            )} */}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TablePagination
                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                colSpan={3}
                count={tableData.totalItems}
                rowsPerPage={rowsPerPage}
                page={state.page}
                SelectProps={{
                  inputProps: { 'aria-label': 'rows per page' },
                  native: true,
                }}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
                ActionsComponent={TablePaginationActions}
              />
            </TableRow>
          </TableFooter>
        </Table>
      </div>
    </Paper>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    searchAll: ({ url }) => dispatch(searchAll({ url })),
    searchAllOk: clients => dispatch(searchAllOk(clients)),
  };
};

export default connect(null, mapDispatchToProps)(OverviewTable);

import React, { useEffect } from 'react';
import {
  makeStyles,
  useTheme,
  Theme,
  createStyles,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import { Link, navigate } from '@reach/router';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TableHead from '@material-ui/core/TableHead';
import { MenuItem, Select } from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import NumberFormatter from 'helpers/numberFormat';

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

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
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
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
    </div>
  );
}

const useStyles2 = makeStyles({
  table: {
    minWidth: 500,
  },
  paper: {
    width: '100%',
    marginBottom: '20px',
  },
  tablerow: {
    cursor: 'pointer',
  },
});

const header = ['id', 'Name', 'Price', 'Payment Type', 'Date', ''];
export default function SimpleTable({
  rows = [],
  goToItem,
  searchMore,
  tableActions,
  transformToInvoice,
  generatePdf,
  handleEdit,
}: any) {
  const classes = useStyles2();

  const handleChangePage = (
    _: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    searchMore(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    console.log('hola');
  };

  const handleAction = (e, id) => {
    const action = e.target.value;
    switch (action) {
      case 'transform':
        if (transformToInvoice) {
          transformToInvoice(id);
        }
        break;
      case 'makePDF':
        if (generatePdf) {
          generatePdf(id);
        }
        break;
      case 'edit':
        handleEdit(id);
        break;
    }
  };
  return (
    <Paper className={classes.paper}>
      <Table className={classes.table} aria-label='custom pagination table'>
        <TableHead>
          <TableRow>
            {header.map(item => (
              <TableCell align='center'>{item}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {rows &&
            rows.items &&
            rows.items.map(row => (
              <TableRow className={classes.tablerow} key={row.name}>
                <TableCell align='center'>{row.id}</TableCell>
                <TableCell align='center'>{row.client.name}</TableCell>
                <TableCell align='center'>
                  {NumberFormatter.format(row.totalPrice)}
                </TableCell>
                <TableCell align='center'>{row.paymentType}</TableCell>
                <TableCell align='center'>{row.date}</TableCell>
                <TableCell>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    value=''
                    variant='standard'
                    onChange={e => handleAction(e, row.id.toString())}
                    labelWidth={50}
                  >
                    {tableActions &&
                      tableActions.map((item, index) => (
                        <MenuItem key={index} value={item.value}>
                          {item.label}
                        </MenuItem>
                      ))}
                  </Select>
                </TableCell>
              </TableRow>
            ))}
          <TableRow>
            <TableCell colSpan={6} />
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[15]}
              colSpan={3}
              count={rows.totalItems}
              rowsPerPage={rows.rowsPerPage}
              page={rows.currentPage - 1}
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
    </Paper>
  );
}

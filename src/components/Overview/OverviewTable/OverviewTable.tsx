import React, { useState } from 'react';
import clsx from 'clsx';
import {
  createStyles,
  lighten,
  makeStyles,
  Theme,
} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import { ClientsPaginated } from 'api/responses/clients.type';
import { HeadCell } from 'components/Clients/Clients';
import { connect } from 'react-redux';
import { searchAll, searchAllOk } from 'store/actions/clientActions';
import { FormControl, Select, MenuItem } from '@material-ui/core';
import { ProductsHeadCell } from 'components/Products/Products';
import { ProductsPaginated } from 'api/responses/products.type';
import { InvoicesHeadCell } from 'components/Invoices/Invoices';
import { InvoicesPaginated } from 'api/responses/invoices.type';
import NumberFormatter from 'helpers/numberFormat';

interface EnhancedTableProps {
  numSelected: number;
  // onSelectAllClick: (
  //   event: React.ChangeEvent<HTMLInputElement>,
  //   checked: boolean,
  // ) => void;
  rowCount: number;
  headCells: HeadCell[] | ProductsHeadCell[] | InvoicesHeadCell[];
}

function EnhancedTableHead(props: EnhancedTableProps) {
  const { numSelected, rowCount } = props;
  return (
    <TableHead>
      <TableRow>
        <TableCell padding='checkbox'>
          <Checkbox
            indeterminate={numSelected > 0 && numSelected < rowCount}
            checked={numSelected === rowCount}
            // onChange={onSelectAllClick}
            inputProps={{ 'aria-label': 'select all desserts' }}
          />
        </TableCell>
        {/* 
        //@ts-ignore */}
        {props.headCells.map(headCell => (
          <TableCell
            key={headCell.id}
            align='left'
            padding={headCell.disablePadding ? 'none' : 'default'}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

const useToolbarStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      paddingLeft: theme.spacing(2),
      paddingRight: theme.spacing(1),
    },
    highlight:
      theme.palette.type === 'light'
        ? {
            color: theme.palette.secondary.main,
            backgroundColor: lighten(theme.palette.secondary.light, 0.85),
          }
        : {
            color: theme.palette.text.primary,
            backgroundColor: theme.palette.secondary.dark,
          },
    title: {
      flex: '1 1 100%',
    },
  }),
);

interface EnhancedTableToolbarProps {
  numSelected: number;
  deleteItem: (ids: string[]) => void;
}

const EnhancedTableToolbar = (props: EnhancedTableToolbarProps) => {
  const classes = useToolbarStyles();
  const { numSelected } = props;

  return (
    <Toolbar
      className={clsx(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      {numSelected > 0 ? (
        <Typography
          className={classes.title}
          color='inherit'
          variant='subtitle1'
        >
          {numSelected} selected
        </Typography>
      ) : (
        <Typography className={classes.title} variant='h4' id='tableTitle'>
          Clients
        </Typography>
      )}
      {numSelected > 0 ? (
        // @ts-ignore
        <Tooltip onClick={props.deleteItem} title='Delete'>
          <IconButton aria-label='delete'>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      ) : (
        <Tooltip title='Filter list'>
          <IconButton aria-label='filter list'>
            <FilterListIcon />
          </IconButton>
        </Tooltip>
      )}
    </Toolbar>
  );
};

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
    },
    paper: {
      width: '100%',
      marginBottom: theme.spacing(2),
    },
    table: {
      minWidth: 750,
    },
    tableWrapper: {
      overflowX: 'auto',
    },
    visuallyHidden: {
      border: 0,
      clip: 'rect(0 0 0 0)',
      height: 1,
      margin: -1,
      overflow: 'hidden',
      padding: 0,
      position: 'absolute',
      top: 20,
      width: 1,
    },
  }),
);

interface Props {
  tableHeader: HeadCell[] | ProductsHeadCell[] | InvoicesHeadCell[];
  tableData: ClientsPaginated | ProductsPaginated | InvoicesPaginated;
  searchAll: ({ url: string }) => void;
  onNextPage: (newPage: number) => void;
  deleteItem: (ids: string[]) => void;
  editItem: (id: string) => void;
  transformToInvoice?: (id: string) => void;
  onChangeRowsPerPage: (rowsPerPage: string) => void;
  tableActions?: { label: string; value: string }[];
}

const OverviewTable = ({
  tableHeader,
  tableData,
  searchAll,
  onNextPage,
  deleteItem,
  editItem,
  onChangeRowsPerPage,
  transformToInvoice,
  tableActions,
}: Props) => {
  const classes = useStyles();
  const [selected, setSelected] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  // const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
  //WIP: Need to add functionality for bulk delete first
  // };

  const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event: unknown, newPage: number) => {
    /* need to send newPage + 1 because the pagination component is 0 indexed 
    whereas the API starts at page = 1
    */
    onNextPage(newPage + 1);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const numberOfRows = event.target.value;
    setRowsPerPage(parseInt(numberOfRows, 10));
    onChangeRowsPerPage(numberOfRows);
  };

  const handleAction = (e, id) => {
    const action = e.target.value;
    switch (action) {
      case 'delete':
        deleteItem([id]);
        break;
      case 'edit':
        editItem(id);
        break;
      case 'transform':
        if (transformToInvoice) {
          transformToInvoice(id);
        }
        break;
    }
  };

  const isSelected = (id: string) => selected.indexOf(id) !== -1;
  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <EnhancedTableToolbar
          deleteItem={() => deleteItem(selected)}
          numSelected={selected.length}
        />
        <div className={classes.tableWrapper}>
          <Table
            className={classes.table}
            aria-labelledby='tableTitle'
            size='medium'
            aria-label='enhanced table'
          >
            <EnhancedTableHead
              numSelected={selected.length}
              // onSelectAllClick={handleSelectAllClick}
              rowCount={tableData.totalItems}
              headCells={tableHeader}
            />
            <TableBody>
              {/* 
        //@ts-ignore */}
              {tableData.items.map((row, index) => {
                const isItemSelected = isSelected(row.id.toString());
                const labelId = `enhanced-table-checkbox-${index}`;

                return (
                  <TableRow
                    hover
                    role='checkbox'
                    aria-checked={isItemSelected}
                    tabIndex={-1}
                    key={row.id}
                    selected={isItemSelected}
                  >
                    <TableCell padding='checkbox'>
                      <Checkbox
                        onClick={event => handleClick(event, row.id.toString())}
                        checked={isItemSelected}
                        inputProps={{ 'aria-labelledby': labelId }}
                      />
                    </TableCell>
                    {/* 
        //@ts-ignore */}
                    {tableHeader.map((item, index) => {
                      if (item.id === 'actions') {
                        return (
                          <TableCell key={item.id} padding='none' align='left'>
                            <FormControl
                              variant='filled'
                              style={{
                                minWidth: '80px',
                                margin: '10px',
                              }}
                            >
                              <Select
                                labelId='demo-simple-select-outlined-label'
                                id='demo-simple-select-outlined'
                                value=''
                                onChange={e =>
                                  handleAction(e, row.id.toString())
                                }
                                labelWidth={50}
                              >
                                {tableActions &&
                                  tableActions.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>
                                      {item.label}
                                    </MenuItem>
                                  ))}
                              </Select>
                            </FormControl>
                          </TableCell>
                        );
                      }
                      if (item.nested && item.nested.length) {
                        return item.nested.map((i, __index) => (
                          <TableCell key={__index} padding='none' align='left'>
                            {row[i.key][i.property]}
                          </TableCell>
                        ));
                      }
                      return (
                        <TableCell key={item.id} padding='none' align='left'>
                          {item.currency
                            ? NumberFormatter.format(row[item.id])
                            : row[item.id]}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>
        <TablePagination
          rowsPerPageOptions={[10, 20, 30]}
          component='div'
          count={tableData.totalItems}
          rowsPerPage={rowsPerPage}
          page={tableData.currentPage - 1}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </div>
  );
};

const mapDispatchToProps = dispatch => {
  return {
    searchAll: ({ url }) => dispatch(searchAll({ url })),
    searchAllOk: clients => dispatch(searchAllOk(clients)),
  };
};

export default connect(null, mapDispatchToProps)(OverviewTable);

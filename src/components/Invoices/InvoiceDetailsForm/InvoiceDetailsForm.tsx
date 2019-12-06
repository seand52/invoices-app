import React from 'react';
import styles from './InvoiceDetailsForm.module.scss';
import {
  Button,
  TextField,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import InputFilter from 'components/InputFilter/InputFilter';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { taxOptions, TaxOption } from 'data/taxOptions';
import { paymentTypes, PaymentType } from 'data/paymentTypes';
import { InvoiceSettingKeys } from 'store/reducers/invoicesReducer';
import { Product } from 'api/responses/products.type';
import { InvoiceDetailsState } from './invoiceDetailsReducer';

interface Props {
  clientsLoading: boolean;
  options: any;
  onClientInputChange: (e: any) => void;
  onSelectTax: (e: any, newValue: any) => void;
  onSelectInvoiceSetting: (field: InvoiceSettingKeys, newValue: any) => void;
  products: Product[];
  invoiceState: InvoiceDetailsState;
  addProductRow: () => void;
  deleteProductRow: (id) => void;
  onSelectProduct: (product: any, uuid: string) => void;
  onChangeProductQuantity: (value, uuid) => void;
  saveInvoice: () => void;
}
export default function InvoiceDetailsForm({
  clientsLoading,
  options,
  onClientInputChange,
  onSelectTax,
  onSelectInvoiceSetting,
  products,
  invoiceState,
  addProductRow,
  deleteProductRow,
  onSelectProduct,
  onChangeProductQuantity,
  saveInvoice,
}: Props) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(),
  );
  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
    onSelectInvoiceSetting(InvoiceSettingKeys.DATE, date);
  };
  return (
    <React.Fragment>
      <div className={styles.top_area}>
        <Button
          onClick={saveInvoice}
          variant='contained'
          color='primary'
          type='button'
        >
          Save
        </Button>
      </div>
      <div className={styles.main_form_container}>
        <div className={styles.form_settings}>
          <InputFilter
            onSelectItem={onSelectInvoiceSetting}
            onInputChange={onClientInputChange}
            loading={clientsLoading}
            options={options}
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <KeyboardDatePicker
              disableToolbar
              variant='inline'
              format='dd/MM/yyyy'
              id='date-picker-inline'
              label='Date picker inline'
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
          </MuiPickersUtilsProvider>
          <Autocomplete
            multiple
            id='tags-standard'
            onChange={(e, newValue) => onSelectTax(e, newValue)}
            options={taxOptions}
            getOptionLabel={(option: TaxOption) => option.label}
            renderInput={params => (
              <TextField
                {...params}
                variant='standard'
                label='Tax Options'
                placeholder='Favorites'
                style={{ width: '400px' }}
              />
            )}
          />
          <Autocomplete
            id='paymentType'
            options={paymentTypes}
            onChange={(e, newValue: PaymentType) =>
              onSelectInvoiceSetting(
                InvoiceSettingKeys.PAYMENTYPE,
                newValue.value,
              )
            }
            getOptionLabel={(option: PaymentType) => option.label}
            style={{ width: 300 }}
            renderInput={params => (
              <TextField
                {...params}
                label='Payment Type'
                variant='outlined'
                fullWidth
              />
            )}
          />
          <TextField
            onChange={e =>
              onSelectInvoiceSetting(
                InvoiceSettingKeys.TRANSPORTPRICE,
                parseFloat(e.target.value),
              )
            }
            name='transportPrice'
            label='Transport Price'
            variant='outlined'
            type='text'
          />
        </div>
        <div className={styles.form_products}>
          <div className={styles.product}>
            {!invoiceState.products.length ? (
              <button onClick={addProductRow}>Add a product</button>
            ) : (
              <Table aria-label='simple table'>
                <TableHead>
                  <TableRow>
                    <TableCell>Product</TableCell>
                    <TableCell align='right'>Quantity</TableCell>
                    <TableCell align='right'>Price</TableCell>
                    <TableCell align='right'>Disc. %</TableCell>
                    <TableCell align='right'>Total</TableCell>
                    <TableCell align='right'></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invoiceState.products.map((row, index) => (
                    <TableRow key={row.uuid}>
                      <TableCell component='th' scope='row'>
                        <Autocomplete
                          options={products}
                          onChange={(e, newProduct: Product) =>
                            onSelectProduct(newProduct, row.uuid)
                          }
                          getOptionLabel={(product: Product) =>
                            product.description
                          }
                          style={{ width: 300 }}
                          renderInput={params => (
                            <TextField
                              {...params}
                              label='Product'
                              variant='outlined'
                              fullWidth
                            />
                          )}
                        />
                      </TableCell>
                      <TableCell align='right'>
                        <TextField
                          onChange={e =>
                            onChangeProductQuantity(e.target.value, row.uuid)
                          }
                          id='outlined-number'
                          label='Number'
                          defaultValue={row.quantity}
                          className={styles.quantity}
                          type='number'
                          InputLabelProps={{
                            shrink: true,
                          }}
                          margin='normal'
                          variant='outlined'
                        />
                      </TableCell>
                      <TableCell align='right'>
                        {!!row.price ? row.price : null}
                      </TableCell>
                      <TableCell align='right'>0%</TableCell>
                      <TableCell align='right'>
                        {row.price ? row.quantity * row.price : null}
                      </TableCell>
                      <TableCell align='right'>
                        <span onClick={addProductRow}>Add</span>
                        <span onClick={() => deleteProductRow(row.uuid)}>
                          Delete
                        </span>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

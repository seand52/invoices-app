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
import { InvoiceDetailsState } from 'store/reducers/invoiceFormReducer';
import NumberFormatter from 'helpers/numberFormat';
import ButtonWithSpinner from 'components/ButtonWithSpinner/ButtonWithSpinner';
import AddIcon from '@material-ui/icons/Add';
import DeleteIcon from '@material-ui/icons/Delete';
import { makeZero } from 'helpers/calculations';

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
  changeDiscount: (id, value) => void;
  invoiceLoading: boolean;
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
  changeDiscount,
  invoiceLoading,
}: Props) {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    new Date(invoiceState.settings.date) || new Date(),
  );
  const [
    selectedExpiration,
    setSelecteExpiration,
  ] = React.useState<Date | null>(
    invoiceState.settings.expirationDate
      ? new Date(invoiceState.settings.expirationDate)
      : null,
  );
  const handleDateChange = (
    date: Date | null,
    type: 'validFrom' | 'expiration',
  ) => {
    switch (type) {
      case 'validFrom':
        setSelectedDate(date);
        onSelectInvoiceSetting(InvoiceSettingKeys.DATE, date);
        break;
      case 'expiration':
        setSelecteExpiration(date);
        onSelectInvoiceSetting(InvoiceSettingKeys.EXPIRATION, date);
    }
  };

  return (
    <React.Fragment>
      <div className={styles.top_area}>
        <ButtonWithSpinner
          loading={invoiceLoading}
          success={false}
          onClick={saveInvoice}
          type='button'
          text='Save'
        />
      </div>
      {/* <div className={styles.main_form_container}> */}
      <div className={styles.form_settings}>
        <InputFilter
          defaultValue={invoiceState.settings.client}
          onSelectItem={onSelectInvoiceSetting}
          onInputChange={onClientInputChange}
          loading={clientsLoading}
          options={options}
        />
        <Autocomplete
          multiple
          id='tags-standard'
          onChange={(e, newValue) => onSelectTax(e, newValue)}
          defaultValue={invoiceState.settings.tax}
          options={taxOptions}
          getOptionLabel={(option: TaxOption) => option.label}
          renderInput={params => (
            <TextField
              {...params}
              variant='outlined'
              label='Tax Options'
              placeholder='Favorites'
              style={{ minWidth: '350px' }}
            />
          )}
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant='dialog'
            format='dd/MM/yyyy'
            id='date-picker-inline'
            label='Issue Date'
            value={selectedDate}
            onChange={date => handleDateChange(date, 'validFrom')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
        <Autocomplete
          id='paymentType'
          defaultValue={invoiceState.settings.paymentType}
          options={paymentTypes}
          onChange={(e, newValue: PaymentType) =>
            onSelectInvoiceSetting(InvoiceSettingKeys.PAYMENTYPE, newValue)
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
          defaultValue={invoiceState.settings.transportPrice}
          onChange={e =>
            onSelectInvoiceSetting(
              InvoiceSettingKeys.TRANSPORTPRICE,
              parseFloat(e.target.value),
            )
          }
          style={{ minWidth: '350px' }}
          name='transportPrice'
          label='Transport Price'
          variant='outlined'
          type='text'
        />
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
          <KeyboardDatePicker
            disableToolbar
            variant='dialog'
            format='dd/MM/yyyy'
            id='date-picker-inline'
            label='Expiration Date'
            value={selectedExpiration}
            onChange={date => handleDateChange(date, 'expiration')}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </MuiPickersUtilsProvider>
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
                  <TableCell align='left'>Quantity</TableCell>
                  <TableCell align='left'>Price</TableCell>
                  <TableCell align='left'>Disc. %</TableCell>
                  <TableCell align='left'>Total</TableCell>
                  <TableCell align='left'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {invoiceState.products.map((row, index) => (
                  <TableRow key={row.uuid}>
                    <TableCell component='th' scope='row'>
                      <Autocomplete
                        freeSolo
                        defaultValue={row}
                        options={products}
                        onChange={(e, newProduct: Product) =>
                          onSelectProduct(newProduct, row.uuid)
                        }
                        getOptionLabel={(product: Product) => product.reference}
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
                    <TableCell align='left'>
                      <TextField
                        onChange={e =>
                          onChangeProductQuantity(
                            parseInt(e.target.value),
                            row.uuid,
                          )
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
                    <TableCell align='left'>
                      {!!row.price
                        ? NumberFormatter.format(row.price)
                        : NumberFormatter.format(0)}
                    </TableCell>
                    <TableCell align='left'>
                      <TextField
                        defaultValue={
                          isNaN(row.discount) ? 0 : row.discount * 100
                        }
                        onChange={e =>
                          changeDiscount(
                            row.uuid,
                            (parseFloat(e.target.value) / 100).toFixed(4),
                            // Math.round(
                            //   (parseFloat(e.target.value) / 100) * 100,
                            // ) / 100,
                          )
                        }
                        name='discount'
                        label='Disc. %'
                        variant='outlined'
                        type='number'
                      />
                    </TableCell>
                    <TableCell align='left'>
                      {row.price
                        ? NumberFormatter.format(
                            makeZero(
                              Math.round(
                                row.quantity *
                                  row.price *
                                  (1 - row.discount) *
                                  100,
                              ) / 100,
                            ),
                          )
                        : NumberFormatter.format(0)}
                    </TableCell>
                    <TableCell align='left'>
                      <span onClick={addProductRow}>
                        <AddIcon
                          className={`${styles.icon} ${styles.add_icon}`}
                        />
                      </span>
                      <span onClick={() => deleteProductRow(row.uuid)}>
                        <DeleteIcon
                          className={`${styles.icon} ${styles.delete_icon}`}
                        />
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </div>
      </div>
      {/* </div> */}
    </React.Fragment>
  );
}

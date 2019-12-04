import React from 'react';
import styles from './InvoiceDetailsForm.module.scss';
import { Button, TextField } from '@material-ui/core';
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

interface Props {
  clientsLoading: boolean;
  options: any;
  onClientInputChange: (e: any) => void;
  onSelectTax: (e: any, newValue: any) => void;
  onSelectInvoiceSetting: (field: InvoiceSettingKeys, newValue: any) => void;
}
export default function InvoiceDetailsForm({
  clientsLoading,
  options,
  onClientInputChange,
  onSelectTax,
  onSelectInvoiceSetting,
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
        <Button variant='contained' color='primary' type='button'>
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
        <div className={styles.form_products}></div>
      </div>
    </React.Fragment>
  );
}

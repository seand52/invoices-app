import React from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import { InvoiceSettingKeys } from 'store/reducers/invoicesReducer';
import { Client } from 'api/responses/clients.type';

interface Props {
  loading: boolean;
  options: any;
  onInputChange: (e: any) => void;
  onSelectItem: (e: any, newValue: number) => void;
}
export default function InputFilter({
  loading = false,
  options = [],
  onInputChange,
  onSelectItem,
}: Props) {
  const [open, setOpen] = React.useState(false);

  const onChange = e => {
    onInputChange(e);
  };

  return (
    <Autocomplete
      id='asynchronous-demo'
      style={{ width: 300 }}
      open={open}
      onChange={(e, newValue: Client) =>
        onSelectItem(InvoiceSettingKeys.CLIENTID, newValue.id)
      }
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      getOptionLabel={option => option.name}
      options={options}
      loading={loading}
      renderInput={params => (
        <TextField
          onChange={onChange}
          {...params}
          label='Search for Client'
          fullWidth
          variant='outlined'
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color='inherit' size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
}

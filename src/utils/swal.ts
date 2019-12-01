interface AlertProps {
  type: 'success' | 'error' | 'warning';
  title: string;
  text: string;
}

export const alertProp = (data: AlertProps) => {
  return {
    type: data.type,
    title: data.title,
    confirmButtonColor: '#0f0',
    text: data.text,
  };
};

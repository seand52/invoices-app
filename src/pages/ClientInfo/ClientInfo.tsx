import React from 'react';
import Layout from 'components/Layout/Layout';

interface Props {
  clientId: string;
}
export default function ClientInfo({ clientId }: Props) {
  return <Layout main={<h1>Hola mundo</h1>} />;
}

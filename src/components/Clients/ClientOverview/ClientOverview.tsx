import React from 'react';

interface Props {
  testProp: string;
}
export default function ClientOverview({ testProp }: Props) {
  return <div>{testProp}</div>;
}

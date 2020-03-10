import React from 'react';
import styles from './DashboardLayout.module.scss';

interface DashboardLayoutProps {
  main?: React.ReactNode;
  leftItem?: React.ReactNode;
  rightItem?: React.ReactNode;
}
export default function DashboardLayout({
  main,
  leftItem,
  rightItem,
}: DashboardLayoutProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>{main}</div>
      <div className={styles.left_item}>{leftItem}</div>
      <div className={styles.right_item}>{rightItem}</div>
    </div>
  );
}

import React from 'react';
import ContentHeader from './ContentHeader';
import Paper from './Paper';
import '../styles/content.css';

export const Content = ({ title }) => {
  return (
    <div className="content-area">
      <h1>{title}</h1>
      <ContentHeader />
      <Paper />
    </div>
  );
};
import React from 'react'
import ContentHearder from './ContentHearder'
import "../styles/content.css";
import Paper from './Paper';
export const Content = () => {
  return (
    <div className="content">
        <ContentHearder />
        <Paper />
    </div>
  )
}

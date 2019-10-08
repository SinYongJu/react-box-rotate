import React from 'react';
import useRotateBox from '../hooks/useRotateBox'
import './Box.css'

  
const Box = ({state,box}) => {
    const pos = useRotateBox(state, box)
    
    return (
      <div className="box" style={{...pos}}></div>
    );
  
  };





export default Box;
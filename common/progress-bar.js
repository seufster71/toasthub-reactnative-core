import React from 'react';
import PropTypes from 'prop-types';
import Charts from 'react-chartjs-2';

const ProgressBar = ({value, desc}) => {

/*let tileStyle = {
    display: 'flex',
    padding: '20px',
    background:'#00c292',
    color:'#fff'
  };
  if (background != null) {
    tileStyle.background = background;
  }*/
  let percentageValue = value + "%"

  return (
    <div className="Task" style={{background:'#FFF', margin:'20px', padding:'10px'}}>
      <div style={{display:'flex'}}>
        <p style={{fontWeight:'bold'}}> {desc} </p>
        <p style={{paddingLeft:'10%'}}> {percentageValue}</p>
      </div>
      <progress max='100' value={value} style={{width:'100%'}}></progress>
    </div>
  );
};

ProgressBar.propTypes = {
  value: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,

};

export default ProgressBar;

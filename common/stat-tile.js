import React from 'react';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';

const StatTile = ({value, desc, data, background}) => {

  let tileStyle = {
    display: 'flex',
    padding: '20px',
    background:'#00c292',
    color:'#fff'
  };
  if (background != null) {
    tileStyle.background = background;
  }

	const options = {
  		responsive: true,
  		plugins: {
    		legend: {
      			position: 'top',
    		},
    	title: {
      		display: false,
      		text: 'Chart.js Bar Chart',
    		},
  		},
	};
	
  return (
    <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12" >
      <div className="sm-res-mg-t-30 tb-res-mg-t-30" style={tileStyle}>
        <div>
          <h2>{value}</h2>
          <p> {desc} </p>
        </div>
        <div className="status-tile" style={{marginLeft: 'auto', marginTop: '10px', width:'50%'}}>
          <Bar
            data= {data}
            options={options}
           />
        </div>
      </div>
    </div>
  );
};

StatTile.propTypes = {
  value: PropTypes.string.isRequired,
  desc: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
  background: PropTypes.string,
};

export default StatTile;

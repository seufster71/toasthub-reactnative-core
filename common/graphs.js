import React from 'react';
import PropTypes from 'prop-types';
import { Chart } from 'react-chartjs-2';

const Graph = ({header, data}) => {

  let option = {
    scales: {
      xAxes: [{
      }],
      yAxes: [{
      }]
    },
  }

let type = 'bar';

  return (
    <div className="col-lg-9 col-md-9 col-sm-9 col-xs-12" style={{display: 'block', width:'100%',}}>
      <div>
        <h2>{header}</h2>
      </div>
      <div style={{padding:'20px'}}>
        <Chart
          type= {type}
          data= {data}
          options={option}
         />
      </div>
    </div>
  );
};

Graph.propTypes = {
  header: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
};

export default Graph;

import React from 'react';

const Progress = ({ order }) => {
  let progressElement;

  switch (order) {
    case 1:
      progressElement = (
        <div className="progress" role="progressbar" aria-label="Info example" aria-valuenow="10" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar bg-primary fw-bold fs-5 " style={{ width: '10%' }}>10%</div>
        </div>
      );
      break;
    case 2:
      progressElement = (
        <div className="progress" role="progressbar" aria-label="Info example" aria-valuenow="20" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar bg-primary fw-bold fs-5 " style={{ width: '20%' }}>20%</div>
        </div>
      );
      break;
    case 3:
      progressElement = (
        <div className="progress" role="progressbar" aria-label="Info example" aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar bg-primary fw-bold fs-5 " style={{ width: '30%' }}>30%</div>
        </div>
      );
      break;
    case 4:
      progressElement = (
        <div className="progress" role="progressbar" aria-label="Info example" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar bg-primary fw-bold fs-5 " style={{ width: '40%' }}>40%</div>
        </div>
      );
      break;
    case 5:
      progressElement = (
        <div className="progress" role="progressbar" aria-label="Info example" aria-valuenow="50" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar bg-primary fw-bold fs-5 " style={{ width: '50%' }}>50%</div>
        </div>
      );
      break;
    case 6:
      progressElement = (
        <div className="progress" role="progressbar" aria-label="Info example" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar bg-primary fw-bold fs-5 " style={{ width: '60%' }}>60%</div>
        </div>
      );
      break;
    case 7:
      progressElement = (
        <div className="progress" role="progressbar" aria-label="Info example" aria-valuenow="70" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar bg-primary fw-bold fs-5 " style={{ width: '70%' }}>70%</div>
        </div>
      );
      break;
    case 8:
      progressElement = (
        <div className="progress" role="progressbar" aria-label="Info example" aria-valuenow="80" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar bg-primary fw-bold fs-5 " style={{ width: '80%' }}>80%</div>
        </div>
      );
      break;
    case 9:
      progressElement = (
        <div className="progress" role="progressbar" aria-label="Info example" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar bg-primary fw-bold fs-5 " style={{ width: '90%' }}>90%</div>
          
        </div>
      );
      break;
    case 10:
      progressElement = (
        <div className="progress" role="progressbar" aria-label="Info example" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100">
          <div className="progress-bar bg-primary fw-bold fs-5 " style={{ width: '100%' }}>100%</div>
        </div>
      );
      break;
    default:
      progressElement = null;
  }

  return (
    <div className='bg-light'>
      {progressElement}
      
    </div>
  );
};

export default Progress;

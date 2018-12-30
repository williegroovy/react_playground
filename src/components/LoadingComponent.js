import React from 'react';

const LoadingComponent = ({ isLoading, error }) => (
  isLoading
    ? <div>Loading...</div>
      : error
        ? <div>{`We've encountered an error: ${error}`}</div>
        : null
);

export default LoadingComponent;
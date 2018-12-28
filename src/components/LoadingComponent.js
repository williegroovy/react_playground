import React from 'react';

const LoadingComponent = ({ isLoading, error }) => (
  isLoading
    ? <div>Loading...</div>
      : error
        ? <div>We've encountered and error</div>
        : null
);

export default LoadingComponent;
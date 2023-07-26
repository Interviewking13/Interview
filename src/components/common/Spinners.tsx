import React from 'react';
import Spinner from './Spinner';

/** Fetching 스피너(Loading Spinner) 컴포넌트 */
export const FetchingSpinner: React.FC = () => {
    return <Spinner message="Fetching..." />;
};

/** 로딩 스피너(Loading Spinner) 컴포넌트 */
export const LoadingSpinner: React.FC = () => {
    return <Spinner message="Loading..." />;
};

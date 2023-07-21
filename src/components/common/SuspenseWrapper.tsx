import React, { Suspense } from 'react';
import LoadingSpinner from './LoadingSpinner';

/** 서스펜스 래퍼(Suspense Wrapper): */
const SuspenseWrapper = ({ children }: { children: React.ReactNode }) => {
    return <Suspense fallback={<LoadingSpinner />}>{children}</Suspense>;
};

export default SuspenseWrapper;

/*
서스펜스 래퍼(Suspense Wrapper):
서스펜스 래퍼는 React 애플리케이션에서 코드 
스플리팅과 비동기 데이터 로딩을 편리하게 처리하는 
기능을 제공하는 React 컴포넌트입니다. 서스펜스 
래퍼를 사용하면 React.lazy와 Suspense를 함께 
활용하여, 필요한 컴포넌트를 비동기적으로 불러올 
수 있습니다. 또한, 데이터 로딩이나 코드 로딩 
중에 로딩 스피너와 같은 대체 UI를 제공할 수 
있도록 도와줍니다. 이를 통해 사용자가 페이지를 
이용하는 동안 지연 없이 필요한 리소스를 효율적으로 
로딩할 수 있게 됩니다.
*/

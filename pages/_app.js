/**
 * pages/_app.js
 */
import Layout from '@/components/Layout'; // 전체 Layout을 담당할 컴포넌트
import '@/styles/globals.css';
import { Children } from 'react';

export default function App({ Component, pageProps }) {
  // console.log(Component.Layout);
  // Search 함수형 컴포넌트 객체의 프로퍼티에 저장한 SubLayout 컴포넌트 객체가 저장되어 있음
  // 따라서 props로 전달된 Component가 Search 컴포넌트라면 Search 컴포넌트의 객체의 프로퍼티인 Layout(SubLayout 컴포넌트)도 같이 전달됨

  // index.js 페이지에서는 Component.Layout을 설정해주지 않았지 때문에 Component.Layout 프로퍼티 값이 undefined가 되서 오류가 발생할 수 있음
  const EmptyLayout = ({ children }) => <>{children}</>; // 따라서 그냥 children 컴포넌트를 렌더링하는 함수형 컴포넌트를 생성하고
  const SubLayout = Component.Layout || EmptyLayout; // truthy, falsy를 활용한 SubLayout 컴포넌트를 만들어 줌

  return (
    <Layout>
      <SubLayout
      // props로 전달된 Component 객체에 Layout(SubLayout 컴포넌트) 프로퍼티가 있으면 같이 렌더링되고
      // 없으면 그냥 children으로 전달된 컴포넌트만 렌더링함
      >
        <Component {...pageProps} />
      </SubLayout>
    </Layout>
  );
}

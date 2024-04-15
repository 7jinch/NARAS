/**
 * pages/index.js
 */

import { fetchCountries } from '@/api'; // NARAS의 api를 호출하는 함수 불러오기
import CountryList from '@/components/CountryList';
import Searchbar from '@/components/Searchbar';
import Head from 'next/head'; // _document.js가 아닌 next의 head를 불러와야 함

// getServerSideProps 함수의 반환값을 Home 컴포넌트에서 props로 구조분해할당으로 받음
export default function Home({ countries }) {
  return (
    // <div>
    //   {
    //     // countries를 받아서 map을 활용해서 렌더링
    //     // 서버측에서 html로 렌더링되어서(만들어서) 클라이언트측으로 전달됨
    //     // 따라서 이후에 아무리 새로고침을 하더라도 클라이언트측에서는 NARAS의 api를 호출하지 않음
    //     countries.map((country) => {
    //       return <div key={country.code}>{country.commonName}</div>;
    //     })
    //   }
    // </div>

    // 기존의 html 메타 태그를 작성했던 것처럼 Head 컴포넌트 안에다가 쓰면 됨
    <>
      <Head>
        <title>NARAS</title>
        <meta
          // 오픈그래프 설정
          property="og:image"
          content="/thumbnail.png"
        />
        <meta
          // 오픈그래프 설정
          property="og:title"
          content="NARAS"
        />
        <meta
          // 오픈그래프 설정
          property="og:decription"
          content="전세계 국가들의 정보를 확인해 보세요"
        />
      </Head>
      <Searchbar />
      <CountryList countries={countries} />
    </>
  );
}

// getServerSideProps: 이 파일이 담당하는 page는 SSR 방식으로 동작하고 호출시 매번 동작함
// getStaticProps: getServerSideProps처럼 SSR 방식처럼 동작하지만 차이점은 빌드 타임에만 딱 1번 동작함
export const getStaticProps = async () => {
  // SSR을 위해서 서버측에서 page 컴포넌트(여기서는 Home 컴포넌트)에게 전달할 데이터를 설정하는 함수

  // NARAS의 api를 호출하는 코드
  const countries = await fetchCountries();

  // console.log('countries 데이터 불러오기');
  // getServerSideProps 함수였다면 "/" 페이지로 접근시 매번 호출됨
  // getStaticProps 함수이기 때문에 빌드 타임에 1번만 동작함(npm run build 했더니 확인)

  // 반드시 반환값(객체)이 있어야 함
  return {
    // 객체에는 props라는 프로퍼티가 있어야 하고 props의 value 값은 객체여야 함
    props: {
      // 이 객체에 담은 값은 모두 Home 컴포넌트에게 전달됨
      countries,
    },
  };
};

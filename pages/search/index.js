/**
 * pages/search/index.js
 */
import { fetchSearchResults } from '@/api';
import CountryList from '@/components/CountryList';
import Searchbar from '@/components/Searchbar';
import SubLayout from '@/components/SubLayout'; // 개별 Layout을 담당할 컴포넌트
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Head from 'next/head';

// // getServerSideProps로부터 반환받은 props의 countries 배열을 구조분해할당으로 받음
// export default function Search({ countries }) {

// url parameter를 활용하는 "country/[code]" page에서만 getStaticPaths 함수를 사용할 수 있음
// getStaticProps 함수는 url parameter에는 접근할 수 있지만 query string에는 접근할 수 없음
// 그렇다고 아예 SSG 방식을 적용하는 것이 불가능 한 것은 아님
export default function Search() {
  const router = useRouter(); // useRouter 훅으로 router 객체 받기
  const { q } = router.query; // q라는 query string 가져오기

  // useState로 상태값 생성
  const [countries, setCountries] = useState([]); // 초기값은 국가 리스트니까 빈 배열로 설정

  // 컴포넌트 내부에서 api 호출하기
  const setData = async () => {
    const data = await fetchSearchResults(q);
    setCountries(data);
  };

  useEffect(() => {
    if (q) {
      setData();
    }
  }, [q]); // 컴포넌트가 마운트 되었을 때와 q(query string)가 변경되었을 떄마다 setData 함수를 호출

  // 이렇게 하면 Search 페이지처럼 getServerSideProps 함수와 getStaticPaths 함수가 없는 페이지는 기본적으로는 SSG로 동작하지만
  // countries라는 데이터는 클라이언트측에서 api를 호출해서 불러오기 떄문에
  // 일단은 빈 div만 렌더링 되었다가 api가 완료되고 데이터가 저장되면 클라이언트측에서 추가로 렌더링함
  return (
    // <div>
    //   {countries.map((country) => {
    //     return <div key={country.code}>{country.commonName}</div>;
    //   })}
    // </div>
    <>
      <Head>
        <title>NARAS 검색</title>
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
      <Searchbar q={q} />
      <CountryList countries={countries} />
    </>
  );
}

// Search 함수형 컴포넌트 객체의 Layout라는 프로퍼티로 SubLayout 컴포넌트 객체를 저장(자바스크립트 문법임)
Search.Layout = SubLayout;

// // 현재 브라우저에서 받은 요청의 정보를 context에서 담고 있어서 그걸 매개변수로 받아줌
// export const getServerSideProps = async (context) => {
//   // context 객체 출력해보기
//   // console.log(context);
//   // /search로 접근하면
//   // query: {},
//   // resolvedUrl: '/search',
//   // console.log(context);
//   // /search?q=japan으로 접근하면
//   // query: { q: 'japan' },
//   // resolvedUrl: '/search?query=japan',

//   const { q } = context.query; // context의 query 객체에서 쿼리스트링을 꺼냄
//   // console.log(context.query.q); // japan

//   let countries = []; // 검색어를 저장할 변수를 빈 배열로 초기화
//   if (q) {
//     // 만약 검색어가 있다면
//     countries = await fetchSearchResults(q); // 검색 결과 API 함수를 호출하면서 q를 인수로 전달하고 countries 배열에 저장
//   }

//   return {
//     props: { countries }, // Search 컴포넌트에 props로 전달
//   };
// };

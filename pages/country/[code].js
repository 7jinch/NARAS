/**
 * pages/country/[code].js
 */
import { useRouter } from 'next/router';
import Image from 'next/image';
import SubLayout from '@/components/SubLayout'; // 개별 Layout을 담당할 컴포넌트
import { fetchCountry } from '@/api';
import sytle from './[code].module.css';
import Head from 'next/head';

// getServerSideProps로부터 반환받은 props의 country를 구조분해할당으로 받음
export default function Country({ country }) {
  // url parameter를 가져오는 방법으로는 getServerSideProps 함수의 context 객체를 활용하는 방법과 컴포넌트에서 useRouter 훅을 활용하는 방법이 있음
  // useRouter는 리액트 훅이기 때문에 리액트의 코드라서 브라우저에 하이드레이션 과정이 이루어진 후에 동작하게 됨 -> CSR로 동작하게 됨
  const router = useRouter(); // fallback 옵션이 true인 경우 router 객체를 활용하면 현재 page의 fallback 상태 여부를 알 수 있음
  // const { code } = router.query;

  // router.isFallback에는 현재 페이지의 fallback 상태 여부가 boolean으로 저장되어 있음
  if (router.isFallback) {
    // 만약 fallback 상태라면 데이터를 기자리는 중이라는 의미이기 때문에 "로딩중..."을 보여줌
    return (
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
        로딩중...
      </>
    );
  }

  // 파일명이 [code].js라서 code라는 이름으로 url parameter가 저장됨
  // [...code].js로 하면(catch all) xxx/[aaa]/[bbb] -> aaa만 가져오는 게 아니라 aaa와 bbb모두 가져올 수 있음
  // [[...code]].js로 하면(optional catch all) url parameter가 없는 경우에도 대응 가능함

  // 혹시나 잠깐이라도 getStaticPaths 함수의 fetchCountry 함수의 호출이 실패할 경우 대비한 예외처리
  if (!country) {
    return <div>존재하지 않는 국가입니다.</div>;
  }

  // return (
  //   <div>
  //     {
  //       // /country/JPN로 접근하면
  //       country.commonName
  //     }

  //     {
  //       // Japan Japan이 정상적으로 출력됨
  //       country.officialName
  //     }
  //   </div>
  // );
  return (
    <>
      <Head>
        <title>{country.commonName} 국가 정보 조회 | NARAS</title>
        <meta
          // 오픈그래프 설정
          property="og:image"
          content={country.flagImg}
        />
        <meta
          // 오픈그래프 설정
          property="og:title"
          content={`${country.commonName} 국가 정보 조회 | NARAS`}
        />
        <meta
          // 오픈그래프 설정
          property="og:decription"
          content={`${country.commonName} 국가 정보입니다`}
        />
      </Head>
      <div className={sytle.container}>
        <div className={sytle.header}>
          <div className={sytle.commonName}>
            {country.flagEmoji}&nbsp;{country.commonName}
          </div>
          <div className={sytle.officialName}>{country.officialName}</div>
        </div>
        <div className={sytle.flag_img}>
          <Image
            src={country.flagImg}
            alt={`${country.commonName}의 국기 이미지입니다`}
            fill
          />
        </div>

        <div className={sytle.body}>
          <div>
            <b>코드 :</b>&nbsp;{country.code}
          </div>
          <div>
            <b>수도 :</b>&nbsp;{country.capital.join(', ')}
          </div>
          <div>
            <b>지역 :</b>&nbsp;{country.region}
          </div>
          <div>
            <b>지도 :</b>&nbsp;
            <a target="_blank" href={country.googleMapURL}>
              {country.googleMapURL}
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

// Country 함수형 컴포넌트 객체의 Layout라는 프로퍼티로 SubLayout 컴포넌트 객체를 저장(자바스크립트 문법임)
Country.Layout = SubLayout;

// /country/[code] 처럼 동적 경로를 갖는 page에 바로 getStaticProps 함수를 적용하면 안 됨
// 동적 경로를 갖는 page에서는 해당 page에서 존재할 수 있는 모든 경로를 찾아내는 getStaticPaths 함수를 활용해야 함
export const getStaticPaths = async () => {
  // 이 page에 어떤 경로가 필요한지 반환해 줌
  return {
    // paths 프로퍼티의 배열로 어떤 경로들이 필요한지 명시해 줌
    paths: [
      { params: { code: 'JPN' } }, // 빌드 타임에 "/country/JPN.html" 이라는 페이지를 생성함
      { params: { code: 'KOR' } }, // 빌드 타임에 "/country/KOR.html" 이라는 페이지를 생성함
    ],
    // paths에 명시하지 않은 옵션의 경로로 요청이 왔을 경우
    // fallback: false, // 404 페이지를 serving
    // fallback: 'blocking', // "/country/USA"라는 경로로 요청을 하면 서버는 실시간으로 새로운 html 페이지를 생성해서 serving하고 해당 html 파일을 서버에 저장함
    fallback: true, // "/country/USA"라는 경로로 요청을 하면 서버는 일단 props가 없는 페이지를 먼저 렌더링하고 props를 계산해서 다시 렌더링한 후 해당 html 파일을 서버에 저장함
  };
};

// 현재 브라우저에서 받은 요청의 정보를 context에서 담고 있어서 그걸 매개변수로 받아줌
// SSG를 위해 getServerSideProps 함수를 getStaticProps 함수로 변경
// getStaticProps 함수를 사용하기 위해서는 getStaticPaths 함수도 같이 작성해줘야 함
export const getStaticProps = async (context) => {
  // /country/[code]로 접근
  // context 객체 출력해보기
  // console.log(context);
  // query: { code: 'japan' },
  // resolvedUrl: '/country/japan',
  // params: { code: 'japan' }, <- query string 때랑은 다르게 params 프로퍼티가 생김

  const { code } = context.params; // context의 params 객체에서 국가코드를 꺼냄
  // console.log(`${code} 페이지 생성!`); // ISR 적용됐는지 확인해보기

  let country = null; // null로 초기화
  if (code) {
    // 만약 국가코드가 있다면
    country = await fetchCountry(code); // 국가검색함수 호출하면서 국가코드를 인수로 전달함
  }

  return {
    props: { country }, // Country 컴포넌트에 props로 전달
    revalidate: 3, // 몇 초 주기로 재생성 할 지를 지정하면 ISR 적용 끝임
  };
};

import { useRouter } from 'next/router';
import Image from 'next/image'; // nextjs의 내장 컴포넌트인 Image 불러오기
import style from './CountryItem.module.css';

export default function CountryItem({
  code,
  commonName,
  flagEmoji,
  flagImg,
  population,
  region,
  capital,
}) {
  const router = useRouter();

  const onClickItem = () => {
    router.push(`/country/${code}`);
  };

  return (
    <div onClick={onClickItem} className={style.container}>
      <div className={style.flag_img}>
        <Image
          src={flagImg}
          alt={commonName}
          // Image 태그를 사용할 때는 width, height를 설정해야 함
          // width={100}
          // height={100}

          // 아니면 fill 옵션으로 부모 요소를 채우기도 가능
          // 기준이 되는 부모 요소는 position 속성이 relative인 거임
          fill
        />
      </div>
      <div className={style.content}>
        <div className={style.name}>
          {flagEmoji} {commonName}
        </div>
        <div>지역 : {region}</div>
        <div>수도 : {capital.join(', ')}</div>
        <div>인구 : {population}</div>
      </div>
    </div>
  );
}

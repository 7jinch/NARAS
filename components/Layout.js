/**
 * components/Layout.js
 */
import { useRouter } from 'next/router';
import style from './Layout.module.css'; // css 파일 불러오기

// _app.js에서 Component 컴포넌트를 children으로 받아옴
export default function Layout({ children }) {
  const router = useRouter();

  const onClickHeader = () => router.push('/');

  return (
    <div className="Layout">
      <header onClick={onClickHeader} className={style.header}>
        NARAS 🌎
      </header>
      <main className={style.main}>{children}</main>
    </div>
  );
}

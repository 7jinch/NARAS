/**
 * _document.js
 */
import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link
          // _document는 전역 설정됨
          // favicon 설정
          type="image"
          rel="icon"
          href="favicon.ico"
        />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

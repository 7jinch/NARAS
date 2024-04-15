/**
 * api.js
 */
// NARAS의 api를 호출하는 함수
import axios from 'axios';

// 전체 국가 데이터
export async function fetchCountries() {
  try {
    const response = await axios.get('https://naras-api.vercel.app/all');
    return response.data;
  } catch (e) {
    return [];
  }
}

// 검색 결과 데이터
export async function fetchSearchResults(q) {
  try {
    const response = await axios.get(`
  https://naras-api.vercel.app/search?q=${q}
  `);

    return response.data;
  } catch (e) {
    return [];
  }
}

// 특정 국가 데이터
export async function fetchCountry(code) {
  try {
    const response = await axios.get(
      `https://naras-api.vercel.app/code/${code}`
    );
    return response.data;
  } catch (e) {
    return null;
  }
}

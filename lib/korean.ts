// 이름 끝소리에 받침이 있는지 판단합니다.
// 영문·숫자로 끝나는 이름(NAVER, LG 등)은 읽는 소리 기준으로 대략 판단합니다.
function hasFinalConsonant(name: string) {
  // "삼성전자(005930)"처럼 괄호가 붙으면 괄호 앞 낱말 기준으로 봅니다.
  const last = name.replace(/\([^)]*\)\s*$/, "").trim().slice(-1);
  const code = last.charCodeAt(0);

  if (code >= 0xac00 && code <= 0xd7a3) {
    return (code - 0xac00) % 28 !== 0;
  }

  if (/[0-9]/.test(last)) {
    return !"2459".includes(last);
  }

  return /[lmnLMN]/.test(last);
}

export function withTopicParticle(name: string) {
  return `${name}${hasFinalConsonant(name) ? "은" : "는"}`;
}

export function withAndParticle(name: string) {
  return `${name}${hasFinalConsonant(name) ? "과" : "와"}`;
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "면책문구",
  description: "Biz100 Radar는 투자 추천이 아닌 기업정보 제공 서비스입니다."
};

export default function DisclaimerPage() {
  return (
    <main className="container">
      <section className="card policy">
        <span className="badge">Disclaimer</span>
        <h1>면책문구</h1>

        <p>
          Biz100 Radar는 기업의 공식 공시, 공개자료, 공식 홈페이지 링크를 바탕으로
          기업 정보를 정리하는 비공식 정보 서비스입니다.
        </p>

        <p>
          본 사이트는 투자자문, 투자일임, 유사투자자문, 매수·매도 추천,
          목표가 제시, 수익률 보장, 금융상품 권유를 제공하지 않습니다.
        </p>

        <p>
          본 사이트에 표시되는 기업명과 상표는 각 권리자에게 있습니다.
          본 사이트는 해당 기업과 제휴·후원·승인 관계가 없습니다.
        </p>

        <p>
          모든 정보는 공개자료를 기반으로 작성되지만, 정확성·완전성·최신성을 보장하지 않습니다.
          중요한 의사결정 전에는 반드시 각 기업의 공식 공시, 공식 홈페이지,
          관련 기관의 원문 자료를 직접 확인하시기 바랍니다.
        </p>
      </section>
    </main>
  );
}

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  description: "Biz100 Radar 개인정보처리방침입니다."
};

export default function PrivacyPage() {
  return (
    <main className="container">
      <section className="card policy">
        <span className="badge">Privacy Policy</span>
        <h1>개인정보처리방침</h1>

        <p>
          Biz100 Radar는 현재 회원가입, 댓글, 결제 기능을 제공하지 않으며,
          사용자가 직접 입력하는 개인정보를 수집하지 않습니다.
        </p>

        <p>
          다만 서비스 운영 과정에서 Google AdSense, 검색엔진, 호스팅 서비스 등
          제3자 서비스가 쿠키, 접속 기록, 기기 정보 등을 처리할 수 있습니다.
        </p>

        <p>
          Google 광고 서비스는 맞춤 광고 제공 및 광고 성과 측정을 위해 쿠키를 사용할 수 있습니다.
          사용자는 브라우저 설정 또는 Google 광고 설정을 통해 맞춤 광고를 제한할 수 있습니다.
        </p>

        <p>
          향후 회원가입, 문의, 구독 기능이 추가될 경우 개인정보 수집 항목과 이용 목적을
          본 페이지에 업데이트하겠습니다.
        </p>

        <p>시행일: 2026년 5월 14일</p>
      </section>
    </main>
  );
}

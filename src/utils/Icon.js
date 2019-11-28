import React from "react";

export default function Icon({ name }) {
  switch (name) {
    case "close":
      return (
        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1.73336 12.8726L1.3798 12.5191L1.3798 12.5191L1.73336 12.8726ZM6.88486 7.72114L7.23841 7.36758L6.88486 7.01403L6.5313 7.36758L6.88486 7.72114ZM1.43031 13.1757L1.07676 13.5292L1.43031 13.8828L1.78386 13.5292L1.43031 13.1757ZM0.824219 12.5696L0.470665 12.216L0.117112 12.5696L0.470665 12.9231L0.824219 12.5696ZM1.12726 12.2665L0.773711 11.913L0.773711 11.913L1.12726 12.2665ZM6.27876 7.11505L6.63232 7.4686L6.98587 7.11505L6.63232 6.76149L6.27876 7.11505ZM1.12726 1.96355L0.773711 2.3171H0.773711L1.12726 1.96355ZM0.824219 1.6605L0.470665 1.30695L0.117112 1.6605L0.470665 2.01405L0.824219 1.6605ZM1.43031 1.05441L1.78386 0.700856L1.43031 0.347303L1.07676 0.700856L1.43031 1.05441ZM1.73336 1.35746L2.08691 1.0039V1.0039L1.73336 1.35746ZM6.88486 6.50896L6.5313 6.86251L6.88486 7.21606L7.23841 6.86251L6.88486 6.50896ZM12.0908 1.30305L11.7372 0.949492L11.7372 0.949492L12.0908 1.30305ZM12.3938 1L12.7474 0.646447L12.3938 0.292893L12.0403 0.646446L12.3938 1ZM12.9999 1.60609L13.3535 1.95965L13.707 1.60609L13.3535 1.25254L12.9999 1.60609ZM12.6969 1.90914L12.3433 1.55558L12.3433 1.55558L12.6969 1.90914ZM7.49095 7.11505L7.13739 6.76149L6.78384 7.11505L7.13739 7.4686L7.49095 7.11505ZM12.6969 12.321L12.3433 12.6745L12.6969 12.321ZM12.9999 12.624L13.3535 12.9776L13.707 12.624L13.3535 12.2704L12.9999 12.624ZM12.3938 13.2301L12.0403 13.5836L12.3938 13.9372L12.7474 13.5836L12.3938 13.2301ZM12.0908 12.927L11.7372 13.2806L12.0908 12.927ZM2.08691 13.2262L7.23841 8.07469L6.5313 7.36758L1.3798 12.5191L2.08691 13.2262ZM1.78386 13.5292L2.08691 13.2262L1.3798 12.5191L1.07676 12.8221L1.78386 13.5292ZM0.470665 12.9231L1.07676 13.5292L1.78386 12.8221L1.17777 12.216L0.470665 12.9231ZM0.773711 11.913L0.470665 12.216L1.17777 12.9231L1.48082 12.6201L0.773711 11.913ZM5.92521 6.76149L0.773711 11.913L1.48082 12.6201L6.63232 7.4686L5.92521 6.76149ZM0.773711 2.3171L5.92521 7.4686L6.63232 6.76149L1.48082 1.60999L0.773711 2.3171ZM0.470665 2.01405L0.773711 2.3171L1.48082 1.60999L1.17777 1.30695L0.470665 2.01405ZM1.07676 0.700856L0.470665 1.30695L1.17777 2.01405L1.78386 1.40796L1.07676 0.700856ZM2.08691 1.0039L1.78386 0.700856L1.07676 1.40796L1.3798 1.71101L2.08691 1.0039ZM7.23841 6.1554L2.08691 1.0039L1.3798 1.71101L6.5313 6.86251L7.23841 6.1554ZM11.7372 0.949492L6.5313 6.1554L7.23841 6.86251L12.4443 1.6566L11.7372 0.949492ZM12.0403 0.646446L11.7372 0.949492L12.4443 1.6566L12.7474 1.35355L12.0403 0.646446ZM13.3535 1.25254L12.7474 0.646447L12.0403 1.35355L12.6463 1.95964L13.3535 1.25254ZM13.0504 2.26269L13.3535 1.95965L12.6463 1.25254L12.3433 1.55558L13.0504 2.26269ZM7.8445 7.4686L13.0504 2.26269L12.3433 1.55558L7.13739 6.76149L7.8445 7.4686ZM13.0504 11.9674L7.8445 6.76149L7.13739 7.4686L12.3433 12.6745L13.0504 11.9674ZM13.3535 12.2704L13.0504 11.9674L12.3433 12.6745L12.6463 12.9776L13.3535 12.2704ZM12.7474 13.5836L13.3535 12.9776L12.6463 12.2704L12.0403 12.8765L12.7474 13.5836ZM11.7372 13.2806L12.0403 13.5836L12.7474 12.8765L12.4443 12.5735L11.7372 13.2806ZM6.5313 8.07469L11.7372 13.2806L12.4443 12.5735L7.23841 7.36758L6.5313 8.07469Z"
            fill="#546A80"
          />
        </svg>
      );
    default:
      return <div></div>;
  }
}

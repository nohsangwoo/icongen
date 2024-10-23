import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Script from 'next/script'

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "App Icon Generator | Free Online Tool for iOS, Android, and Favicon",
  description: "Create app icons for iOS, Android, and favicon.ico easily with our free online tool. Generate multiple sizes and formats without uploading to servers, ensuring privacy and speed.",
  keywords: [
    // 영어 키워드
    "app icon generator, iOS icon maker, Android icon creator, favicon generator, app icon resizer, mobile app icon, app store icon, play store icon, app icon design, free icon tool",
    // 한국어 키워드
    "앱 아이콘 생성기, iOS 아이콘 제작, 안드로이드 아이콘 만들기, 파비콘 생성기, 앱 아이콘 리사이징, 모바일 앱 아이콘, 앱스토어 아이콘, 플레이스토어 아이콘, 앱 아이콘 디자인, 무료 아이콘 도구",
    // 중국어 키워드
    "应用图标生成器, iOS图标制作, 安卓图标创建, favicon生成器, 应用图标调整大小, 移动应用图标, 应用商店图标, Play商店图标, 应用图标设计, 免费图标工具",
    // 일본어 키워드
    "アプリアイコンジェネレーター, iOSアイコン作成, Androidアイコン作成, ファビコン生成, アプリアイコンリサイズ, モバイルアプリアイコン, アプリストアアイコン, プレイストアアイコン, アプリアイコンデザイン, 無料アイコンツール",
    // 러시아어 키워드
    "генератор иконок приложений, создание иконок для iOS, создание иконок для Android, генератор favicon, изменение размера иконок приложений, иконки для мобильных приложений, иконки для App Store, иконки для Play Store, дизайн иконок приложений, бесплатный инструмент для создания иконок"
  ].join(", "),
  openGraph: {
    title: "App Icon Generator - Create Icons for iOS, Android, and Favicon",
    description: "Free online tool to generate app icons for iOS, Android, and favicon.ico. Create multiple sizes and formats instantly, with privacy-focused, serverless conversion.",
    images: [
      {
        url: "https://icongen.ludgi.ai/logo.png",
        width: 1200,
        height: 630,
        alt: "App Icon Generator Tool",
      },
    ],
    locale: "en_US",
    alternateLocale: ["ko_KR", "zh_CN", "ja_JP", "ru_RU"],
  },
  twitter: {
    card: "summary_large_image",
    title: "App Icon Generator - iOS, Android, and Favicon Icon Creator",
    description: "Create app icons for iOS, Android, and favicon.ico with our free online tool. Generate multiple sizes instantly, no server uploads required.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // verification: {
  //   google: "추후_추가할_구글_인증_코드",
  //   yandex: "추후_추가할_얀덱스_인증_코드",
  // },
  alternates: {
    canonical: "https://icongen.ludgi.ai",
    languages: {
      'en-US': 'https://icongen.ludgi.ai/en-US',
      'ko-KR': 'https://icongen.ludgi.ai/ko-KR',
      'zh-CN': 'https://icongen.ludgi.ai/zh-CN',
      'ja-JP': 'https://icongen.ludgi.ai/ja-JP',
      'ru-RU': 'https://icongen.ludgi.ai/ru-RU',
    },
  },
};

const pubId = "ca-pub-5823741955283998"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta name="google-adsense-account" content={pubId} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Script
          async
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${pubId}`}
          crossOrigin="anonymous"
          strategy="afterInteractive"
        />
        {/* Google Funding Choices 스크립트 */}
        <Script
          id="google-funding-choices"
          strategy="afterInteractive"
          src={`https://fundingchoicesmessages.google.com/i/${pubId}?ers=1`}
        />
        {/* Google FC Present 스크립트 */}
        <Script
          id="google-fc-present"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function() {function signalGooglefcPresent() {if (!window.frames['googlefcPresent']) {if (document.body) {const iframe = document.createElement('iframe'); iframe.style = 'width: 0; height: 0; border: none; z-index: -1000; left: -1000px; top: -1000px;'; iframe.style.display = 'none'; iframe.name = 'googlefcPresent'; document.body.appendChild(iframe);} else {setTimeout(signalGooglefcPresent, 0);}}}signalGooglefcPresent();})();`
          }}
        />
      </body>
    </html>
  );
}

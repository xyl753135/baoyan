import type { Metadata } from "next";
import { Inter } from "next/font/google";
import styles from "@/app/page.module.css";
import "./globals.css";
import { Navbar } from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "寶嚴山寶嚴禪寺 Baoyan Chan Monastery",
  description: "這是一座禪宗道場，是僧團的安僧立命處，是眾人心之嚮往處，是三界浪子的歸心處。一座實踐百丈家風的禪宗叢林，一座兼具現代感與古樸氛韻的禪宗道場",
  applicationName: "Baoyan Chan Monastery",
  authors: [{ name: "Kuei-Feng Tung 董奎峰", url: "https://github.com/omgitskuei/" }],
  generator: "Next.js",
  keywords: "buddhism, taiwan, baoyan chan monastery, meditation, education, philanthropy, non-profit",
  creator: "Kuei-Feng Tung 董奎峰",
  robots: "index, follow",
  openGraph: {
    title: "寶嚴山寶嚴禪寺 Baoyan Chan Monastery",
    description: "這是一座禪宗道場，是僧團的安僧立命處，是眾人心之嚮往處，是三界浪子的歸心處。一座實踐百丈家風的禪宗叢林，一座兼具現代感與古樸氛韻的禪宗道場",
    url: "https://www.baoyan.org/",
    siteName: "寶嚴山寶嚴禪寺 Baoyan Chan Monastery",
    images: [{
      url: "/logo.webp",
    }],
    type: "website",
  },
     
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.main}>
      <Navbar menuLabels={["認識寶嚴", "最新消息", "年度課程", "法務及活動", "法寶流通/下載", "捐款護持", "我的課程"]} onClick={undefined} className={""} label={""}></Navbar>
        {children}
        </body>
    </html>
  );
}

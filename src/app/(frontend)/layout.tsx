import type { Metadata } from "next";

import React from "react";
import Script from "next/script";
import { GeistMono } from "geist/font/mono";
import { GeistSans } from "geist/font/sans";
import { cn } from "@/utilities/ui";

import { AdminBar } from "@/components/AdminBar";
import { Footer } from "@/Footer/Component";
import { Header } from "@/Header/Component";
import { Providers } from "@/providers";
import { InitTheme } from "@/providers/Theme/InitTheme";
import { mergeOpenGraph } from "@/utilities/mergeOpenGraph";
import { draftMode } from "next/headers";

import "./globals.css";
import { getServerSideURL } from "@/utilities/getURL";

export default async function RootLayout({ children }: { children: React.ReactNode }) {
	const { isEnabled } = await draftMode();

	return (
		<html className={cn(GeistSans.variable, GeistMono.variable)} lang="en" suppressHydrationWarning>
			<head>
				<InitTheme />
				<link href="/favicon.ico" rel="icon" sizes="32x32" />
				<link href="/favicon.svg" rel="icon" type="image/svg+xml" />
				<Script id="clarity-script" strategy="afterInteractive">
					{`
                        (function(c,l,a,r,i,t,y){
                            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
                        })(window, document, "clarity", "script", "s8ingr3l85");
                    `}
				</Script>
			</head>
			<body>
				<Providers>
					<AdminBar
						adminBarProps={{
							preview: isEnabled,
						}}
					/>

					<Header />
					{children}
					<Footer />
				</Providers>
			</body>
		</html>
	);
}

export const metadata: Metadata = {
	metadataBase: new URL(getServerSideURL()),
	openGraph: mergeOpenGraph(),
	twitter: {
		card: "summary_large_image",
		creator: "@payloadcms",
	},
};

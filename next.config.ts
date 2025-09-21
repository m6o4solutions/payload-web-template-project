import { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";
import redirects from "./redirects";

const NEXT_PUBLIC_SERVER_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL
	? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
	: process.env.__NEXT_PRIVATE_ORIGIN || "http://localhost:3000";

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
	images: {
		qualities: [25, 50, 75, 100],
		remotePatterns: [
			...[NEXT_PUBLIC_SERVER_URL].map((item) => {
				// Ensure item is a string before creating a URL object
				const url = new URL(item as string);

				return {
					hostname: url.hostname,
					protocol: url.protocol.replace(":", "") as "http" | "https", // Added a type cast for the protocol
					pathname: "**", // This is the fix: added the pathname property
				};
			}),
		],
	},
	output: "standalone",
	reactStrictMode: true,
	redirects: redirects,
	webpack: (webpackConfig) => {
		webpackConfig.resolve.extensionAlias = {
			".cjs": [".cts", ".cjs"],
			".js": [".ts", ".tsx", ".js", ".jsx"],
			".mjs": [".mts", ".mjs"],
		};

		return webpackConfig;
	},
};

export default withPayload(nextConfig, { devBundleServerPackages: false });

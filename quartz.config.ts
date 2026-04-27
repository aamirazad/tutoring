import type { QuartzConfig } from "./quartz/cfg";
import * as Plugin from "./quartz/plugins";

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
	configuration: {
		pageTitle: "Aamir's Notes",
		pageTitleSuffix: "",
		enableSPA: true,
		enablePopovers: true,
		locale: "en-US",
		analytics: {
			provider: "rybbit",
			host: "https://analytics.aamirazad.com",
			siteId: "f252b7df1404",
		},
		baseUrl: "notes.aamirazad.com",
		ignorePatterns: ["private", "templates", ".obsidian"],
		defaultDateType: "modified",
		theme: {
			fontOrigin: "googleFonts",
			cdnCaching: true,
			typography: {
				header: "Fraunces",
				body: "Atkinson Hyperlegible",
				code: "JetBrains Mono",
			},
			colors: {
				lightMode: {
					light: "#19181d",
					lightgray: "#33313a",
					gray: "#6f6b78",
					darkgray: "#d9d4de",
					dark: "#f6f2fa",
					secondary: "#ffbe86",
					tertiary: "#ff9a5c",
					highlight: "rgba(255, 154, 92, 0.16)",
					textHighlight: "#9a7d1a99",
				},
				darkMode: {
					light: "#19181d",
					lightgray: "#33313a",
					gray: "#6f6b78",
					darkgray: "#d9d4de",
					dark: "#f6f2fa",
					secondary: "#ffbe86",
					tertiary: "#ff9a5c",
					highlight: "rgba(255, 154, 92, 0.16)",
					textHighlight: "#9a7d1a99",
				},
			},
		},
	},
	plugins: {
		transformers: [
			Plugin.FrontMatter(),
			Plugin.CreatedModifiedDate({
				priority: ["frontmatter"],
			}),
			Plugin.SyntaxHighlighting({
				theme: {
					light: "github-dark",
					dark: "github-dark",
				},
				keepBackground: false,
			}),
			Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
			Plugin.GitHubFlavoredMarkdown(),
			Plugin.TableOfContents(),
			Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
			Plugin.Description(),
			Plugin.Latex({ renderEngine: "katex" }),
		],
		filters: [Plugin.RemoveDrafts()],
		emitters: [
			Plugin.AliasRedirects(),
			Plugin.ComponentResources(),
			Plugin.ContentPage(),
			Plugin.FolderPage(),
			Plugin.TagPage(),
			Plugin.ContentIndex({
				enableSiteMap: true,
				enableRSS: true,
			}),
			Plugin.Assets(),
			Plugin.Static(),
			Plugin.Favicon(),
			Plugin.NotFoundPage(),
			// Comment out CustomOgImages to speed up build time
			Plugin.CustomOgImages(),
		],
	},
};

export default config;

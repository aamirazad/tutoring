import type { PageLayout, SharedLayout } from "./quartz/cfg";
import * as Component from "./quartz/components";

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
	head: Component.Head(),
	header: [],
	afterBody: [],
	footer: Component.Footer(),
};

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
	beforeBody: [
		Component.ConditionalRender({
			component: Component.Breadcrumbs(),
			condition: (page) => page.fileData.slug !== "index",
		}),
		Component.ContentMeta(),
		Component.TagList(),
	],
	left: [
		Component.PageTitle(),
		Component.MobileOnly(Component.Spacer()),
		Component.Flex({
			components: [
				{
					Component: Component.Search(),
					grow: true,
				},
				{ Component: Component.ReaderMode() },
			],
		}),
		Component.Explorer({
			folderDefaultState: "collapsed",
			folderClickBehavior: "collapse",
			mapFn: (node) => {
				if (node.displayName.endsWith("-protected")) {
					node.displayName = node.displayName.slice(0, -"protected".length - 1);
				}
				return node;
			},
		}),
	],
	right: [Component.DesktopOnly(Component.TableOfContents())],
};

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
	beforeBody: [Component.Breadcrumbs(), Component.ContentMeta()],
	left: [
		Component.PageTitle(),
		Component.MobileOnly(Component.Spacer()),
		Component.Flex({
			components: [
				{
					Component: Component.Search(),
					grow: true,
				},
			],
		}),
		Component.Explorer({
			folderDefaultState: "collapsed",
			openFolders: ["AP Physics"],
			folderClickBehavior: "collapse",
			mapFn: (node) => {
				if (node.displayName.endsWith("-protected")) {
					node.displayName = node.displayName.slice(0, -"protected".length - 1);
				}
				return node;
			},
		}),
	],
	right: [],
};

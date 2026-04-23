// @ts-expect-error

import { concatenateResources } from "../util/resources";
import clipboardScript from "./scripts/clipboard.inline";
// @ts-expect-error
import imageLightboxScript from "./scripts/image-lightbox.inline";
import clipboardStyle from "./styles/clipboard.scss";
import type {
	QuartzComponent,
	QuartzComponentConstructor,
	QuartzComponentProps,
} from "./types";

const Body: QuartzComponent = ({ children }: QuartzComponentProps) => {
	return <div id="quartz-body">{children}</div>;
};

Body.afterDOMLoaded = concatenateResources(
	clipboardScript,
	imageLightboxScript,
);
Body.css = clipboardStyle;

export default (() => Body) satisfies QuartzComponentConstructor;

import style from "./styles/footer.scss";
import type {
	QuartzComponent,
	QuartzComponentConstructor,
	QuartzComponentProps,
} from "./types";

interface Options {
	links: Record<string, string>;
}

export default ((opts?: Options) => {
	const Footer: QuartzComponent = ({
		displayClass,
		cfg,
	}: QuartzComponentProps) => {
		const links = opts?.links ?? [];
		return (
			<footer class={`${displayClass ?? ""}`}>
				<p>
					This work is licensed under{" "}
					<a
						href="http://creativecommons.org/licenses/by-nc-sa/4.0/"
						target="_blank"
						rel="license noopener noreferrer"
					>
						CC BY-NC-SA 4.0
					</a>
				</p>
				<ul>
					{Object.entries(links).map(([text, link]) => (
						<li>
							<a href={link}>{text}</a>
						</li>
					))}
				</ul>
			</footer>
		);
	};

	Footer.css = style;
	return Footer;
}) satisfies QuartzComponentConstructor;

const ZOOMABLE_CLASS = "qlb-zoomable";
const OPEN_CLASS = "is-open";

type LightboxState = {
	overlay: HTMLDivElement;
	image: HTMLImageElement;
	closeButton: HTMLButtonElement;
};

let lightbox: LightboxState | null = null;

function closeLightbox() {
	if (!lightbox) return;
	lightbox.overlay.classList.remove(OPEN_CLASS);
	lightbox.overlay.setAttribute("aria-hidden", "true");
	document.body.classList.remove("qlb-open");
}

function openLightbox(target: HTMLImageElement) {
	const src = target.currentSrc || target.src;
	if (!src) return;

	const box = getOrCreateLightbox();
	box.image.src = src;
	box.image.alt = target.alt ?? "";
	box.overlay.classList.add(OPEN_CLASS);
	box.overlay.setAttribute("aria-hidden", "false");
	document.body.classList.add("qlb-open");
}

function getOrCreateLightbox(): LightboxState {
	if (lightbox) return lightbox;

	const overlay = document.createElement("div");
	overlay.className = "qlb-overlay";
	overlay.setAttribute("aria-hidden", "true");

	const media = document.createElement("div");
	media.className = "qlb-media";

	const closeButton = document.createElement("button");
	closeButton.className = "qlb-close";
	closeButton.type = "button";
	closeButton.textContent = "×";
	closeButton.setAttribute("aria-label", "Close image");

	const image = document.createElement("img");
	image.className = "qlb-image";
	image.decoding = "async";

	media.appendChild(closeButton);
	media.appendChild(image);
	overlay.appendChild(media);
	document.body.appendChild(overlay);

	const onOverlayClick = (event: MouseEvent) => {
		if (event.target === overlay) {
			closeLightbox();
		}
	};

	const onCloseClick = (event: MouseEvent) => {
		event.preventDefault();
		event.stopPropagation();
		closeLightbox();
	};

	const onEscape = (event: KeyboardEvent) => {
		if (!event.key.startsWith("Esc")) return;
		if (!overlay.classList.contains(OPEN_CLASS)) return;
		event.preventDefault();
		closeLightbox();
	};

	overlay.addEventListener("click", onOverlayClick);
	closeButton.addEventListener("click", onCloseClick);
	document.addEventListener("keydown", onEscape);

	window.addCleanup(() => {
		overlay.removeEventListener("click", onOverlayClick);
		closeButton.removeEventListener("click", onCloseClick);
		document.removeEventListener("keydown", onEscape);
		overlay.remove();
		document.body.classList.remove("qlb-open");
		lightbox = null;
	});

	lightbox = { overlay, image, closeButton };
	return lightbox;
}

function setupZoomableImages() {
	getOrCreateLightbox();

	const images = Array.from(
		document.querySelectorAll("article img"),
	) as HTMLImageElement[];
	for (const image of images) {
		if (image.classList.contains("emoji")) {
			continue;
		}

		image.classList.add(ZOOMABLE_CLASS);

		const onClick = (event: MouseEvent) => {
			event.preventDefault();
			event.stopPropagation();
			openLightbox(image);
		};

		image.addEventListener("click", onClick);
		window.addCleanup(() => {
			image.classList.remove(ZOOMABLE_CLASS);
			image.removeEventListener("click", onClick);
		});
	}
}

document.addEventListener("nav", () => {
	closeLightbox();
	setupZoomableImages();
});

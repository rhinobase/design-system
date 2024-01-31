import { Callout } from "../components/Callout";
import { InfoButton } from "../components/InfoButton";
import { QuickLink, QuickLinks } from "../components/QuickLinks";
import { Example, Sandpack } from "../components/code";

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: "note",
        matches: ["note", "warning"],
        errorLevel: "critical",
      },
    },
    render: Callout,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: ({ src, alt = "", caption }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
  },
  example: {
    render: Example,
    attributes: {
      children: { type: String },
    },
  },
  "quick-links": {
    render: QuickLinks,
  },
  "quick-link": {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },
  info: {
    render: InfoButton,
    attributes: {
      type: { type: String, default: "function" },
      children: { type: String, default: "" },
    },
  },
  sandpack: {
    render: Sandpack,
    attributes: {
      name: { type: String },
    },
  },
};

export default tags;

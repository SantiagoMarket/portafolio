import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { contact } from "@/lib/site-copy";

const channels = [
  {
    label: "Email",
    href: "mailto:sant4cubillos@outlook.com",
    display: "sant4cubillos@outlook.com",
    icon: "mail",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/victor-santiago-cubillos-cruz",
    display: "victor-santiago-cubillos-cruz",
    icon: "out",
  },
  {
    label: "GitHub",
    href: "https://github.com/SantiagoMarket",
    display: "github.com/SantiagoMarket",
    icon: "out",
  },
] as const;

/** "full-time" no se parte en dos líneas: se lee como una sola palabra. */
const [headLead, headTail] = contact.headline.split("full-time");

export default function Contact() {
  return (
    <footer className="on-burg contact" id="contacto">
      <div className="wrap">
        <div className="contact-grid">
          <div>
            <h2>
              {headLead}
              <span className="whitespace-nowrap">full-time</span>
              {headTail}
            </h2>
            <div className="actions">
              <Link className="btn btn--light" href="/agenda">
                {contact.cta}
              </Link>
            </div>
            <p className="contact-note">{contact.note}</p>
          </div>
          <ul className="channels">
            {channels.map(({ label, href, display, icon }) => {
              const external = !href.startsWith("mailto");
              return (
                <li key={label}>
                  <a
                    href={href}
                    target={external ? "_blank" : undefined}
                    rel={external ? "noopener noreferrer" : undefined}
                  >
                    <span className="k">{label}</span>
                    <span className="v">{display}</span>
                    <Icon name={icon} />
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        <p className="contact-end">
          <span>
            Víctor Santiago Cubillos Cruz <span className="sep" aria-hidden="true">·</span> Bogotá
          </span>
          <a href="#top">Volver al mapa</a>
        </p>
      </div>
    </footer>
  );
}

"use client";

type ContactsSectionProps = {
  playHoverSound: () => void;
  playClickSound: () => void;
};

const contacts = [
  {
    label: "X / TWITTER",
    value: "@scream_vision",
    href: "https://x.com/scream_vision",
    icon: "x",
  },
  {
    label: "LINKTREE",
    value: "linktr.ee/screamvision",
    href: "https://linktr.ee/screamvision",
    icon: "linktree",
  },
  {
    label: "EMAIL",
    value: "screamvisionmfer@gmail.com",
    href: "mailto:screamvisionmfer@gmail.com",
    icon: "mail",
  },
  {
    label: "TELEGRAM",
    value: "@screamdesign",
    href: "https://t.me/screamdesign",
    icon: "telegram",
  },
];

export function ContactsSection({ playHoverSound, playClickSound }: ContactsSectionProps) {
  return (
    <section className="contactsScreen uiFont">
      <div className="contactsCorner contactsCornerTl" />
      <div className="contactsCorner contactsCornerTr" />
      <div className="contactsCorner contactsCornerBl" />
      <div className="contactsCorner contactsCornerBr" />

      <div className="contactsLeftPanel">
        <div className="contactsTitleRow">
          <h2>CONTACT DRB UNIT</h2>
        </div>

        <p className="contactsIntro">
          You can reach me through any of the channels listed. All signals are monitored.
          All messages are welcome. Stay connected.
        </p>

        <div className="contactsRoutes">
          {contacts.map((item) => (
            <a
              key={item.label}
              href={item.href}
              target={item.href.startsWith("mailto:") ? undefined : "_blank"}
              rel={item.href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
              className="contactsRoute"
              onMouseEnter={playHoverSound}
              onFocus={playHoverSound}
              onClick={playClickSound}
            >
              <span className={`contactsRouteIcon ${item.icon}`} aria-hidden="true" />
              <span className="contactsRouteText">
                <strong>{item.label}</strong>
                <em>{item.value}</em>
              </span>
              <b aria-hidden="true">›</b>
            </a>
          ))}
        </div>
      </div>

      <div className="contactsRightPanel">
        <div className="contactsSignalFrame">
          <span className="contactsSignalCorner tl" />
          <span className="contactsSignalCorner tr" />
          <span className="contactsSignalCorner bl" />
          <span className="contactsSignalCorner br" />
          <img src="/effects/contact-grok.gif" alt="" className="contactsSignalImage" />
        </div>
      </div>

      <div className="contactsMotto">
        <span />
        <strong>STAY CONNECTED. STAY BASED.</strong>
        <span />
      </div>
    </section>
  );
}

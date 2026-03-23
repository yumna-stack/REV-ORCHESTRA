"use client";

const allLogos = [
  { name: "Gmail", src: "https://assistants.ae/assets/logos/gmail.svg" },
  { name: "HubSpot", src: "https://assistants.ae/assets/logos/hubspot.svg" },
  { name: "Salesforce", src: "https://assistants.ae/assets/logos/salesforce.svg" },
  { name: "Slack", src: "https://assistants.ae/assets/logos/slack.svg" },
  { name: "n8n", src: "https://assistants.ae/assets/logos/n8n.svg" },
  { name: "Calendly", src: "https://assistants.ae/assets/logos/calendly.svg" },
  { name: "Google Sheets", src: "https://assistants.ae/assets/logos/googlesheets.svg" },
  { name: "Stripe", src: "https://assistants.ae/assets/logos/stripe.svg" },
  { name: "Notion", src: "https://assistants.ae/assets/logos/notion.svg" },
  { name: "ClickUp", src: "https://assistants.ae/assets/logos/clickup.svg" },
  { name: "Intercom", src: "https://assistants.ae/assets/logos/intercom.svg" },
  { name: "Mailchimp", src: "https://assistants.ae/assets/logos/mailchimp.svg" },
  { name: "Linear", src: "https://assistants.ae/assets/logos/linear.svg" },
  { name: "Google Calendar", src: "https://assistants.ae/assets/logos/googlecalendar.svg" },
  { name: "Zoom", src: "https://assistants.ae/assets/logos/zoom.svg" },
  { name: "Google Meet", src: "https://assistants.ae/assets/logos/googlemeet.svg" },
  { name: "Google Drive", src: "https://assistants.ae/assets/logos/googledrive.svg" },
  { name: "Figma", src: "https://assistants.ae/assets/logos/figma.svg" },
  { name: "Trello", src: "https://assistants.ae/assets/logos/trello.svg" },
  { name: "Airtable", src: "https://assistants.ae/assets/logos/airtable.svg" },
  { name: "Asana", src: "https://assistants.ae/assets/logos/asana.svg" },
  { name: "Jira", src: "https://assistants.ae/assets/logos/jira.svg" },
  { name: "Pipedrive", src: "https://assistants.ae/assets/logos/pipedrive.svg" },
  { name: "Discord", src: "https://assistants.ae/assets/logos/discord.svg" },
];

function shuffleArray<T>(arr: T[], seed: number): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor((Math.sin(seed + i) * 0.5 + 0.5) * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function TickerColumn({
  logos,
  speed,
  direction,
}: {
  logos: typeof allLogos;
  speed: number;
  direction: "up" | "down";
}) {
  const items = [...logos, ...logos, ...logos];

  return (
    <div className="w-12 h-full overflow-hidden relative">
      <div
        className="flex flex-col items-center gap-4"
        style={{
          animation: `ticker${direction === "up" ? "Up" : "Down"} ${speed}s linear infinite`,
        }}
      >
        {items.map((logo, i) => (
          <div
            key={i}
            className="w-12 h-12 rounded-xl bg-[rgba(255,255,255,0.08)] flex items-center justify-center shrink-0"
          >
            <img
              src={logo.src}
              alt={logo.name}
              className="w-7 h-7 object-contain"
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function IntegrationTicker() {
  const columns = 4;
  const logosPerColumn = Math.ceil(allLogos.length / columns);

  return (
    <div className="w-full h-full flex items-center justify-center gap-4 overflow-hidden">
      {Array.from({ length: columns }).map((_, colIndex) => {
        const shuffled = shuffleArray(allLogos, colIndex * 7);
        const columnLogos = shuffled.slice(0, logosPerColumn);
        const direction = colIndex % 2 === 0 ? "up" : "down";
        const speed = 20 + colIndex * 5;

        return (
          <TickerColumn
            key={colIndex}
            logos={columnLogos}
            speed={speed}
            direction={direction as "up" | "down"}
          />
        );
      })}
    </div>
  );
}

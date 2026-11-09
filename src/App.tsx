
import { useState } from "react";
import { House, BriefcaseBusiness, MessageCircle } from "lucide-react";

import { Hero } from "./components/Hero";
import { Work } from "./components/Work";
import { Contact } from "./components/Contact";
import { LimelightNav } from "./components/ui/limelight-nav";
import { siteConfig } from "./config/site";

export type View = "home" | "work" | "contact";

const navigationItems = [
  {
    id: "home",
    label: "Home",
    icon: <House />,
  },
  {
    id: "work",
    label: "Work",
    icon: <BriefcaseBusiness />,
  },
  {
    id: "contact",
    label: "Let's Build",
    icon: <MessageCircle />,
  },
];

export default function App() {
  const [view, setView] = useState<View>("home");

  const activeIndex = navigationItems.findIndex(
    (item) => item.id === view
  );

  return (
    <>
      <main>
        {view === "home" && <Hero />}

        {view === "work" && (
          <Work projects={siteConfig.projects} />
        )}

        {view === "contact" && (
          <Contact contact={siteConfig.contact} />
        )}
      </main>

      <LimelightNav
        items={navigationItems.map((item) => ({
          ...item,
          onClick: () => setView(item.id as View),
        }))}
        activeIndex={activeIndex}
      />
    </>
  );
}

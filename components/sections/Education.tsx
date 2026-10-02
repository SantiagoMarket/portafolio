import SectionHeading from "@/components/ui/SectionHeading";
import Entry from "@/components/ui/Entry";
import { education } from "@/lib/site-copy";

export default function Education() {
  return (
    <section id="formacion">
      <div className="max-w-5xl mx-auto px-6 py-24">
        <SectionHeading title="FORMACIÓN" />
        {education.map(({ institution, detail, period }, i) => (
          <Entry
            key={institution}
            first={i === 0}
            title={institution}
            org={detail}
            period={period}
          />
        ))}
      </div>
    </section>
  );
}

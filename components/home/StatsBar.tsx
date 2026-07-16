import { companyInfo, services, expertiseAreas } from "@/lib/constants";

export default function StatsBar() {
  const stats = [
    { value: companyInfo.yearsExperience, label: "Years combined team experience" },
    { value: String(services.length), label: "Core engineering services" },
    { value: String(expertiseAreas.length), label: "Heavy-process industries served" },
  ];

  return (
    <section className="bg-deep">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-10 grid grid-cols-2 md:grid-cols-3 gap-8 text-center">
        {stats.map((stat, i) => (
          <div key={stat.label} className={i === stats.length - 1 ? "col-span-2 md:col-span-1" : undefined}>
            <p className={`text-3xl sm:text-4xl font-bold ${i === 1 ? "text-brand" : "text-white"}`}>
              {stat.value}
            </p>
            <p className="text-white/60 text-sm mt-1 tracking-wide">{stat.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

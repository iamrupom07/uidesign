import DashboardShell from "@/components/dashboard/DashboardShell";

export const metadata = {
  title: "Executive Dashboard | MACPROTEC Central Operations",
  description: "Secure enterprise dashboard console for telemetry, leads, and operations management.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <DashboardShell>{children}</DashboardShell>;
}

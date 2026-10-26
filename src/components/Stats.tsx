
import { useCountUp } from "../hooks/useCountUp";
import type { Stat } from "../types";

interface StatsProps {
  stats: Stat[];
}

interface StatItemProps {
  stat: Stat;
}

function StatItem({ stat }: StatItemProps) {
  const { count, ref } = useCountUp(stat.value, 1200);

  return (
    <div className="stat-item" ref={ref}>
      <strong className="stat-value">
        {count}
        {stat.suffix}
      </strong>
      <span className="stat-label">{stat.label}</span>
    </div>
  );
}

function Stats({ stats }: StatsProps) {
  return (
    <section className="stats-section" aria-label="Portfolio statistics">
      <div className="container stats-grid">
        {stats.map((stat) => (
          <StatItem key={stat.label} stat={stat} />
        ))}
      </div>
    </section>
  );
}

export default Stats;

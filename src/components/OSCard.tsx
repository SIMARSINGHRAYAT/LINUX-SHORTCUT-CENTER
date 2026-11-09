import { ArrowRight, LockKeyhole, Check } from "lucide-react";
import { Link } from "react-router-dom";
import type { Distribution } from "../data/distributions";
import { DistributionOfficialLogo } from "./OfficialLogos";

export function OSCard({ distribution }: { distribution: Distribution }) {
  const available = distribution.status === "available";

  const cardContent = (
    <div className={`os-card glass-card ${available ? "is-available" : "os-card-soon"}`}>
      <div className="os-card-top">
        <div className="os-logo-container" style={{ borderColor: `${distribution.color}40`, backgroundColor: `${distribution.color}15` }}>
          <DistributionOfficialLogo slug={distribution.slug} size={36} />
        </div>
        <span className={`status-label ${available ? "status-available" : "status-soon"}`}>
          {available ? (
            <>
              <Check size={13} className="text-emerald-400" />
              <span>Available</span>
            </>
          ) : (
            <>
              <LockKeyhole size={12} className="text-neutral-400" />
              <span>Coming soon</span>
            </>
          )}
        </span>
      </div>

      <div className="os-card-content">
        <h2 className="chrome-heading">{distribution.name}</h2>
        <p className="chrome-subtext">{distribution.description}</p>
      </div>

      <div className="os-card-footer">
        {available ? (
          <span className="os-card-action">
            <span>Explore {distribution.name}</span>
            <ArrowRight size={15} />
          </span>
        ) : (
          <span className="os-card-action is-disabled">
            <span>Not available yet</span>
            <LockKeyhole size={13} />
          </span>
        )}
      </div>
    </div>
  );

  return available ? (
    <Link to={`/dashboard/${distribution.slug}`} className="os-card-link-wrapper" aria-label={`Select ${distribution.name}`}>
      {cardContent}
    </Link>
  ) : (
    <article aria-label={`${distribution.name}, coming soon`}>
      {cardContent}
    </article>
  );
}

import { ArrowIcon } from './icons';

/** A left-to-right chain of steps, e.g. Resource → Booking. */
export function Flow({ steps, label, className = '' }: { steps: string[]; label?: string; className?: string }) {
  return (
    <ol className={`flow ${className}`} aria-label={label ?? steps.join(', then ')}>
      {steps.map((step, i) => (
        <li key={step + i} className="flow__step">
          <span className="pill">{step}</span>
          {i < steps.length - 1 && (
            <span className="flow__arrow">
              <ArrowIcon size={20} />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

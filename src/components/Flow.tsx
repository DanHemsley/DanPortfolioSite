import type { Accent } from '../content';
import { ArrowIcon, Dot } from './icons';

/**
 * A left-to-right chain of steps, e.g. Resource → Booking.
 * `accents` (one per step) turns the pills into dotted tags, as in "The Assignment connected what happened next".
 */
export function Flow({
  steps,
  accents,
  label,
  className = '',
}: {
  steps: string[];
  accents?: Accent[];
  label?: string;
  className?: string;
}) {
  return (
    <ol className={`flow ${accents ? 'flow--tags' : ''} ${className}`} aria-label={label ?? steps.join(', then ')}>
      {steps.map((step, i) => (
        <li key={step + i} className="flow__step">
          <span className="pill">
            {accents?.[i] && <Dot accent={accents[i]} />}
            {step}
          </span>
          {i < steps.length - 1 && (
            <span className="flow__arrow">
              <ArrowIcon size={accents ? 24 : 20} />
            </span>
          )}
        </li>
      ))}
    </ol>
  );
}

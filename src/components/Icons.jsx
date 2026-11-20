import {
  Code2, Bot, Database, Network, Cloud, Compass, GraduationCap, Wrench, Globe, AppWindow,
  Webhook, Sparkles, Workflow, Terminal, Table2, ArrowRightLeft, Router, CloudUpload,
  GitBranch, Lightbulb, Layers, Presentation, Laptop, Cable, DatabaseZap, LifeBuoy, Bug,
  HardDrive,
} from 'lucide-react';

const map = {
  Code2, Bot, Database, Network, Cloud, Compass, GraduationCap, Wrench, Globe, AppWindow,
  Webhook, Sparkles, Workflow, Terminal, Table2, ArrowRightLeft, Router, CloudUpload,
  GitBranch, Lightbulb, Layers, Presentation, Laptop, Cable, DatabaseZap, LifeBuoy, Bug,
  HardDrive,
};

export function LucideByName({ name, size = 22, ...rest }) {
  const Cmp = map[name] || Code2;
  return <Cmp size={size} strokeWidth={1.75} aria-hidden="true" focusable="false" {...rest} />;
}

// Chip de tecnología: logo oficial de Simple Icons (monocromo) o solo texto.
export function TechChip({ tech }) {
  return (
    <li className="tech-chip">
      {tech.icon ? (
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false">
          <path d={tech.icon.path} fill="currentColor" />
        </svg>
      ) : null}
      <span>{tech.name}</span>
    </li>
  );
}

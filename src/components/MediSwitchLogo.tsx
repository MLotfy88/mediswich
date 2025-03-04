
import { GitCompare, MoveDownRight, Pill, PillIcon } from "lucide-react";

interface MediSwitchLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'footer';
}

export default function MediSwitchLogo({ size = 'md', variant = 'default' }: MediSwitchLogoProps) {
  const sizes = {
    sm: {
      containerSize: "h-8",
      logoSize: "text-lg",
      iconSize: 16,
      borderWidth: "border-2",
      iconGap: "space-x-0.5"
    },
    md: {
      containerSize: "h-10",
      logoSize: "text-xl",
      iconSize: 20,
      borderWidth: "border-[2.5px]",
      iconGap: "space-x-1"
    },
    lg: {
      containerSize: "h-12",
      logoSize: "text-2xl",
      iconSize: 24,
      borderWidth: "border-3",
      iconGap: "space-x-1.5"
    }
  };

  const colors = {
    default: {
      textGradient: "from-pharma-primary to-pharma-accent",
      bgGradient: "bg-gradient-to-r from-pharma-primary/10 to-pharma-accent/10",
      pillColor: "text-pharma-primary",
      capsuleColor: "text-pharma-accent",
      arrowColor: "text-pharma-primary/70"
    },
    footer: {
      textGradient: "from-white to-white/80",
      bgGradient: "bg-gradient-to-r from-white/20 to-white/10",
      pillColor: "text-white",
      capsuleColor: "text-white/80",
      arrowColor: "text-white/60"
    }
  };
  
  return (
    <div className="flex items-center justify-center">
      <div className={`
        ${sizes[size].containerSize} 
        flex items-center px-3 py-1 
        rounded-full ${colors[variant].bgGradient} 
        ${sizes[size].borderWidth} 
        ${variant === 'default' ? 'border-pharma-primary/20' : 'border-white/20'}
        shadow-sm backdrop-blur-sm
      `}>
        <div className={`flex items-center ${sizes[size].iconGap}`}>
          <Pill className={colors[variant].pillColor} strokeWidth={3} size={sizes[size].iconSize} />
          <GitCompare className={colors[variant].arrowColor} strokeWidth={3} size={sizes[size].iconSize} />
          <PillIcon className={colors[variant].capsuleColor} strokeWidth={3} size={sizes[size].iconSize} />
        </div>
        <span className={`
          ml-2 font-bold ${sizes[size].logoSize} 
          bg-gradient-to-r ${colors[variant].textGradient} 
          bg-clip-text text-transparent tracking-tight
        `}>
          MediSwitch
        </span>
      </div>
    </div>
  );
}

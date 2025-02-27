
import { PillIcon } from "lucide-react";

interface MediSwitchLogoProps {
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'footer';
}

export default function MediSwitchLogo({ size = 'md', variant = 'default' }: MediSwitchLogoProps) {
  const sizes = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const colors = {
    default: "from-pharma-primary to-pharma-accent",
    footer: "from-white to-white/80"
  };
  
  return (
    <div className="flex items-center">
      <div className={`rounded-md ${variant === 'default' ? 'bg-pharma-primary/10' : 'bg-white/10'} p-1 mr-2`}>
        <PillIcon 
          className={`${variant === 'default' ? 'text-pharma-primary' : 'text-white'}`} 
          size={size === 'sm' ? 18 : size === 'md' ? 24 : 30} 
        />
      </div>
      <span className={`font-bold ${sizes[size]} bg-gradient-to-r ${colors[variant]} bg-clip-text text-transparent`}>
        MediSwitch
      </span>
    </div>
  );
}

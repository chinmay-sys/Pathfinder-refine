import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

interface SkillBadgeItemProps {
  skill: string;
  variant?: "secondary" | "outline" | "default";
  className?: string;
}

export const SkillBadgeItem = ({
  skill,
  variant = "secondary",
  className = "",
}: SkillBadgeItemProps) => {
  const handleSkillClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent("learn " + skill + " tutorial")}`;
    window.open(searchUrl, "_blank", "noopener,noreferrer");
  };

  return (
    <Badge
      variant={variant}
      onClick={handleSkillClick}
      className={`cursor-pointer hover:scale-105 hover:bg-primary/30 hover:border-primary/50 transition-all group flex items-center gap-1 py-1 px-2.5 text-xs ${className}`}
      title={`Click to search tutorials for ${skill}`}
    >
      <span>{skill}</span>
      <ExternalLink className="w-3 h-3 opacity-40 group-hover:opacity-100 transition-opacity text-primary" />
    </Badge>
  );
};

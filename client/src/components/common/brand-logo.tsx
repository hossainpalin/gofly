import Logo from "@/assets/icons/logo.png";

interface BrandLogoProps {
  className?: string;
}

export default function BrandLogo({ className }: BrandLogoProps) {
  return <img className={className} src={Logo} alt="logo" />;
}

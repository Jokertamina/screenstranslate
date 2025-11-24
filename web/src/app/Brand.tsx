type BrandProps = {
  withPro?: boolean;
  className?: string;
  /**
   * Si es false, muestra el texto sin colores de marca (útil en botones sobre fondo cian).
   */
  colored?: boolean;
};

export function Brand({ withPro = false, className = "", colored = true }: BrandProps) {
  if (!colored) {
    return (
      <span className={className}>{`ScreensTranslate${withPro ? " Pro" : ""}`}</span>
    );
  }

  return (
    <span className={className}>
      <span className="text-cyan-400">Screens</span>
      <span className="text-slate-50">Translate</span>
      {withPro && <span className="text-slate-50"> Pro</span>}
    </span>
  );
}

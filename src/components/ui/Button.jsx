const variants = {
  primary:
    'bg-brand-700 text-white shadow-lg shadow-brand-800/25 hover:bg-brand-600 hover:shadow-brand-700/30',
  secondary:
    'border border-brand-600/25 bg-white text-brand-700 hover:border-brand-400 hover:bg-brand-50',
  ghost: 'text-brand-700/80 hover:text-brand-500',
  light: 'bg-white text-brand-700 shadow-md hover:bg-brand-50',
  'on-dark':
    'border border-white/25 bg-white/10 text-white hover:border-brand-300 hover:bg-white/15',
}

export default function Button({
  children,
  href,
  variant = 'primary',
  className = '',
  type = 'button',
  onClick,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-all duration-300 active:scale-[0.98]'

  const classes = `${base} ${variants[variant]} ${className}`

  if (href) {
    return (
      <a href={href} className={classes} onClick={onClick} {...props}>
        {children}
      </a>
    )
  }

  return (
    <button type={type} className={classes} {...props}>
      {children}
    </button>
  )
}

export default function Button({ label, className, type = 'button', ...rest}) {
  return (
    <button 
      className={className}
      type={type}
      {...rest}
    >
      {label}
    </button>
  );
} 
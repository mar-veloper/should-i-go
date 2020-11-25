export default function Input({ label, name, type = 'text', ...rest }) {
  return (
    <form>
      <input
        type={type}
        name={name}
        placeholder='Search'
        aria-label='Search'
        {...rest}
      />
    </form>
  );
} 
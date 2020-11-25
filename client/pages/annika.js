import styles from '../styles/test.scss';
import Input from '../components/common/Input';

export default function Annika() {
  return (
    <div>
      <nav>
        <h1>Logo</h1>
      </nav>

      <section className="hero">
        <h2>Should I go to</h2>
        <Input />
      </section>
    </div>
  );
}
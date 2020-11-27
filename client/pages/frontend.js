import Input from '../components/common/Input';
import Button from '../components/common/Button';

export default function Frontend() {
  return (
    <div>
      <nav className="search-nav">
        <p className="search-nav-copy">Should I go to</p>
        <Input />
      </nav>

      <section className="map-placeholder"></section>
      <section className="hero-content">
        <h3 className="question">Yay, you're good to go to Ikea!</h3>
      </section>

      <section className="data-live">
        <h4 className="data-title">How crowded is it now?</h4>
        <div className="data-live-visual">
          <p className="data-live-value">25%</p>
          <div className="circle"></div>
        </div>
        <Button label="Live" className="selected"/>
        <Button label="Average"/>
      </section>

      <section className="data-day">
        <h4 className="data-title">Day overview</h4>
      </section>
    </div>
  );
}
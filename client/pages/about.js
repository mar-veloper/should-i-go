import styles from '../styles/about.module.scss'

export default function About() {
  return (
    <div className={styles.container}>
      <main>
        <h1 className={styles.title}>About the app</h1>
        <p className={styles.text}>
          <b>Should-I-Go</b> is providing users with information on visitor density in
          popular places. Our main goal is to help people stay safe in times of
          pandemic like Covid-19. But this application can also be used in everyday
          life, like checking when the best time is to go to your destination, to
          avoid traffic or having too much people in a specific place.
        </p>
        <p className={styles.text}>
          The application is aggregating most of its data from the Google API.
          <b>Should-I-Go</b> is a startup company created and developed by The New Promise
          team from <b>School of Applied Technology</b>.
        </p>
        <p className={styles.text}>
          The team behind this project:
        </p>
        <ul className={styles.list}>
          <li><a href="https://www.linkedin.com/in/jrmt/">Jonmar Tamon</a></li>
          <li><a href="https://github.com/AlanoxSwe">Alan Hajo</a></li>
          <li><a href="https://github.com/annika-works">Annika Hallerberg</a></li>
        </ul>
      </main>
    </div>
  );
}
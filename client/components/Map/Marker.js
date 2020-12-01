import styles from '../../styles/mapmarker.module.scss';


const MapMarker = ({ text }) => {
  return (
    <div className={styles.placeholder}>
      <div className={styles.point} />
      <div className={styles.label}>{text}</div>
    </div>
  );
};

export default MapMarker;

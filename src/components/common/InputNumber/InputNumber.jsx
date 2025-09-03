import styles from './InputNumber.module.scss';

const InputNumber = ({value, onChange}) => {
  return (
    <input
      className={styles.input}
      value={value}
      onChange={onChange}
      type="number"
    />
  );
};

export default InputNumber;

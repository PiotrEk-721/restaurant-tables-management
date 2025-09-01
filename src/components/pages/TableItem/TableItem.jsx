import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import clsx from 'clsx';
import styles from './TableItem.module.scss';

const TableItem = ({ id, status }) => {
  return (
    <div className="d-flex w-100 text-black pb-3 border-bottom border-light-subtle">
      <h3 className="m-0 pe-4 align-self-end fs-3">Table {id}</h3>
      <p className="m-0 align-self-end fs-6">
        <strong>Status:</strong> {status}
      </p>
      <Link key={id} to={'/table/'.concat(id)} className={clsx(styles.noLinkStyles, 'ms-auto')}>
        <Button>Show more</Button>
      </Link>
    </div>
  );
};

export default TableItem;

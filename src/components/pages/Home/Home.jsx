import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTables, getAllTables } from '../../../redux/tablesRedux.js';
import TableItem from '../TableItem/TableItem.jsx';
import { Stack } from 'react-bootstrap';

const Home = () => {
  const dispatch = useDispatch();
  const tables = useSelector(getAllTables);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => dispatch(fetchTables()), [dispatch]);

  return (
    <main>
      <h2 className="fs-1 pt-4 pb-2">All tables</h2>
      {loading ? (
        <div className="fs-4 text-muted">Loading...</div>
      ) : (
        <Stack gap={3}>
          {tables.map((table) => (
            <TableItem key={table.id} id={table.id} status={table.status} />
          ))}
        </Stack>
      )}
    </main>
  );
};

export default Home;

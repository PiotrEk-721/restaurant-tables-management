import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllTables } from '../../../redux/tablesRedux.js';
import TableItem from '../TableItem/TableItem.jsx';
import { Stack } from 'react-bootstrap';

const Home = () => {
  const tables = useSelector(getAllTables);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

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

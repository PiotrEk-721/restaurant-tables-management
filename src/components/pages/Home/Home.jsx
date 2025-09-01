import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getAllTables } from '../../../redux/tablesRedux.js';
import TableItem from '../TableItem/TableItem.jsx';
import { Stack } from 'react-bootstrap';

const Home = () => {
  const tables = useSelector(getAllTables);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1000); // 1 sekunda
    return () => clearTimeout(timer); // czyścimy timer przy odmontowaniu komponentu
  }, []);

  return (
    <main>
      <h2 className="fs-1 pt-4 pb-2">All tables</h2>

      {loading ? (
        <div className="fs-4 text-muted">Loading...</div>
      ) : (
        <Stack gap={3}>
          {tables.map((table) => (
            <TableItem id={table.id} status={table.status} />
          ))}
        </Stack>
      )}
    </main>
  );
};

export default Home;

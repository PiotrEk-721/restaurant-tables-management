import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { Button, Form, Row, Col } from 'react-bootstrap';
import { getTableById, updateTableRequest } from '../../../redux/tablesRedux.js';
import styles from './TableForm.module.scss';
import InputNumber from '../../common/InputNumber/InputNumber.jsx';

const STATUSES = ['Free', 'Reserved', 'Busy', 'Cleaning'];

const TableForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { tableId } = useParams();
  const tableData = useSelector((state) => getTableById(state, tableId));
  const [status, setStatus] = useState('');
  const [peopleAmount, setPeopleAmount] = useState(0);
  const [maxPeopleAmount, setMaxPeopleAmount] = useState(0);
  const [bill, setBill] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() => {
    if (tableData) {
      setStatus(tableData.status);
      setPeopleAmount(tableData.peopleAmount);
      setMaxPeopleAmount(tableData.maxPeopleAmount);
      setBill(tableData.bill);
      setIsLoading(false);
    }
  }, [tableData]);

  useEffect(() => {
    if (!isLoading && !tableData) {
      navigate('/');
    }
  }, [isLoading, tableData, navigate]);

  useEffect(() => {
    if (status === 'Free' || status === 'Cleaning') {
      setPeopleAmount(0);
    }
    if (status !== 'Busy') {
      setBill(0);
    }
  }, [status]);

  const handleSubmit = (event) => {
    event.preventDefault();
    dispatch(
      updateTableRequest({
        id: tableId,
        status,
        peopleAmount: Number(peopleAmount),
        maxPeopleAmount: Number(maxPeopleAmount),
        bill: status === 'Busy' ? Number(bill) : 0,
      })
    );
    setIsUpdated(true);
    setTimeout(() => navigate('/'), 1000);
  };

  const handlePeopleAmountChange = (value) => {
    const parsed = Math.max(0, Math.min(10, parseInt(value) || 0));
    if (parsed <= maxPeopleAmount) {
      setPeopleAmount(parsed);
    } else {
      setPeopleAmount(maxPeopleAmount);
    }
  };

  const handleMaxPeopleAmountChange = (value) => {
    const parsed = Math.max(0, Math.min(10, parseInt(value) || 0));
    setMaxPeopleAmount(parsed);
    if (peopleAmount > parsed) {
      setPeopleAmount(parsed);
    }
  };

  return (
    <section className={styles.sectionWidth}>
      {isLoading ? (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{ height: '200px' }}>
          <div className="fs-4 text-muted mb-3">Ładuje koszyk...</div>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : isUpdated ? (
        <div className="d-flex justify-content-center align-items-center" style={{ height: '200px' }}>
          <div className="fs-4 text-success">Wprowadzono zmiany</div>
        </div>
      ) : (
        <>
          <h2 className="fs-1 my-4">Table {tableId}</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="Status">
              <Form.Label column sm={3}>
                <strong>Status:</strong>
              </Form.Label>
              <Col sm={7}>
                <Form.Select value={status} onChange={(e) => setStatus(e.target.value)}>
                  {STATUSES.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </Form.Select>
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="People">
              <Form.Label column sm={3}>
                <strong>People:</strong>
              </Form.Label>
              <Col sm={9}>
                <div className="d-flex justify-content-start ps-2">
                  <InputNumber
                    value={peopleAmount}
                    onChange={(e) => handlePeopleAmountChange(e.target.value)}
                  ></InputNumber>
                  <div className="d-flex align-items-center px-2">
                    <p className="fs-5 m-0">/</p>
                  </div>
                  <InputNumber
                    value={maxPeopleAmount}
                    onChange={(e) => handleMaxPeopleAmountChange(e.target.value)}
                  ></InputNumber>
                </div>
              </Col>
            </Form.Group>
            {status === 'Busy' && (
              <Form.Group as={Row} className="mb-3" controlId="tableBill">
                <Form.Label column sm={3}>
                  <strong>Bill:</strong>
                </Form.Label>
                <Col sm={9}>
                  <div className="d-flex justify-content-start ps-2">
                    <div className="d-flex align-items-center pe-2">
                      <p className="fs-5 m-0">$</p>
                    </div>
                    <InputNumber value={bill} onChange={(e) => setBill(e.target.value)}></InputNumber>
                  </div>
                </Col>
              </Form.Group>
            )}
            <Button variant="primary" type="submit">
              Update
            </Button>
          </Form>
        </>
      )}
    </section>
  );
};

export default TableForm;

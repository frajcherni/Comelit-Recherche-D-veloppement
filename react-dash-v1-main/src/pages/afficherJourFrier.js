import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BsEye, BsPencilSquare, BsTrash } from 'react-icons/bs';
import { Button  , Table} from 'react-bootstrap';

const DataList = () => {
  const [dataList, setDataList] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getJourFrier');
      setDataList(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deletejourfrier/${id}`);
      fetchData();
      console.log('Data deleted successfully!');
    } catch (error) {
      console.error('Error deleting data:', error);
    }
  };


  return (
    <div>
      <Table striped bordered hover responsive >
        <thead>
          <tr>
            <th>Designation</th>
            <th>Date Debut</th>
            <th>Date Fin</th>
            <th>Department</th>
            <th>Location</th>
            <th width="5px"className='col-lg-2'>Actions</th>
          </tr>
        </thead>
        <tbody>
          {dataList.map((data) => (
            <tr key={data._id}>
              <td>{data.designation}</td>
              <td>{data.startDate}</td>
              <td>{data.duration}</td>
              <td>{data.department}</td>
              <td>{data.departmentLocation}</td>
              <td width="5px"className='col-lg-2' >
                <Button variant="link">
                  <BsEye />
                </Button>
                <Button variant="link">
                  <BsPencilSquare />
                </Button>
                <Button variant="link" onClick={() => handleDelete(data._id)}>
                  <BsTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DataList;

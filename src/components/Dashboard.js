import React, { useState } from "react";
import {
  Table,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "../style/dashboard.css";

const Dashboard = () => {
  const [modal, setModal] = useState(false);

  const toggle = () => setModal(!modal);
  return (
    <Container className="dashboardDiv">
      <Row className="row">
        <Button className="button" color="primary" onClick={toggle}>
          Add Paste
        </Button>
      </Row>
      <Table striped className="table">
        <thead>
          <tr>
            <th>#</th>
            <th>Name/Title</th>
            <th>Added</th>
            <th>Expiry Time</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </Table>

      <Modal isOpen={modal} toggle={toggle} className="modalDiv">
        <ModalHeader toggle={toggle}>Add New Paste</ModalHeader>
        <Form>
          <ModalBody>
            <FormGroup>
              <Label>New Paste</Label>
              <Input type="textarea" name="text" />
            </FormGroup>

            <FormGroup>
              <Label>Paste Expiration</Label>
              <Input type="select" name="select">
                <option>Never</option>
                <option>10 Minutes</option>
                <option>1 Hour</option>
                <option>1 Day</option>
                <option>1 Week</option>
                <option>2 Weeks</option>
                <option>1 Month</option>
                <option>6 Months</option>
                <option>1 Year</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Paste Exposure</Label>
              <Input type="select" name="select">
                <option>Public</option>
                <option>Private</option>
              </Input>
            </FormGroup>
            <FormGroup>
              <Label>Paste Name/Title</Label>
              <Input
                type="text"
                name="name"
                placeholder="Enter Paste Name/Title"
              />
            </FormGroup>
          </ModalBody>
          <ModalFooter>
            <Button className="modal-button" color="primary" onClick={toggle}>
              Submit
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </Container>
  );
};

export default Dashboard;

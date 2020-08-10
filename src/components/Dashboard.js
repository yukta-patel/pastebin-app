import React, { useState, useEffect } from "react";
import {
  Table,
  Container,
  Row,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Label,
  Input,
} from "reactstrap";
import "../style/dashboard.css";
import { useForm, Controller } from "react-hook-form";
import { AddPaste, FetchPastes } from "../redux/actions/_action";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import moment from "moment";

const PasteSchema = Yup.object().shape({
  newPaste: Yup.string().required("New Paste is a required field"),
  pasteExpiration: Yup.string().required(
    "Paste Expiration is a required field"
  ),
  pasteExposure: Yup.string().required("Paste Exposure is a required field"),
  pasteTitle: Yup.string().required("Paste Title is a required field"),
});

const Dashboard = () => {
  const { control, handleSubmit, errors } = useForm({
    resolver: yupResolver(PasteSchema),
  });
  const dispatch = useDispatch();

  const { loading, pastes } = useSelector((state) => ({
    loading: state.LoginReducer.fetchPaste.loading,
    pastes: state.LoginReducer.fetchPaste.pastes,
  }));

  useEffect(() => {
    dispatch(FetchPastes());
  }, [dispatch]);

  const onSubmit = (data) => {
    console.log(data.newPaste);
    dispatch(
      AddPaste(
        data.newPaste,
        data.pasteExpiration,
        data.pasteExposure,
        data.pasteTitle
      )
    );
  };

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
            <th>Name/Title</th>
            <th>Added</th>
            <th>Expiry Time</th>
          </tr>
        </thead>

        {pastes !== null &&
          pastes
            .slice(0)
            .sort(
              (item, index) =>
                new Date(index.created_at) - new Date(item.created_at)
            )
            .map((paste) => (
              <tr key={paste.id}>
                <td>{paste.title}</td>
                <td>{moment(paste.created_at).format("MMMM Do, YYYY")}</td>
                <td>{paste.Expiration}</td>
              </tr>
            ))}
      </Table>

      <Modal isOpen={modal} toggle={toggle} className="modalDiv">
        <ModalHeader toggle={toggle}>Add New Paste</ModalHeader>

        <ModalBody>
          <Form onSubmit={handleSubmit(onSubmit)}>
            <FormGroup>
              <Label>New Paste</Label>
              <Controller
                as={Input}
                control={control}
                name="newPaste"
                type="textarea"
                placeholder="Enter New Paste"
                defaultValue=""
                className={errors && errors.newPaste ? "is-invalid" : ""}
              />
              {errors.newPaste && (
                <span className="errorMsg">{errors.newPaste.message}</span>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Paste Expiration</Label>
              <Controller
                as={Input}
                control={control}
                name="pasteExpiration"
                type="select"
                className={errors && errors.pasteExpiration ? "is-invalid" : ""}
              >
                <option>Select Paste Expiration</option>
                <option>aminute</option>
                <option>ahours</option>
              </Controller>
              {errors.pasteExpiration && (
                <span className="errorMsg">
                  {errors.pasteExpiration.message}
                </span>
              )}
            </FormGroup>

            <FormGroup>
              <Label>Paste Exposure</Label>
              <Controller
                as={Input}
                control={control}
                name="pasteExposure"
                type="select"
                className={errors && errors.pasteExposure ? "is-invalid" : ""}
              >
                <option>Select Paste Exposure</option>
                <option>public</option>
                <option>private</option>
                <option>unlisted</option>
              </Controller>
              {errors.pasteExposure && (
                <span className="errorMsg">{errors.pasteExposure.message}</span>
              )}
            </FormGroup>
            <FormGroup>
              <Label>Paste Name/Title</Label>
              <Controller
                as={Input}
                control={control}
                name="pasteTitle"
                type="text"
                placeholder="Enter Paste Name/Ttile"
                defaultValue=""
                className={errors && errors.pasteTitle ? "is-invalid" : ""}
              />
              {errors.pasteTitle && (
                <span className="errorMsg">{errors.pasteTitle.message}</span>
              )}
            </FormGroup>
            <Button className="button" color="primary">
              Submit
            </Button>
          </Form>
        </ModalBody>
      </Modal>
    </Container>
  );
};

export default Dashboard;

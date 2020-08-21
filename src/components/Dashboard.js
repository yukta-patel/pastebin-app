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
import {
  AddPaste,
  FetchPastes,
  DeletePaste,
  FetchSinglePaste,
  UpdatePaste,
} from "../redux/dashboard/_actions";
import { useDispatch, useSelector } from "react-redux";
import { yupResolver } from "@hookform/resolvers";
import * as Yup from "yup";
import moment from "moment";
import { Header } from "../components";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashAlt, faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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

  const { loading, pastes, loadingSinglePaste, singlePaste } = useSelector(
    (state) => ({
      loading: state.PasteReducer.getPastes.loading,
      pastes: state.PasteReducer.getPastes.pastes,
      loadingSinglePaste: state.PasteReducer.getSinglePaste.loading,
      singlePaste: state.PasteReducer.getSinglePaste.pastes,
    })
  );

  useEffect(() => {
    dispatch(FetchPastes());
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(
      AddPaste(
        data.newPaste,
        data.pasteExpiration,
        data.pasteExposure,
        data.pasteTitle,
        setModal
      )
    );
  };

  const onSubmitUpdate = (data) => {
    dispatch(
      UpdatePaste(
        data.newPaste,
        data.pasteExpiration,
        data.pasteExposure,
        data.pasteTitle,
        seteditModal,
        singlePaste.id
      )
    );
  };

  const [modal, setModal] = useState(false);
  const toggle = () => setModal(!modal);

  const [editModal, seteditModal] = useState(false);
  const editToggle = () => seteditModal(!editModal);

  return (
    <>
      <Header />
      <Container className="dashboardDiv">
        <Row className="row">
          <Button className="modal-button" color="primary" onClick={toggle}>
            Add Paste
          </Button>
        </Row>
        <Table striped className="table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Content</th>
              <th>Added</th>
              <th>Expiry Time</th>
              <th>Exposure</th>
              <th>Actions</th>
            </tr>
          </thead>
          {loading ? (
            <tr>
              <td colSpan={5}>Loading...</td>
            </tr>
          ) : (
            <>
              {pastes !== null &&
                pastes
                  .sort(
                    (a, b) => new Date(a.created_at) - new Date(b.created_at)
                  )
                  .reverse()
                  .map((paste) => (
                    <tr key={paste.id}>
                      <td>{paste.title}</td>
                      <td>{paste.content}</td>
                      <td>
                        {moment(paste.created_at).format("MMMM Do, YYYY")}
                      </td>
                      <td>{paste.Expiration}</td>
                      <td>{paste.Exposure}</td>
                      <td className="action-icon">
                        <FontAwesomeIcon
                          onClick={() => {
                            dispatch(FetchSinglePaste(paste.id));
                            editToggle();
                          }}
                          icon={faPencilAlt}
                        />
                        <FontAwesomeIcon
                          className="delete-icon"
                          icon={faTrashAlt}
                          onClick={() => dispatch(DeletePaste(paste.id))}
                        />
                      </td>
                    </tr>
                  ))}
            </>
          )}
        </Table>

        <Modal isOpen={modal} toggle={toggle} className="modalDiv">
          <ModalHeader toggle={toggle}>Add New Paste</ModalHeader>

          <ModalBody>
            <Form onSubmit={handleSubmit(onSubmit)}>
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
                  className={
                    errors && errors.pasteExpiration ? "is-invalid" : ""
                  }
                >
                  <option value="">Select Paste Expiration</option>
                  <option value="aminute">aminute</option>
                  <option value="ahours">ahours</option>
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
                  <option value="">Select Paste Exposure</option>
                  <option value="public">public</option>
                  <option value="private">private</option>
                  <option value="unlisted">unlisted</option>
                </Controller>
                {errors.pasteExposure && (
                  <span className="errorMsg">
                    {errors.pasteExposure.message}
                  </span>
                )}
              </FormGroup>

              <Button className="button float-left" color="primary">
                Submit
              </Button>
            </Form>
          </ModalBody>
        </Modal>

        <Modal isOpen={editModal} toggle={editToggle} className="modalDiv">
          <ModalHeader toggle={editToggle}>Edit Paste</ModalHeader>

          <ModalBody>
            {loadingSinglePaste ? (
              "loading..."
            ) : (
              <>
                {singlePaste !== null && (
                  <Form
                    onSubmit={handleSubmit(onSubmitUpdate)}
                    <FormGroup>
                      <Label>Paste Name/Title</Label>
                      <Controller
                        as={Input}
                        control={control}
                        name="pasteTitle"
                        type="text"
                        placeholder="Enter Paste Name/Ttile"
                        defaultValue={singlePaste.title}
                        className={
                          errors && errors.pasteTitle ? "is-invalid" : ""
                        }
                      />
                      {errors.pasteTitle && (
                        <span className="errorMsg">
                          {errors.pasteTitle.message}
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label>New Paste</Label>
                      <Controller
                        as={Input}
                        control={control}
                        name="newPaste"
                        type="textarea"
                        placeholder="Enter New Paste"
                        defaultValue={singlePaste.content}
                        className={
                          errors && errors.newPaste ? "is-invalid" : ""
                        }
                      />
                      {errors.newPaste && (
                        <span className="errorMsg">
                          {errors.newPaste.message}
                        </span>
                      )}
                    </FormGroup>
                    <FormGroup>
                      <Label>Paste Expiration</Label>
                      <Controller
                        as={Input}
                        control={control}
                        name="pasteExpiration"
                        type="select"
                        defaultValue={singlePaste.Expiration}
                        className={
                          errors && errors.pasteExpiration ? "is-invalid" : ""
                        }
                      >
                        <option value="">Select Paste Expiration</option>
                        <option value="aminute">aminute</option>
                        <option value="ahours">ahours</option>
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
                        defaultValue={singlePaste.Exposure}
                        className={
                          errors && errors.pasteExposure ? "is-invalid" : ""
                        }
                      >
                        <option value="">Select Paste Exposure</option>
                        <option value="public">public</option>
                        <option value="private">private</option>
                        <option value="unlisted">unlisted</option>
                      </Controller>
                      {errors.pasteExposure && (
                        <span className="errorMsg">
                          {errors.pasteExposure.message}
                        </span>
                      )}
                    </FormGroup>

                    <Button className="button float-left" color="primary">
                      Submit
                    </Button>
                  </Form>
                )}
              </>
            )}
          </ModalBody>
        </Modal>
      </Container>
    </>
  );
};

export default Dashboard;

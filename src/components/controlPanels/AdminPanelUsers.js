import axios from "axios";
import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import Form from "react-bootstrap/Form";
import { MdDeleteOutline } from "react-icons/md";
import Button from "react-bootstrap/Button";
import Table from "react-bootstrap/Table";
import { Spinner } from "react-bootstrap";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { FormattedMessage } from "react-intl";

const PanelUsers = () => {
  const [users, setUsers] = useState(null);
  const [showToast, setShowToast] = useState(null);
  const [message, setMessage] = useState(null);

  const handleRoleChange = (user, event) => {
    const roleId = event.target.getAttribute("name");
    if (event.target.checked) {
      axios({
        url:
          "https://localhost:8443/api/v1/admin/setRole/" +
          roleId +
          "/toUser/" +
          user.id,
        method: "put",
        headers: {
          Authorization: "Bearer_" + Cookies.get("_auth"),
        },
      })
        .then((response) => {
          setMessage("Role has been set to user '" + user.username);
          setShowToast(true);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      axios({
        url:
          "https://localhost:8443/api/v1/admin/unsetRole/" +
          roleId +
          "/fromUser/" +
          user.id,
        method: "put",
        headers: {
          Authorization: "Bearer_" + Cookies.get("_auth"),
        },
      })
        .then((response) => {
          setMessage("Role has been unset from user '" + user.username);
          setShowToast(true);
          console.log(response.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleDeleteClick = (userId) => {
    axios({
      url: "https://localhost:8443/api/v1/admin/deleteUser/" + userId,
      method: "delete",
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        console.log(response.data);
        const newUsers = [...users];
        const index = users.findIndex((user) => user.id === userId);
        setMessage(
          "User " +
            users[index].id +
            " " +
            users[index].username +
            " has been deleted"
        );
        newUsers.splice(index, 1);
        setUsers(newUsers);
        setShowToast(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios({
      url: "https://localhost:8443/api/v1/admin/users",
      method: "get",
      headers: {
        Authorization: "Bearer_" + Cookies.get("_auth"),
      },
    })
      .then((response) => {
        setUsers(response.data);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <ToastContainer className="p-3" position="bottom-end">
        <Toast
          onClose={() => setShowToast(false)}
          show={showToast}
          delay={3000}
          autohide
        >
          <Toast.Header>
            <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            />
            <strong className="me-auto">Shuttler</strong>
            <small>Action result</small>
          </Toast.Header>
          <Toast.Body>{message}</Toast.Body>
        </Toast>
      </ToastContainer>
      <div className="organizer-header">
        <h3 style={{ color: "white" }}>
          <FormattedMessage id="users" />
        </h3>
      </div>
      {users !== null ? (
        <form style={{ margin: "0px 14% 150px 14%" }}>
          <Table striped bordered hover variant="light">
            <thead>
              <tr>
                <th>Id</th>
                <th>
                  <FormattedMessage id="username" />
                </th>
                <th>
                  <FormattedMessage id="firstname" />
                </th>
                <th>
                  <FormattedMessage id="lastname" />
                </th>
                <th>
                  <FormattedMessage id="subscribed" />
                </th>
                <th>
                  <FormattedMessage id="roles" />
                </th>
                <th>
                  <FormattedMessage id="actions" />
                </th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => {
                return (
                  <tr style={{ verticalAlign: "middle" }}>
                    <td>{user.id}</td>
                    <td>{user.username}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.subscriptions.length === 0 ? "No" : "Yes"}</td>
                    <td>
                      {user.roles.findIndex(
                        (role) => role.name === "ROLE_ADMIN"
                      ) === -1 ? (
                        <Form.Check
                          name="2"
                          type="switch"
                          id="custom-switch"
                          label="Admin"
                          onChange={(e) => handleRoleChange(user, e)}
                        />
                      ) : (
                        <Form.Check
                          name="2"
                          type="switch"
                          id="custom-switch"
                          defaultChecked
                          label="Admin"
                          onChange={(e) => handleRoleChange(user, e)}
                        />
                      )}
                      {user.roles.findIndex(
                        (role) => role.name === "ROLE_ORGANIZER"
                      ) === -1 ? (
                        <Form.Check
                          name="3"
                          type="switch"
                          id="custom-switch"
                          label="Organizer"
                          onChange={(e) => handleRoleChange(user, e)}
                        />
                      ) : (
                        <Form.Check
                          name="3"
                          type="switch"
                          id="custom-switch"
                          defaultChecked
                          label="Organizer"
                          onChange={(e) => handleRoleChange(user, e)}
                        />
                      )}
                      {user.roles.findIndex(
                        (role) => role.name === "ROLE_CONTROLLER"
                      ) === -1 ? (
                        <Form.Check
                          name="4"
                          type="switch"
                          id="custom-switch"
                          label="Controller"
                          onChange={(e) => handleRoleChange(user, e)}
                        />
                      ) : (
                        <Form.Check
                          name="4"
                          type="switch"
                          id="custom-switch"
                          defaultChecked
                          label="Controller"
                          onChange={(e) => handleRoleChange(user, e)}
                        />
                      )}
                    </td>
                    <td>
                      <Button
                        type="button"
                        onClick={() => handleDeleteClick(user.id)}
                        variant="secondary"
                        style={{ backgroundColor: "red" }}
                      >
                        <MdDeleteOutline />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </form>
      ) : (
        <Spinner style={{ color: "white" }} />
      )}
    </>
  );
};

export default PanelUsers;

import { Table, Form } from "react-bootstrap";
import axios from "axios";
import { useState, useEffect } from "react";
import Toggle from 'react-toggle';
import 'react-toggle/style.css';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCheck, FaTimes } from 'react-icons/fa';


const PageTable = () => {
  const [pages, setPages] = useState([]);
const [roles, setRoles] = useState([]);
const [options, setoptions] = useState([]);

useEffect(() => {
  axios.get("http://localhost:5000/sidebar").then((response) => {
    setPages(response.data);
  });
}, []);

const handlePermissionUpdate = async (pageId, permission, role, title) => {
  try {
    toast.dismiss(); // Dismiss any existing toast

    const result = await new Promise((resolve, reject) => {
      const confirmToast = toast.info(
        <div className="confirm-toast">
          <p>vous étes sure  {permission ? 'd"ajouter' : 'de supprimer'} "{role}" pour "{title}"?</p>
          <div className="confirm-buttons">
            <button className="btn btn-primary" onClick={() => resolve(true)}><FaCheck />Yes</button> &nbsp;
            <button className="btn btn-danger" onClick={() => resolve(false)}><FaTimes />No</button>
          </div>
        </div>,
        {
          autoClose: false,
          closeButton: false,
        }
      );
    });

    if (!result) return;

    const response = await axios.put(
      `http://localhost:5000/pages/${pageId}`,
      { permission }
    );

    const updatedPage = response.data;
    setPages(
      pages.map((page) => (page._id === updatedPage._id ? updatedPage : page))
    );

    toast.success(
      <div className="success-toast">
        <p>Permission {permission ? 'ajoutée' : 'supprimée'} avec Succeés  "{title}" pour "{role}".</p>
      </div>
    );
  } catch (error) {
    console.error(error);
    toast.error(
      <div className="error-toast">
        <FaTimes />
        <p>Failed to update permission.</p>
      </div>
    );
  }
};

const handleOptionPermissionUpdate = async (pageId, value, permission, title) => {
  try {
    toast.dismiss(); // Dismiss any existing toast

    const result = await new Promise((resolve, reject) => {
      const confirmToast = toast.info(
        <div className="confirm-toast">
          <p>vous étes sure {permission ? 'd"ajouter' : 'de supprimer'}  "{title}" pour cette role ?</p>
          <div className="confirm-buttons">
            <button className="btn btn-primary" onClick={() => resolve(true)}> 
              <FaCheck className="toast-icon" />
              Yes
            </button>
            &nbsp;
            <button className="btn btn-danger" onClick={() => resolve(false)}>
              <FaTimes className="toast-icon" />
              No
            </button>
          </div>
        </div>,
        {
          autoClose: false,
          closeButton: false,
        }
      );
    });

    if (!result) return;

    const response = await axios.put(
      `http://localhost:5000/pages/${pageId}/options/${value}`,
      { permission }
    );
    const updatedOption = response.data.sidebarItem.dropdownOptions.find(option => option.value === value);
    const updatedPage = { ...response.data, permission: permission };

    // Check if there is a change in the dropdown options permission
    const pagesCopy = [...pages];
    const pageIdx = pagesCopy.findIndex((page) => page._id === pageId);
    if (pageIdx >= 0) {
      const dropdownOptionsCopy = [...pagesCopy[pageIdx].dropdownOptions];
      const optionIdx = dropdownOptionsCopy.findIndex((option) => option.value === value);
      if (optionIdx >= 0) {
        dropdownOptionsCopy[optionIdx] = updatedOption;
        const newPermission = dropdownOptionsCopy.some((option) => option.permission);
        const newPagePermission = newPermission || dropdownOptionsCopy.length;
        pagesCopy[pageIdx] = { ...pagesCopy[pageIdx], dropdownOptions: dropdownOptionsCopy, permission: newPagePermission };
        setPages(pagesCopy);
      }
    }

    toast.success(
      <div className="success-toast">
        <p>Permission {permission ? 'ajoutée' : 'supprimée'} avec Succeés , {title}.</p>
      </div>
    );
  } catch (error) {
    console.error(error);
    toast.error(
      <div className="error-toast">
        <FaTimes className="toast-icon" />
        <p>Failed to update permission.</p>
      </div>
    );
  }
};


  
  
  const [selectedRole, setSelectedRole] = useState(null);

  const handleToggle = (roleId) => {
    setSelectedRole(selectedRole === roleId ? null : roleId);
  };
  
  const getTableRows = () => {
    const groupedPages = pages.reduce((acc, page) => {
      const title = page.title;
      if (!acc[title]) {
        acc[title] = {
          title,
          path: page.path,
          roles: [],
        };
      }
      acc[title].roles.push({
        role: page.role,
        permission: page.permission,
        id: page._id,
        dropdownOptions: page.dropdownOptions,
        dropdown: page.dropdown, // Add the dropdown field to the roles
      });
      return acc;
    }, {});
  
    const rows = Object.values(groupedPages).map((group) => {
      const { title, path, roles } = group;
      return (
        <tr key={title}>
          <td>{title}</td>
  
          <td>
            <Table   bordered >
              <tbody>
                {roles.map((role) => (
                  <tr key={role.id}>
                    <td>{role.role}</td>
                    <td className="text-end">
                      <Form.Check
                        className="me-5"
                        type="checkbox"
                        label={role.permission ? 'Annuler' : 'Ajouter'}
                        checked={role.permission}
                        onChange={() =>
                          handlePermissionUpdate(
                            role.id,
                            !role.permission,
                            title,
                            role.role
                          )
                        }
                      />
                    </td>
                    {role.dropdown && role.dropdownOptions && ( // Display toggle if dropdown is true
                      <td className="text-end">
                        <div className="float-end">
                          <Toggle
                            className="me-5"
                            checked={selectedRole === role.id}
                            icons={false}
                            onChange={() => handleToggle(role.id)}
                          />
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </Table>
          </td>
          <td>
            {roles.map((role) => (
              <div key={role.id}>
                {role.dropdown && selectedRole === role.id && ( // Display options if dropdown is true and role is selected
                  <table>
                    <tbody>
                      {role.dropdownOptions.map((option) => (
                        <tr key={option._id}>
                          <td>{option.label}</td>
                          <td>
                            <Form.Check
                              type="checkbox"
                              label={option.permission ? 'Annuler' : 'Ajouter'}
                              checked={option.permission}
                              onChange={() =>
                                handleOptionPermissionUpdate(
                                  role.id,
                                  option.value,
                                  !option.permission,
                                  title
                                )
                              }
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            ))}
          </td>
        </tr>
      );
    });
  
    return rows;
  };
  
  return (
    <div className="container py-6 px-5"> <ToastContainer />
        <h1 style={{ "fontFamily":"'Gill Sans', 'Gill Sans MT', 'Calibri', 'Trebuchet MS', sans-serif"}} className="display-6 text-center mb-4">Gestion des Accés</h1>
                <hr className="w-25 mx-auto"/>
    <Table  bordered hover>
      <thead>
        <tr>
          <th>Title</th>
  
          <th>Role et Permission</th>
          <th>liste des option  et  Permission</th>
        </tr>
      </thead>
      <tbody>{getTableRows()}</tbody>
    </Table>
    </div> );
};
export default PageTable;
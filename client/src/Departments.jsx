import { useEffect,useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { fetchDepartments } from "./redux/departmentsSlice";
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import NavBar from "./NavBar";


function Departments() {
    const dispatch = useDispatch();
    const departments = useSelector((state) => state.departments.list );

    const loading = useSelector((state) => state.departments.loading);
    const error = useSelector((state) => state.departments.error);

    const [deptname,setDeptName] = useState('');

    const [editId,setEditId] = useState(null);
    const [showForm,setShowForm] = useState(false);
    const [formError,setFormError] = useState('');

    const token = localStorage.getItem('token');
    let role = null;
    try {
        if (token) {
            role = jwtDecode(token).role;
        }
    } catch {
        role = null;
    }
    const isAdmin = role === 'admin';



    useEffect(() => {
        dispatch(fetchDepartments());
    }, [dispatch]);

    function handleEdit(dept) {
        setDeptName(dept.dept_name);
        setEditId(dept.dept_id);
        setShowForm(true);
    }

    function handleCancel() {
        setDeptName('');
        setEditId(null); setShowForm(false); 
    }
    
    async function handleDelete(id) {
        const token = localStorage.getItem('token');
        try {
            await axios.delete('http://localhost:4000/department/' + id, {
                headers: { Authorization: 'Bearer ' + token}
            });
            dispatch(fetchDepartments());
        } catch {
            setFormError('Cannot delete a department that has employees.');
        }
    }

    async function handleSubmit() {
        if (!deptname) {
            setFormError('Department name is required');
            return;
        }
        setFormError('');

        const token = localStorage.getItem('token');
        const data = {
            dept_name: deptname
        };

        if(editId) {
            await axios.put('http://localhost:4000/department/' + editId, data, {
                headers: { Authorization: 'Bearer ' + token}
                });
        } else {
            await axios.post('http://localhost:4000/department', data , {
                headers: {Authorization: 'Bearer ' + token}
            });
        }

        setDeptName(''); setEditId(null);  setShowForm(false);

        dispatch(fetchDepartments());
    }

    return(
        <div>
            <NavBar />
                <div className="page">
                    <h2>Departments</h2>
                
                    { isAdmin && <button onClick={() => setShowForm(true)}>Add Department</button> }

                    {showForm && (
                        <div>
                            <h3>{editId ? 'Edit Department' : 'Add Department' }</h3>
                            <input placeholder="Name" value={deptname} onChange={(e) => setDeptName(e.target.value)} />

                            <button onClick={handleSubmit}>{editId ? 'Update Department' : 'Add Department'}</button>
                            <button onClick={handleCancel}>Cancel</button>
                        </div>
                    )}

                    {loading && <p>loading ....</p>}
                    {error && <p style={{ color: 'red' }}>Error: {error}</p>}
                    {formError && <p style={{ color: 'red'}}>{formError}</p>}

                    <div className="table-wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    { isAdmin && <th>Action</th> }
                                </tr>
                            </thead>
                            <tbody>
                                {departments.map((dept) => (
                                    <tr key={dept.dept_id}>
                                        <td>{dept.dept_id}</td>
                                        <td>{dept.dept_name}</td>

                                        {isAdmin && (
                                            <td>
                                                <button onClick={() => handleEdit(dept)}>Edit</button>
                                                <button onClick={() => handleDelete(dept.dept_id)}>Delete</button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    );
}

export default Departments;
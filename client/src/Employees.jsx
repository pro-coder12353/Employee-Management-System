import { useEffect,useState } from "react";
import { useSelector,useDispatch } from 'react-redux';
import { fetchEmployees } from "./redux/employeesSlice";
import { fetchDepartments } from "./redux/departmentsSlice";
import { jwtDecode } from "jwt-decode";

import axios from "axios";
import NavBar from "./NavBar";


function Employees() {
    const dispatch = useDispatch();
    const employees = useSelector((state) => state.employees.list );
    const departments = useSelector((state) => state.departments.list);
    
    const loading = useSelector((state) => state.employees.loading);
    const error = useSelector((state) => state.employees.error);

    
    const [formError,setFormError] = useState('');
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('');
    const [page, setPage] = useState(1);
    const LIMIT = 3;
    

    const [empname,setEmpName] = useState('');
    const [deptid,setDeptId] = useState('');
    const [phone, setPhone] = useState('');
    const [email,setEmail] = useState('');
    const [salary,setSalary] = useState('');
    const [hiredate,setHireDate] = useState('');
    const [location,setLocation] = useState('');

    const [editId,setEditId] = useState(null);

    const [showForm,setShowForm] = useState(false);

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
        dispatch(fetchEmployees({ search, sort, page, limit: LIMIT }));
        dispatch(fetchDepartments());
            // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [dispatch, page]);

    function handleEdit(emp) {
        setEmpName(emp.emp_name);
        setDeptId(emp.dept_id);
        setPhone(emp.phone_number);
        setEmail(emp.email_id);
        setSalary(emp.salary);
        setHireDate(emp.hire_date ? emp.hire_date.split('T')[0] : '');
        setLocation(emp.location);
        setEditId(emp.emp_id);
        setShowForm(true);

    }

    function handleCancel() {
        setEmpName(''); setDeptId(''); setPhone(''); 
        setEmail(''); setSalary(''); setHireDate(''); 
        setLocation(''); setEditId(null); setShowForm(false);
    }

    async function handleDelete(id) {
        const token=localStorage.getItem('token');
        await axios.delete('http://localhost:4000/employee/' + id, {
            headers: { Authorization: 'Bearer ' + token }
        });
        dispatch(fetchEmployees());
    }

    async function handleSubmit() {
        if (!empname|| !email || !deptid) {
            setFormError('Name, Email, and Department are required');
            return;
        }
        setFormError('');

        const token = localStorage.getItem('token');
        const data = {
            emp_name: empname,
            dept_id: deptid,
            phone_number: phone,
            email_id: email,
            salary: salary,
            hire_date: hiredate,
            location: location
        };

        if(editId) {
            await axios.put('http://localhost:4000/employee/' + editId , data, {
                headers : {Authorization: 'Bearer ' + token }
            });
        } else {
            await axios.post('http://localhost:4000/employee', data , {
                headers : {Authorization: 'Bearer ' + token }
            });
        }
        //to reset the form after editing or adding
        setEmpName(''); setDeptId(''); setPhone(''); 
        setEmail(''); setSalary(''); setHireDate(''); 
        setLocation(''); setEditId(null); setShowForm(false);

        dispatch(fetchEmployees());
    }

    async function handleUpload(id, file) {
        const token = localStorage.getItem('token');
        const formData = new FormData();
        formData.append('picture',file);
        await axios.put('http://localhost:4000/employee/' + id + '/picture', formData, {
            headers: {Authorization: 'Bearer ' + token}
        });
        dispatch(fetchEmployees({ search, sort, page, limit:LIMIT }));
    }

    return(
        <div>
            <NavBar />
                <div className="page">
                    <h2>Employees</h2>
                    <div className="controls">
                        <div className="controls-left">
                            {isAdmin && <button onClick={() => setShowForm(true)}>Add Employee</button> }

                            <input placeholder="Search by Name" value={search} onChange={(e) => setSearch(e.target.value)} />
                            <button onClick={() => dispatch(fetchEmployees({search}))}>Search</button>
                            
                            <select value={sort} onChange={(e) => {setSort(e.target.value); dispatch(fetchEmployees({ search, sort: e.target.value })); }}>
                                <option value="">Sort by...</option>
                                <option value="emp_name">Name</option>
                                <option value="salary">Salary</option>
                                <option value="hire_date">Hire Date</option>
                                </select>

                            <button onClick={() => { setSearch('') ; dispatch(fetchEmployees({})); }}>Clear</button>
                        </div>

                        <div className="controls-right">
                            <button onClick={() => setPage (page - 1)} disabled={page == 1}>Previous</button>
                            <span>Page {page}</span>
                            <button onClick={() => setPage (page + 1)} disabled={employees.length < LIMIT}>Next</button>
                        </div>
                    </div>

                    {showForm && ( 
                    <div>
                        <h3>{editId ?  'Edit Employee' : 'Add Employee' }</h3>
                        <input placeholder="Name" value={empname} onChange={(e) => setEmpName(e.target.value)} />

                        <select value={deptid} onChange={(e) => setDeptId(e.target.value)}>
                            <option value="">Select Department</option>
                            { departments.map((dept) => (
                                <option key={dept.dept_id} value={dept.dept_id}>{dept.dept_name}</option>
                            ))}
                        </select>

                        <input placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                        <input placeholder="Email Id" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <input placeholder="salary" value={salary} onChange={(e) => setSalary(e.target.value)} />
                        <input type="date" placeholder="hire date" value={hiredate} onChange={(e) => setHireDate(e.target.value)} />
                        <input placeholder="Work location" value={location} onChange={(e) => setLocation(e.target.value)} />

                        <button onClick={handleSubmit}>{editId ? 'Update Employee' : 'Add Employee'}</button>
                        <button onClick={handleCancel}>Cancel</button>
                    </div>
                    )}

                    {loading && <p>loading ....</p>}
                    {error && <p style={{ color: 'red' }}> Error: {error} </p>}
                    {formError && <p style={{ color: 'red'}}>{formError}</p>}
                
                    <div className="table_wrapper">
                        <table className="data-table">
                            <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Department</th>
                                    <th>Email</th>
                                    <th>Phone Number</th>
                                    <th>Salary</th>
                                    <th>Hire_Date</th>
                                    <th>Work Location</th>
                                    <th>Status</th>
                                    <th>Photo</th>
                                    { isAdmin && <th>Action</th> }               
                                </tr>
                            </thead>
                            <tbody>
                                {employees.map((emp) => (
                                    <tr key={emp.emp_id}>
                                        <td>{emp.emp_name}</td>
                                        <td>{departments.find((d) => d.dept_id === emp.dept_id)?.dept_name}</td>
                                        <td>{emp.email_id}</td>
                                        <td>{emp.phone_number}</td>
                                        <td>{emp.salary}</td>
                                        <td>{emp.hire_date ? emp.hire_date.split('T')[0] : ''}</td>
                                        <td>{emp.location}</td>
                                        <td>
                                            <span style={{
                                                color: 'white',
                                                backgroundColor: emp.is_active ? 'green' : 'red',
                                                padding: '2px 8px',
                                                borderRadius: '4px'
                                            }}>
                                            {emp.is_active ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td>
                                            {emp.profile_picture
                                            ? <a href={'http://localhost:4000/uploads/' + emp.profile_picture} target="_blank" rel="noreferrer"> 
                                            <img src={'http://localhost:4000/uploads/' + emp.profile_picture} width ="50" alt=""/>
                                            </a>
                                            : 'No photo'}
                                            {isAdmin && <input type="file" onChange={(e) => handleUpload(emp.emp_id, e.target.files[0])}/> }
                                        </td>
                                        
                                        {isAdmin && (
                                            <td>
                                                <button onClick={() => handleEdit(emp)}>Edit</button>
                                                <button onClick={() => handleDelete(emp.emp_id)}>Delete</button>
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


export default Employees;
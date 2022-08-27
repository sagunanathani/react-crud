import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {edit, add, remove} from "../Redux/Action/action";

let initialUserData = {
    username: "",
    roll: "",
    email: "",
    birthday: "",
    gender: "",
    hobby: [],
    branch: ""
};

const Registration = () => {
    const dispatch = useDispatch();
    const [tableData, setTableData] = useState([]);
    const [UserData, setUserData] = useState(initialUserData);
    const [Edit, setEdit] = useState(false);
    const [indexValue, setIndexValue] = useState("");
    const [order, setOrder] = useState("ASC");
    const [searchItem, setSearchItem] = useState("");

    useEffect(() => {
        let array = JSON.parse(localStorage.getItem('listsItems'));
        setTableData(array);
    }, []);

    function handleAddTask() {
        if (indexValue !== "") {
            // console.log("Here in if due to index");
            let array = tableData;
            array.splice(indexValue, 1, UserData);
            // console.log("-----------------------",array);
            setTableData([...array]);
            localStorage.setItem('listsItems', JSON.stringify(array));
            setIndexValue("");
            setEdit(false);
            resetData();
        } else {
            let array = JSON.parse(localStorage.getItem('listsItems')) || [];
            array.push(UserData);
            setTableData(array);
            localStorage.setItem('listsItems', JSON.stringify(array));
            dispatch(add(UserData));
            setUserData((preState) => ({...preState, ...initialUserData}));
            resetData();
        }
    }

    const removeHandler = (id) => {
        let tempArray = tableData;
        tempArray.splice(id, 1);
        setTableData(() => ([...tempArray]));
        console.log("UserData", tempArray);
        // alert("do you want to delete this filed");
        dispatch(remove(tempArray));
        localStorage.setItem('listsItems', JSON.stringify(tempArray));
    };

    const resetData = () => {
        setUserData(
            {
                username: "",
                roll: "",
                email: "",
                birthday: "",
                gender: "",
                hobby: [],
                branch: ""
            }
        );

        document.getElementsByName('gender').forEach((item) => {
            // console.log('++++++++++++++', document.getElementById(item.id));
            // console.log("id ---- ",item.id);
            document.getElementById(item.id).checked = false;
        });

        document.getElementsByName('hobby').forEach((item) => {
            // console.log('++++++++++++++', document.getElementById(item.id));
            // console.log("id ---- ",item.id);
            document.getElementById(item.id).checked = false;
        });
    };

    const editHandler = (index) => {
        setEdit(true);
        setIndexValue(index);
        let editData = JSON.parse(localStorage.getItem('listsItems'));
        console.log("UserData----------", tableData[index]);
        // console.log("editData[index] - - - -",editData[index]);
        dispatch(edit(tableData[index]));

        setUserData({
            username: editData[index].username,
            roll: editData[index].roll,
            email: editData[index].email,
            birthday: editData[index].birthday,
            gender: editData[index].gender,
            hobby: editData[index].hobby,
            branch: editData[index].branch
        }, []);
    };

    const dataChange = (e) => {
        const {name, value} = e.target;
        setUserData({
            ...UserData,
            [name]: value
        });
    };

    const handelHobbyValue = (e) => {
        let value = UserData.hobby || [];
        if (e.target.checked) {
            value.push(e.target.value);
        } else {
            value = UserData.hobby.filter((item) => item !== e.target.value);
        }
        setUserData((preState) => ({
            ...preState,
            hobby: value,
        }))
    };

    // Sorting
    const Sorting = (col) => {
        if (order === "ASC") {
            const sorted = [...tableData].sort((a, b) =>
                a[col].toLowerCase() > b[col].toLowerCase() ? 1 : -1
            );
            setTableData(sorted);
            setOrder("DSC");
        }
        if (order === "DSC") {
            const sorted = [...tableData].sort((a, b) =>
                a[col].toLowerCase() < b[col].toLowerCase() ? 1 : -1
            );
            setTableData(sorted);
            setOrder("ASC");
        }
    };
    return (
        <>
            <section className="vh-100 gradient-custom mb-5">
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-lg-9 col-xl-8">
                            <div className="card shadow-2-strong card-registration">
                                <div className="card-body p-4 p-md-5">
                                    <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Registration Form</h3>

                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">

                                            <div className="form-outline">
                                                <label htmlFor="exampleInputEmail1">UserName</label>
                                                <input type="text" className="form-control"
                                                       name="username" placeholder="Enter Your username"
                                                       onChange={dataChange}
                                                       value={UserData.username}></input>
                                            </div>

                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">

                                            <div className="form-outline">
                                                <label htmlFor="exampleInputEmail1"> RollNumber: </label>
                                                <input type="number" className="form-control"
                                                       name="roll" placeholder="Enter Your rollnum"
                                                       onChange={dataChange}
                                                       value={UserData.roll}></input>
                                            </div>

                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <label htmlFor="exampleInputEmail1"> Email: </label>
                                                <input type="text" className="form-control"
                                                       name="email" placeholder="Enter Your Email" onChange={dataChange}
                                                       value={UserData.email}></input>
                                            </div>
                                        </div>
                                        <div className="col-md-6 mb-4 pb-2">
                                            <div className="form-outline">
                                                <label htmlFor="exampleInputEmail1"> Birthday: </label>
                                                <input type="date" className="form-control" name="birthday"
                                                       placeholder="Enter Your Birthday"
                                                       onChange={dataChange}
                                                       value={UserData.birthday}/>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-6 mb-4">

                                            <h6> Hobby: </h6>

                                            <div className="form-check form-check-inline">
                                                <label htmlFor="reading" className="checkbox"><input type="checkbox"
                                                                                                     name="hobby"
                                                                                                     value="reading"
                                                                                                     onChange={handelHobbyValue}
                                                                                                     checked={UserData && UserData?.hobby?.filter((e) => (e === "reading"))[0] === 'reading' ? true : false}
                                                                                                     id='reading'
                                                /> Reading
                                                </label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <label htmlFor="writing" className="checkbox"><input type="checkbox"
                                                                                                     name="hobby"
                                                                                                     value="writing"
                                                                                                     onChange={handelHobbyValue}
                                                                                                     checked={UserData && UserData?.hobby?.filter((e) => (e === "writing"))[0] === 'writing' ? true : false}
                                                                                                     id='writing'
                                                /> Writing
                                                </label>
                                            </div>

                                            <div className="form-check form-check-inline">
                                                <label htmlFor="dancing" className="checkbox"><input type="checkbox"
                                                                                                     name="hobby"
                                                                                                     value="dancing"
                                                                                                     onChange={handelHobbyValue}
                                                                                                     checked={UserData && UserData.hobby.filter((e) => (e === "dancing"))[0] === 'dancing' ? true : false}
                                                                                                     id='dancing'
                                                /> Dancing
                                                </label>
                                            </div>

                                        </div>

                                        <div className="col-md-6 mb-4">
                                            <h6>Gender: </h6>
                                            <div className="form-check form-check-inline">
                                                <label htmlFor="male" className="radio">
                                                    <input className="form-check-input" type="radio"
                                                           name="gender" onChange={dataChange}
                                                           checked={UserData.gender === 'male' ? true : false}
                                                           id='male'
                                                           value="male"/>
                                                    Male </label>
                                            </div>
                                            <div className="form-check form-check-inline">
                                                <label htmlFor="female" className="radio">
                                                    <input className="form-check-input" type="radio"
                                                           name="gender" onChange={dataChange}
                                                           checked={UserData.gender === 'female' ? true : false}
                                                           id='female'
                                                           value="female"/>
                                                    Female
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="field mt-3">
                                        <label> Branch: </label>
                                        <select name="branch" value={UserData.branch} onChange={dataChange}
                                                className="form-select">
                                            <option selected="">--select branch--</option>
                                            <option value={"computer"}>computer</option>
                                            <option value={"Commerce"}>Commerce</option>
                                            <option value={"Science"}>Science</option>
                                        </select>
                                    </div>

                                    <div className="d-flex </div>justify-content-center pt-3 m-2">
                                        <button onClick={handleAddTask}
                                                className={`${Edit ? "btn btn-primary" : "btn btn-success"}`}>{Edit ? "Update" : "Submit"}</button>
                                        <button onClick={resetData} className="btn btn-danger ms-2"> Reset
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/*<hr/>*/}
                        {/*search items*/}
                        <div className="app row">
                            <div className="col-3">
                                <input
                                    type="text"
                                    placeholder="Search items....."
                                    className="form-control "
                                    onChange={(e) => setSearchItem(e.target.value)}
                                />
                            </div>
                        </div>
                        <br/>
                        <br/>
                        <hr/>
                        <div className="table container container-fluid text-center">
                            <table class="table table-hover">
                                <tr>
                                    <th> No</th>
                                    <th onClick={() => Sorting("username")}>Username</th>
                                    <th onClick={() => Sorting("roll")}> RollNumber</th>
                                    <th onClick={() => Sorting("email")}> Email</th>
                                    <th onClick={() => Sorting("birthday")}> Birthday</th>
                                    <th onClick={() => Sorting("gender")}>Gender</th>
                                    <th onClick={() => Sorting("hobby")}> Hobby</th>
                                    <th onClick={() => Sorting("branch")}> branch</th>
                                    <th> Action</th>
                                </tr>
                                {/*filter item*/}
                                {tableData?.filter((val) => {
                                    if (searchItem === "") {
                                        return val;
                                    } else if (
                                        val.username.toLowerCase().includes(searchItem.toLowerCase()) ||
                                        val.roll.toLowerCase().includes(searchItem.toLowerCase()) ||
                                        val.email.toLowerCase().includes(searchItem.toLowerCase())
                                    ) {
                                        return val;
                                    }
                                }).map((item, index, id) =>
                                    <tr>
                                        <td> {index + 1} </td>
                                        <td>{item.username}</td>
                                        <td>{item.roll}</td>
                                        <td>{item.email}</td>
                                        <td>{item.birthday}</td>
                                        <td>{item.gender}</td>
                                        <td>{item.hobby}</td>
                                        <td>{item.branch}</td>
                                        <td>
                                            <div className="d-flex justify-content-center pt-3 m-2">
                                                <button className="btn btn-outline-success"
                                                        onClick={() => editHandler(index)}> Edit
                                                </button>
                                                <button className="btn btn-outline-danger ms-1"
                                                        onClick={() => removeHandler(index)}> Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                )}
                            </table>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};
export default Registration;











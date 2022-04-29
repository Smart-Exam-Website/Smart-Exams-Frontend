import React, { useState } from 'react';
import CardComponent from '../../../../Components/CardComponent/CardComponent';
import { TextField } from '@mui/material';
import AddationMethodsMenu from '../../../../Components/QuestionComponents/AddationMethodsMenu';
import { PlusCircleOutlined } from '@ant-design/icons'

import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { useLocation } from 'react-router-dom/cjs/react-router-dom.min'
import { addNewGroup } from '../../../../redux/actions/ExamAction';
const AddQuestionGroup = () => {
    const history = useHistory()
    const location = useLocation()
    const dispatch = useDispatch()

    const [groupName, setGroupName] = useState('');
    const [groupNameCreated, setGroupNameCreated] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);




    const AddQuestionHandler = (event) => {
        setAnchorEl(event.currentTarget)
    }

    const submitGroupHandler = () => {

        console.log(groupName);

        return
    }


    const createGroupHandler = () => {

        setGroupNameCreated(true)
        let group = {
            groupName: groupName,
            // examId: location?.state?.examId,
            questions: []
        }
        dispatch(addNewGroup(group))
        return
    }



    const goCreateNewQuestion = () => 
    {
        history.push('/questions/add', { fromExamCreation: false, isFromGroup: true, groupName: groupName })
    }
    const selectQuestionFromQBank = () => 
    {
        history.push('/questions', { canSelectQuestionsForExam: false, isFromGroup: true, groupName: groupName })
    }






    const methods = [
        {
            displayName: 'Create a new question',
            function: goCreateNewQuestion
        }
        ,
        {
            displayName: 'Select from question bank',
            function: selectQuestionFromQBank
        }
    ]

    let askForGroupName = () => {

        return (
            <div className="row justify-content-center text-center my-5">

                <div className="col-md-8 col-12">
                    <CardComponent title="New Group">

                        <div className=' m-5 '>
                            <TextField
                                fullWidth id="outlined-basic"
                                onChange={(e) => setGroupName(e.target.value)}
                                required
                                label="Group Name" variant="outlined"
                            />

                        </div>

                        <div className='m-5'>
                            <button onClick={createGroupHandler} className="btn btn-primary mx-auto mt-4">Create</button>
                        </div>
                    </CardComponent>
                </div>
            </div>
        );
    }

    let mainContent = () => {

        // Main Component
        return (
            <div className="row justify-content-center text-center my-5">

                <div className="col-md-8 col-12">
                    <CardComponent title={groupName}>

                        <div className='d-flex justify-content-end m-5'>
                            <button onClick={AddQuestionHandler} className='btn btn-success'>
                                <PlusCircleOutlined className='primaryColoredIcon' style={{ color: '#fff' }} />
                            </button>
                            <AddationMethodsMenu methods={methods} anchorEl={anchorEl} setAnchorEl={setAnchorEl} />
                        </div>



                        <div className='m-5'>
                            <button onClick={submitGroupHandler} className="btn btn-primary mx-auto mt-4">Submit Group</button>
                        </div>
                    </CardComponent>
                </div>
            </div>
        );
    }



    return (
        <div>
            {groupNameCreated ? mainContent() : askForGroupName()}
        </div>
    );
}

export default AddQuestionGroup;

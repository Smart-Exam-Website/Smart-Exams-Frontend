import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import CardComponent from '../../../Components/CardComponent/CardComponent';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import MCQ from './QuestionTypes/MCQ';
import { ExclamationCircleOutlined } from '@ant-design/icons/lib/icons';
import { Colors } from '../../../constants/Colors';


const AddQuestionScreen = () => {
    const [questionTypes, setQuestionTypes] = useState(null);
    const getQuestionTypes = () => {
        setQuestionTypes([
            { id: '123', value: 'MCQ' }
        ])
    }
    useEffect(() => {
        getQuestionTypes();
    }, []);


    const [questionType, setQuestionType] = useState('');
    const questionTypeSelectionMenuMarkup = (
        <div className='w-50 mx-auto'>
            <TextField
                id="outlined-select-currency"
                select
                fullWidth
                label="Question Type"
                value={questionType}
                onChange={(event) => setQuestionType(event.target.value)}
            >
                {questionTypes?.map((type) => (
                    <MenuItem key={type.id} value={type.value}>
                        {type.value}
                    </MenuItem>
                ))}
            </TextField>
        </div>
    )

    return <div className="row justify-content-center text-center my-5">
        <div className="col-md-8 col-12">
            <CardComponent title={'Add Question'}>
                <div className='p-4'>
                    {questionTypes && questionTypeSelectionMenuMarkup}

                    {!questionType &&
                        <div className='d-flex flex-row justify-content-center align-items-center mt-5'>
                            <ExclamationCircleOutlined size={36} style={{ color: Colors.danger, marginInlineEnd: '.5rem' }} />
                            <h6 className='text-danger m-0'>Please Choose Question Type</h6>
                        </div>
                    }

                    {questionType === 'MCQ' &&
                        <div>
                            <MCQ  />
                        </div>
                    }
                </div>
            </CardComponent>
        </div>
    </div>
};

export default AddQuestionScreen;

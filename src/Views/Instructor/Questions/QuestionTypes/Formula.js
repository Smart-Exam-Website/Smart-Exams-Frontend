import { TextField, Typography } from '@mui/material';
import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Colors } from '../../../../constants/Colors';
import * as yup from 'yup';
import { QuestionServices } from '../../../../apis/Services/QuestionService';
import mexp from 'math-expression-evaluator'
import useRandomValue from '../../../../hooks/useRandomValue';
import HandleErrors from '../../../../hooks/handleErrors';

const VAR_REGEX = /\[[a-z A-Z]+\]/g
const BRACKETS_REGEX = /\[|\]/g

const Label = styled.label`
    display: block;
    font-size: 20px;
    font-weight: 700;
    color: #000;
`
const Formula = ({ initValues, getQuestionCreationRequest = () => { } }) => {
    const EssaySchema = yup.object().shape({
        questionText: yup.string().required('This is a required field'),
        formula: yup.string().required('This is a required field'),
        numberOfQuestions: yup.number().required().max(50).min(1),
    });

    const isEditMode = Boolean(initValues)

    const getRandomValue = useRandomValue();
    const [questionFormValue, setQuestionFormValue] = useState(null)
    const submitQuestionHandler = (values) => {
        setQuestionFormValue(values)

        let numberOfGeneratedQuestion = values.numberOfQuestions
        let finalQuestionValue = []

        // setting Variables
        while (numberOfGeneratedQuestion--) {
            let variablesAttr = []
            vars.forEach(element => {
                let generatedAttempt = {}
                generatedAttempt['var'] = element[0]
                generatedAttempt['value'] = getRandomValue(Number(element[1]), Number(element[2]))
                variablesAttr.push(generatedAttempt)
            });
            finalQuestionValue.push({ variables: variablesAttr })
        }

        // setting final value
        finalQuestionValue = finalQuestionValue.map(item => {
            let formula = values.formula + ''
            let vars = item.variables
            vars.forEach(element => {
                formula = formula.replaceAll(element.var, element.value)
            })
            return { ...item, finalValue: mexp.eval(formula) }
        })
        setGeneratedQuestions(finalQuestionValue)
    }

    const [vars, setVars] = useState([])
    const [uniqueTokensList, setUniqueTokensList] = useState([])
    const [questionText, setQuestionText] = useState('')

    /** Creating tokens */
    const generateVars = () => {
        let tokenList = [...questionText?.matchAll(VAR_REGEX)]
        tokenList = tokenList?.map(item => item[0])
        tokenList = tokenList?.map(item => {
            let editedToken = item + ''
            editedToken = editedToken.replace(BRACKETS_REGEX, '')
            return editedToken
        })
        const uniqueTokens = Array.from(new Set(tokenList))
        setUniqueTokensList(uniqueTokens)
    }
    useEffect(() => {
        generateVars()
    }, [questionText])

    /** ONLY trigger unique tokens list changes  */
    const [oldVarList, setOldVarList] = useState(null)

    useEffect(() => {
        let editedList = uniqueTokensList?.map(item => { return [item, '', ''] })
        if (oldVarList) {
            let varObject = {};
            oldVarList.forEach(element => {
                varObject[element[0]] = [element[1], element[2]]
            });
            editedList.forEach(element => {
                if (varObject?.[element[0]]) {
                    element[1] = varObject?.[element[0]][0]
                    element[2] = varObject?.[element[0]][1]
                }
            })
        }
        setVars(editedList)
        setOldVarList(editedList)
        setGeneratedQuestions(null)
    }, [uniqueTokensList])

    /** Trigger when get an init value */
    useEffect(() => {
        if (!initValues) return
        setQuestionText(initValues?.questionText)

        let initVarList = initValues?.variables?.map(item => [item['variable'], item['startVal'], item['endVal']])
        setOldVarList(initVarList)
    }, [initValues])

    const onChangeMin = (value, index) => {
        setVars(prevState => {
            let newVars = [...prevState];
            newVars[index][1] = value
            return newVars
        })
    }

    const onChangeMax = (value, index) => {
        setVars(prevState => {
            let newVars = [...prevState];
            newVars[index][2] = value
            return newVars
        })
    }

    const [generatedQuestions, setGeneratedQuestions] = useState(null)

    const createQuestion = () => {
        let generatedFormulas = generatedQuestions?.map(item => {
            let questionText = questionFormValue?.questionText
            let questionTextAfterGeneration = questionText
            item?.variables?.forEach(element => {
                questionTextAfterGeneration = questionTextAfterGeneration?.replaceAll(`[${element.var}]`, element.value)
            });

            return [questionTextAfterGeneration, item.finalValue]
        })

        if (!isEditMode) {
            let creationRequest = QuestionServices.createFormulaQuestion({
                questionText: questionFormValue?.questionText,
                formula: questionFormValue?.formula,
                variables: vars,
                formulas: generatedFormulas
            })
            getQuestionCreationRequest(creationRequest)
        }
        //EDIT MODE
        else {
            let editRequest = QuestionServices.editFormulaQuestion(initValues?.id, {
                questionText: questionFormValue?.questionText,
                formula: questionFormValue?.formula,
                variables: vars,
                formulas: generatedFormulas
            })
            getQuestionCreationRequest(editRequest)
        }
    }

    return (
        <>
            <Formik
                initialValues={{
                    questionText: initValues?.questionText || '',
                    correctAnswer: initValues?.correctAnswer || '',
                    formula: initValues?.formula?.formula || '',
                    numberOfQuestions: initValues?.formula_questions?.length || ''
                }}
                enableReinitialize={true}
                validationSchema={EssaySchema}
                onSubmit={submitQuestionHandler}
            >
                {props => (
                    <form className='m-5' onSubmit={props.handleSubmit}>
                        {/* Question Header */}
                        <div className='mt-4 text-start'>
                            <Label htmlFor='questionText' className='mb-2'>Question Text</Label>
                            <TextField
                                name="questionText"
                                id="questionText"
                                placeholder='Question on your mind....'
                                multiline
                                rows={4}
                                fullWidth
                                value={props.values.questionText}
                                onChange={(e) => { props.handleChange(e); setQuestionText(e.target.value) }}
                                onBlur={props.handleBlur}
                                helperText={props.touched.questionText && props.errors.questionText}
                                error={props.touched.questionText && Boolean(props.errors.questionText)}
                                variant="filled"
                            />
                        </div>

                        <div className='mt-4 text-start'>
                            <Label htmlFor='formula' className='mb-2'>Formula</Label>
                            <TextField
                                name="formula"
                                id="formula"
                                placeholder='Final Answer Formula'
                                fullWidth
                                value={props.values.formula}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                helperText={props.touched.formula && props.errors.formula}
                                error={props.touched.formula && Boolean(props.errors.formula)}
                                variant="filled"
                            />
                        </div>

                        {vars?.map((variable, index) => (
                            <div key={index} className='d-flex justify-content-between align-items-center mt-5'>
                                <Label style={{ color: Colors.primary }}>{`${variable[0]} :`}</Label>
                                <TextField
                                    name="min"
                                    label="Min Value"
                                    placeholder='Variable minimum value'
                                    value={variable[1]}
                                    onChange={(e) => onChangeMin(e.target.value, index)}
                                    variant="filled"
                                />
                                <TextField
                                    name="max"
                                    label="Max Value"
                                    placeholder='Variable maximum value'
                                    value={variable[2]}
                                    onChange={(e) => onChangeMax(e.target.value, index)}
                                    variant="filled"
                                />
                            </div>
                        ))}

                        <div className='mt-4 text-start'>
                            <Label htmlFor='numberOfQuestions' className='mb-2'>Number of random questions</Label>
                            <TextField
                                name="numberOfQuestions"
                                id="numberOfQuestions"
                                type={'number'}
                                placeholder='Max: 50'
                                fullWidth
                                value={props.values.numberOfQuestions}
                                onChange={props.handleChange}
                                onBlur={props.handleBlur}
                                helperText={props.touched.numberOfQuestions && props.errors.numberOfQuestions}
                                error={props.touched.numberOfQuestions && Boolean(props.errors.numberOfQuestions)}
                                variant="filled"
                            />
                        </div>

                        <button className="btn btn-primary mx-auto mt-4" type="submit">Generate</button>

                        {generatedQuestions ?
                            <div className='mt-4'>
                                <Typography
                                    variant='h5'
                                    color='primary'
                                    style={{ textDecorationLine: 'underline' }}
                                >
                                    Generated Questions
                                </Typography>
                                <table className="table table-striped">
                                    <thead>
                                        <tr>
                                            {uniqueTokensList?.map((item, index) => (
                                                <th key={index + ''} scope="col">{item}</th>
                                            ))
                                            }
                                            <th scope="col">{'Final Value'}</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {generatedQuestions?.map((item, index) => (
                                            <tr key={index + ''}>
                                                {
                                                    item?.variables?.map((item, index) => (
                                                        <td key={index + ''}>{item.value}</td>
                                                    ))
                                                }

                                                <th>{item?.finalValue}</th>
                                            </tr>
                                        ))
                                        }
                                    </tbody>
                                </table >
                            </div>
                            :
                            null
                        }
                    </form>
                )}
            </Formik>
            <button disabled={!generatedQuestions} onClick={createQuestion} className="btn btn-primary mx-auto mt-4" type="button">
                {!isEditMode ? 'ADD' : 'Edit'}
            </button>
        </>
    )

};

export default Formula;

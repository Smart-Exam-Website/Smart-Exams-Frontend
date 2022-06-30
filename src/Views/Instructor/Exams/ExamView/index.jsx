import { Box, Tabs, Tab } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { ExamServices } from '../../../../apis/Services/ExamService';
import { MarkExamServices } from '../../../../apis/Services/MarkExamService';
import HandleErrors from '../../../../hooks/handleErrors';
import { ExamOverview } from './ExamOverview';
import StudentsList from './StudentsList';
import ExamReport from './ExamReport'
import Statistics from './Statistics';
import PlagiarismCheck from './PlagiarismCheck';
const ExamView = () => {
    const history = useHistory()
    const location = useLocation()
    const [selectedTab, setSelectedTab] = React.useState('Overview');
    /**
     * Auto Select tab based on query params
     */
    useEffect(() => {
        let selectedTab = new URLSearchParams(location.search).get('selectedTab')
        setSelectedTab(selectedTab || 'Overview')
    }, [location.search?.selectedTab])


    const handleChange = (event, newValue) => {
        setSelectedTab(newValue);
        history.push({
            pathname: location.pathname,
            search: `?selectedTab=${newValue}`
        })
    };

    const params = useParams()
    const [questions, setQuestions] = useState(null)
    useEffect(() => {
        ExamServices.getExamQuestions(params.examId)
            .then(res => {
                setQuestions(res.questions)
            })
            .catch(err => HandleErrors(err))
    }, [])

    const [studentAnswers, setStudentAnswers] = useState(null)
    const getStudentExams = () => {
        MarkExamServices.getAllStudentsAnswers(params.examId)
            .then(res => {
                console.log(res.solvedExams)
                setStudentAnswers(res.solvedExams)
            })
            .catch(err => HandleErrors(err))
    }
    useEffect(() => {
        getStudentExams()
    }, [])

    const { examId } = useParams()
    const [examConfigs, setExamConfigs] = useState(null)
    useEffect(() => {
        ExamServices.getExamConfig(examId)
            .then(res => {
                console.log(res.configuration)
                setExamConfigs(res.configuration)
            })
            .catch(err => HandleErrors(err))
    }, [])

    return (
        <div className="container">
            <div className="row">
                <div className="col-12 mt-5">
                    <Box sx={{ width: '100%' }}>
                        <Tabs
                            value={selectedTab}
                            onChange={handleChange}
                            textColor="primary"
                            indicatorColor="primary"
                            aria-label="secondary tabs example"
                        >
                            <Tab value="Overview" label="Overview" />
                            <Tab value="StudentAnswers" label="Student Answers" />
                            <Tab value="ExamReport" label="Exam Report" />
                            <Tab value="Statistics" label="Statistics" />
                            {examConfigs?.plagiarismCheck && <Tab value="Plagiarism" label="Plagiarism Check" />}
                        </Tabs>
                    </Box>
                </div>
            </div>
            <div className="row justify-content-center">
                <div className="col-12 mt-5">
                    {selectedTab === 'Overview' &&
                        <ExamOverview questions={questions} examConfigs={examConfigs} />
                    }
                    {selectedTab === 'StudentAnswers' &&
                        <StudentsList
                            students={studentAnswers}
                            getStudentExams={getStudentExams}
                            examConfigs={examConfigs}
                        />
                    }
                    {selectedTab === 'ExamReport' &&
                        <ExamReport />
                    }
                    {selectedTab === 'Statistics' &&
                        <Statistics examId={examId} />
                    }
                    {selectedTab === 'Plagiarism' &&
                        <PlagiarismCheck examId={examId} />
                    }
                </div>
            </div>
        </div>
    )
}

export default ExamView
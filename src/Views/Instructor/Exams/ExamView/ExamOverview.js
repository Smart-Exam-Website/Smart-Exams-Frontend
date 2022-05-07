import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ExamServices } from '../../../../apis/Services/ExamService'
import McqAnswer from '../../../../Components/AnsweredQuestion/McqAnswer'
import EssayAnswer from '../../../../Components/AnsweredQuestion/EssayAnswer'
import HandleErrors from '../../../../hooks/handleErrors'
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Typography from '@mui/material/Typography';
import CardComponent from '../../../../Components/CardComponent/CardComponent'
import ShuffleIcon from '@mui/icons-material/Shuffle';
import DesktopAccessDisabledIcon from '@mui/icons-material/DesktopAccessDisabled';
import FactCheckIcon from '@mui/icons-material/FactCheck';
import SupervisedUserCircleIcon from '@mui/icons-material/SupervisedUserCircle';
import PhotoCameraFrontIcon from '@mui/icons-material/PhotoCameraFront';
import { QuestionTypes } from '../../../../constants/QuestionTypes'
import FormulaAnswer from '../../../../Components/AnsweredQuestion/FormulaAnswer'
import GroupAnswer from '../../../../Components/AnsweredQuestion/GroupAnswer'




const AntiCheatingTimeline = ({ examConfig }) => {
    const isRandom = examConfig?.questionsRandomOrder
    const isDisableSwitch = examConfig?.disableSwitchBrowser
    const isplagiarism = examConfig?.plagiarismCheck
    const isFaceDetection = examConfig?.faceDetection
    const isFaceVerify = examConfig?.faceRecognition
    return (
        <Timeline position="alternate">
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    align="right"
                    variant="body2"
                    color="text.secondary"
                    style={{ textDecoration: !isRandom ? 'line-through red' : '' }}
                >
                    Level1
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color={isRandom ? "primary" : "error"}>
                        <ShuffleIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography
                        style={{ textDecoration: !isRandom ? 'line-through red' : '' }}
                        variant="h6"
                        component="span"
                    >
                        Random Order
                    </Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                    style={{ textDecoration: !isDisableSwitch ? 'line-through red' : '' }}
                >
                    Level2
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color={isDisableSwitch ? "primary" : "error"}>
                        <DesktopAccessDisabledIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography
                        style={{ textDecoration: !isDisableSwitch ? 'line-through red' : '' }}
                        variant="h6"
                        component="span"
                    >
                        Disable Switch Browser
                    </Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent
                    style={{ textDecoration: !isplagiarism ? 'line-through red' : '' }}
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                >
                    Level3
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color={isplagiarism ? "primary" : "error"}>
                        <FactCheckIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography
                        style={{ textDecoration: !isplagiarism ? 'line-through red' : '' }}
                        variant="h6"
                        component="span"
                    >
                        Plagiarism Check
                    </Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent
                    style={{ textDecoration: !isFaceDetection ? 'line-through red' : '' }}
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                >
                    Level4
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineConnector />
                    <TimelineDot color={isFaceDetection ? "primary" : "error"}>
                        <SupervisedUserCircleIcon />
                    </TimelineDot>
                    <TimelineConnector />
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography
                        style={{ textDecoration: !isFaceDetection ? 'line-through red' : '' }}
                        variant="h6"
                        component="span"
                    >
                        Face Detection
                    </Typography>
                </TimelineContent>
            </TimelineItem>
            <TimelineItem>
                <TimelineOppositeContent
                    style={{ textDecoration: !isFaceVerify ? 'line-through red' : '' }}
                    sx={{ m: 'auto 0' }}
                    variant="body2"
                    color="text.secondary"
                >
                    Level5
                </TimelineOppositeContent>
                <TimelineSeparator>
                    <TimelineDot color={isFaceVerify ? "primary" : "error"}>
                        <PhotoCameraFrontIcon />
                    </TimelineDot>
                </TimelineSeparator>
                <TimelineContent sx={{ py: '12px', px: 2 }}>
                    <Typography
                        style={{ textDecoration: !isFaceVerify ? 'line-through red' : '' }}
                        variant="h6"
                        component="span"
                    >
                        Face Recognition
                    </Typography>
                </TimelineContent>
            </TimelineItem>
        </Timeline>
    )
}

export const ExamOverview = ({ questions, examConfigs }) => {
    const { examId } = useParams()
    return (
        <>
            <CardComponent title={'Anti Cheating Levels'}>
                <AntiCheatingTimeline examConfig={examConfigs} />
            </CardComponent>
            <br /><br />
            <CardComponent title={'Questions'}>
                <div className='p-5'>
                    {questions?.map((item) => {
                        if (item?.type === QuestionTypes.MCQ) {
                            return (
                                <div key={item?.id} className='m-4 mt-5'>
                                    <McqAnswer questionText={item?.questionText} choices={item?.options} />
                                </div>)
                        }
                        else if (item?.type === QuestionTypes.ESSAY) {
                            return (
                                <div key={item?.id} className='m-4 mt-5'>
                                    <EssayAnswer questionText={item?.questionText} correctAnswer={item?.options[0]} />
                                </div>)
                        }
                        else if (item?.type === QuestionTypes.FORMULA) {
                            return (
                                <div key={item?.id} className='m-4 mt-5'>
                                    <FormulaAnswer formula_questions={item?.questions} teacherMode questionHeader={item?.questionText} />
                                </div>
                            )
                        }
                        else if (item?.type === QuestionTypes.GROUP) {
                            return (
                                <div key={item?.id} className='m-4 mt-5'> 
                                    <GroupAnswer questions={item?.questions} teacherMode questionHeader={item?.questionText} />
                                </div>
                            )
                        }
                        return null
                    }
                    )}
                </div>
            </CardComponent>
        </>
    )
}
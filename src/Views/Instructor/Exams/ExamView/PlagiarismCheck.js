import React, { useEffect } from 'react'
import { MarkExamServices } from '../../../../apis/Services/MarkExamService'
import HandleErrors from '../../../../hooks/handleErrors'

const PlagiarismCheck = ({ examId }) => {
  useEffect(() => {
    MarkExamServices.getPlagiarismResults(examId)
      .then(res => {
        console.log(res?.res?.plagiarism_results)
      })
      .catch(err => HandleErrors(err))
  }, [])

  return (
    <div>PlagiarismCheck</div>
  )
}

export default PlagiarismCheck
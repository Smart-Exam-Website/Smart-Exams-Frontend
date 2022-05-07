import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../constants/Colors';
import CloseIcon from '@mui/icons-material/Close';
import { ClickableView } from '../../constants/GlobalStyle';
import { useHistory } from 'react-router-dom';
import { Typography } from '@mui/material';

const Wrapper = styled.div`
    border: 1px solid ${Colors.primary};
    border-radius: 12px;
    padding: 16px 36px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  `
const Text = styled.span`
    color: ${Colors.primary};
    text-decoration: underline;
    font-weight: 700;
    font-size: 21px;
  `

const BorderdQuestionController = ({ questionTitle, id, deleteFunction = () => { }, hasNoDelete, questionType, children }) => {
  const history = useHistory();

  const headerTextStyle = {
    backgroundColor: '#fff',
    position: 'absolute',
    top: -25,
    left: '50%',
    transform: 'translateX(-50%)',
    padding: '5px 10px'
  }

  const goToQuestion = () => {
    /** TODO */
    history.push('/questions/' + id)
  }

  return <Wrapper className='mb-3' style={{ flexDirection: 'column', alignItems: 'stretch', position: 'relative' }}>
    {questionType ?
      <Typography
        variant='h5'
        className='fw-bolder'
        color="primary"
        style={headerTextStyle}
        textTransform='capitalize'
      >
        {questionType}
      </Typography>
      :
      null
    }

    {hasNoDelete ?
      <div className='my-4'>
        <Text className='text-decoration-none'>{questionTitle}</Text>
      </div>
      :
      <div className='d-flex align-items-center justify-content-between'>
        <ClickableView onClick={goToQuestion}>
          <Text>{questionTitle}</Text>
        </ClickableView>
        <ClickableView onClick={deleteFunction}>
          <CloseIcon color={'error'} fontSize={'large'} />
        </ClickableView>
      </div>
    }

    {
      children
    }
  </Wrapper>
};

export default BorderdQuestionController;

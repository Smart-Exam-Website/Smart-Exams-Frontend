import React from 'react';
import styled from 'styled-components';
import { Colors } from '../../constants/Colors';
import CloseIcon from '@mui/icons-material/Close';
import { ClickableView } from '../../constants/GlobalStyle';
import { useHistory } from 'react-router-dom';

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

const BorderdQuestionController = ({ questionTitle, deleteFunction = () => { } }) => {
  const history = useHistory();

  const goToQuestion = () => {
    /** TODO */
    //history.push('')
  }

  return <Wrapper className='mb-4'>
    <ClickableView onClick={goToQuestion}>
      <Text>{questionTitle}</Text>
    </ClickableView>

    <ClickableView onClick={deleteFunction}>
      <CloseIcon color={'error'} fontSize={'large'} />
    </ClickableView>
  </Wrapper>;
};

export default BorderdQuestionController;

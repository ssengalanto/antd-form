import { Row, Typography } from 'antd';
import styled, { css } from 'styled-components';
import { CheckCircleTwoTone } from '@ant-design/icons';

const { Text } = Typography;

const baseText = css`
  display: block;
  text-transform: capitalize;
`;

const baseCard = css`
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
`;

const selectedCard = css`
  background-color: #fff;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
`;

const Card = styled(Row)<{ selected?: boolean }>`
  && {
    cursor: pointer;
    padding: 1.2rem 1.5rem;
    position: relative;
    border-radius: 0.3rem;
    ${(props) => (props.selected ? selectedCard : baseCard)};
  }
`;

const Absolute = styled.div`
  position: absolute;
  top: -0.7rem;
  right: -0.5rem;
`;

const CardContainer = styled.div`
  padding: 2rem 0;
`;

const Title = styled(Text)`
  ${baseText};
  font-size: 1.6rem;
  font-weight: 500;
`;

const Label = styled(Text)`
  ${baseText};
  font-size: 2rem;
`;

const SelectedIcon = styled(CheckCircleTwoTone)`
  font-size: 2rem;
`;

export const S = { Card, CardContainer, Absolute, SelectedIcon, Title, Label };

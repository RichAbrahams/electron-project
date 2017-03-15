import React from 'react';
import Icon from './stc/Icon';
import SectionHeaderText from './stc/SectionHeaderText';
import SectionHeaderWrapper from './stc/SectionHeaderWrapper';
import SectionHeaderInner from './stc/SectionHeaderInner';
import * as colors from '../colors';

function SectionHeader(props) {
  const { text, icon } = props;
  return (
    <SectionHeaderWrapper>
      <SectionHeaderInner>
        <Icon
          name={icon}
          size="3x"
          color={colors.white}
        />
        <SectionHeaderText>{text}</SectionHeaderText>
      </SectionHeaderInner>
    </SectionHeaderWrapper>
  );
}

export default SectionHeader;

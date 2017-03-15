import React from 'react';
import H2 from './stc/H2';
import SectionSubHeaderWrapper from './stc/SectionSubHeaderWrapper';
import Icon from './stc/Icon';
import * as colors from '../colors';

function SectionSubHeader(props) {
  const { text, icon } = props;
  return (
    <SectionSubHeaderWrapper className="SectionSubHeaderWrapper">
      <H2 className="H2" color={colors.darkBlue}>
        {text}
        <Icon className="Icon"
          name={icon}
          color={colors.darkBlue}
        />
      </H2>
      <hr />
    </SectionSubHeaderWrapper>
  );
}

export default SectionSubHeader;

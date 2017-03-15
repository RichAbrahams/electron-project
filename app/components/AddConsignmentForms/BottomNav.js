import React from 'react';
import RightAlignendRowDiv from '../stc/RightAlignedRowDiv';
import Button from '../stc/Button';
import * as colors from '../../colors';

function BottomNav(props) {
  const {formPageNumber, handleSubmit, previousForm, addProduct, submitting } = props;
  return (
    <RightAlignendRowDiv>
      {formPageNumber === 1 && <Button type="submit" color={colors.darkBlue}>Next</Button>}
      {formPageNumber === 2 &&
        <div>
          <Button type="button"color={colors.darkBlue} onClick={() => addProduct()}>Add Product</Button>
          <Button type="button" color={colors.darkBlue} margin="0 0 0 1em" onClick={() => previousForm()}>Previous</Button>
          <Button type="submit" color={colors.darkBlue} margin="0 0 0 1em" >Next</Button>
        </div>
      }
      {formPageNumber === 3 &&
        <div>
          <Button type="button" color={colors.darkBlue} margin="0 0 0 1em" onClick={() => previousForm()}>Previous</Button>
          <Button type="submit" color={colors.darkBlue} margin="0 0 0 1em" disabled={submitting}>Save</Button>
        </div>
      }
    </RightAlignendRowDiv>
  );
}

export default BottomNav;

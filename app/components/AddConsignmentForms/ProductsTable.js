import React from 'react';
import { Table, Column, Cell } from 'fixed-data-table';
import DivCentered from '../stc/DivCentered';
import ContainerDimensions from 'react-container-dimensions';

function ProductsTable(props) {
  const { consignmentForm } = props;
  const products = consignmentForm.addConsignment.values.products;
  
  return (
    <DivCentered margin="3em 0 0 0">
      <ContainerDimensions>
        { ({ width }) =>
          <Table rowsCount={products.length} rowHeight={50} headerHeight={50} width={width} height={(products.length + 1) * 50}>
            <Column
              header={<Cell > ID </Cell>}
              cell={(tableProps) => (
                <Cell {...tableProps}>
                  {products[tableProps.rowIndex].productID}
                </Cell>
              )}
              width={width / 9}
            />
            <Column
              header={<Cell > Name </Cell>}
              cell={(tableProps) => (
                <Cell {...tableProps}>
                  {products[tableProps.rowIndex].productName}
                </Cell>
              )}
              width={width / 9}
            />
            <Column
              header={<Cell > Cost USD </Cell>}
              cell={(tableProps) => (
                <Cell {...tableProps}>
                  {products[tableProps.rowIndex].costUSD}
                </Cell>
              )}
              width={width / 9}
            />
            <Column
              header={<Cell > Weight </Cell>}
              cell={(tableProps) => (
                <Cell {...tableProps}>
                  {products[tableProps.rowIndex].weightKG}
                </Cell>
              )}
              width={width / 9}
            />
            <Column
              header={<Cell > Quantity </Cell>}
              cell={(tableProps) => (
                <Cell {...tableProps}>
                  {products[tableProps.rowIndex].quantity}
                </Cell>
              )}
              width={width / 9}
            />
            <Column
              header={<Cell > Pack Size </Cell>}
              cell={(tableProps) => (
                <Cell {...tableProps}>
                  {products[tableProps.rowIndex].packSize}
                </Cell>
              )}
              width={width / 9}
            />
            <Column
              header={<Cell > Packaging </Cell>}
              cell={(tableProps) => (
                <Cell {...tableProps}>
                  {products[tableProps.rowIndex].packagingCostGBP}
                </Cell>
              )}
              width={width / 9}
            />
            <Column
              header={<Cell > Postage </Cell>}
              cell={(tableProps) => (
                <Cell {...tableProps}>
                  {products[tableProps.rowIndex].postageGBP}
                </Cell>
              )}
              width={width / 9}
            />
            <Column
              header={<Cell > Category Fee </Cell>}
              cell={(tableProps) => (
                <Cell {...tableProps}>
                  {products[tableProps.rowIndex].categoryFeePercent}
                </Cell>
              )}
              width={width / 9}
            />
          </Table>
       }
      </ContainerDimensions>
    </DivCentered>
  );
}

export default ProductsTable;

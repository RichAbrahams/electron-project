import React from 'react';
import ContainerDimensions from 'react-container-dimensions';
import { Table, Column, Cell } from 'fixed-data-table';
import DivCentered from '../stc/DivCentered';

function ConsignmentTable(props) {
  const { consignmentForm } = props;

  return (
    <DivCentered margin="3em 0 0 0">
      <ContainerDimensions>
        { ({ width }) =>
          <Table rowsCount={1} rowHeight={50} headerHeight={50} width={width} height={100}>
            <Column
              header={<Cell > ID </Cell>}
              cell={consignmentForm.addConsignment.values.consignmentID}
              width={width / 11}
            />
            <Column
              header={<Cell > Weight </Cell>}
              cell={consignmentForm.addConsignment.values.weightKG}
              width={width / 11}
            />
            <Column
              header={<Cell > USD Total </Cell>}
              cell={consignmentForm.addConsignment.values.totalUSD}
              width={width / 11}
            />
            <Column
              header={<Cell > Products Total </Cell>}
              cell={consignmentForm.addConsignment.values.productsTotalUSD}
              width={width / 11}
            />
            <Column
              header={<Cell > Agent Fee </Cell>}
              cell={consignmentForm.addConsignment.values.agentServiceUSD}
              width={width / 11}
            />
            <Column
              header={<Cell > CHN Customs </Cell>}
              cell={consignmentForm.addConsignment.values.chnCustomsUSD}
              width={width / 11}
            />
            <Column
              header={<Cell > Shipping </Cell>}
              cell={consignmentForm.addConsignment.values.shippingUSD}
              width={width / 11}
            />
            <Column
              header={<Cell > GBP Total </Cell>}
              cell={consignmentForm.addConsignment.values.totalGBP}
              width={width / 11}
            />
            <Column
              header={<Cell > UK Duty </Cell>}
              cell={consignmentForm.addConsignment.values.ukDutyGBP}
              width={width / 11}
            />
            <Column
              header={<Cell > UK VAT </Cell>}
              cell={consignmentForm.addConsignment.values.ukVatGBP}
              width={width / 11}
            />
            <Column
              header={<Cell > Clearance Fee </Cell>}
              cell={consignmentForm.addConsignment.values.ukClearanceGBP}
              width={width / 11}
            />
          </Table>
        }
      </ContainerDimensions>
    </DivCentered>
  );
}

export default ConsignmentTable;

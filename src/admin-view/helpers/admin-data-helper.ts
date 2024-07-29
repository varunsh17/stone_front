import { EditPageProps } from "../sub-components/lease-details-table";
import { CatogoryType } from "../sub-components/edit-table-page";

interface CommonData {
  code: number;
  activities?: string[];
  buildings?: string[];
  leases?: string[];
}

export const modifyDataObject = (type: CatogoryType, data: CommonData): EditPageProps => {
  let modifiedData: EditPageProps = {
    tableData: []
  };
  switch (type) {
    case CatogoryType.LEASE:
      modifiedData.tableData = data.leases ?? [];
    break;
    case CatogoryType.BUILDING: 
      modifiedData.tableData = data.buildings ?? [];
    break;
    case CatogoryType.ACTIVITY: 
      modifiedData.tableData = data.activities ?? [];
    break;
  }
  return modifiedData;
};
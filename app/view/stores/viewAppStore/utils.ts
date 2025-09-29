import type { CreateResponse } from "@/lib/data/datasheetResponses";
import type { IViewFieldSetModel } from "./fieldSetModel";
import type { DatasheetSubmitData } from "./formDataModel";

export const getSubmitData = (fieldSets: IViewFieldSetModel[]) => {
  return fieldSets.map((fieldSet, index) => {
    return {
      legend: `${index + 1} ${fieldSet.legend ?? ""}`,
      fields: fieldSet.fields.map((field) => {
        return {
          name: field.name,
          value: field.value,
        };
      }),
    };
  });
};

export const submitDatasheetClient = async ({
  formData,
  submitData,
  demo,
  contacts,
}: {
  formData: {
    name: string;
    id: string;
    authorId: string;
    companyId: string | null;
  };
  submitData: DatasheetSubmitData[];
  demo: boolean;
  contacts: string | null;
}) => {
  const newResponse: CreateResponse = {
    datasheetName: formData.name,
    contacts,
    datasheetId: formData.id,
    authorId: formData.authorId,
    companyId: formData.companyId ?? null,
    demo,
    data: JSON.stringify(submitData),
  };
  const response = await fetch("/api/v1/datasheet/submit", {
    method: "POST",
    body: JSON.stringify({ newResponse }),
  });
  return response.json();
};

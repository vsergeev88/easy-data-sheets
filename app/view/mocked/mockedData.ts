import { FIELD_TYPES, Form } from "@/lib/types/form";

export const FORM_MOCK_DATA: Form = {
  id: "1",
  name: "Опросный лист на изготовление дизельной насосной установки (ДНУ)",
  description: "Опросный лист содержит основные параметры, по которым производится подбор оборудования.",
  createdAt: "2021-01-01",
  updatedAt: "2021-01-01",
  isPublic: true,
  authorId: "1",
  fieldSets: [
    {
      legend: "Контактная информация и условия поставки",
      fields: [
        {
          label: "Контактное лицо",
          description: "имя и должность",
          name: "username",
          type: FIELD_TYPES.TEXT,
          required: true,
        },
        {
          label: "Телефон",
          description: "с кодом города",
          name: "phone",
          type: FIELD_TYPES.TEXT,
          required: true,
        },
        {
          label: "Электронная почта",
          name: "email",
          type: FIELD_TYPES.TEXT,
          required: true,
        },
        {
          label: "Организация",
          name: "organization",
          type: FIELD_TYPES.TEXT,
        },
        {
          label: "Местонахождение и тип объекта",
          name: "place",
          type: FIELD_TYPES.TEXT,
        },
        {
          label: "Необходимые сроки поставки",
          name: "time",
          type: FIELD_TYPES.TEXT,
        },
        {
          label: "Количество агрегатов",
          name: "number",
          type: FIELD_TYPES.TEXT,
        }
      ]
    },
    {
      legend: "Характеристики перекачиваемой среды и сфера применения",
      fields: [
        {
          label: "Область применения",
          name: "items",
          type: FIELD_TYPES.CHECKBOX,
          items: [
            {
              id: "1",
              label: "Орошение",
            },
            {
              id: "2",
              label: "Навозоудаление",
            },
            {
              id: "3",
              label: "Промышленные мотопомпы для грязной воды",
            },
            {
              id: "4",
              label: "Пожаротушение",
            },
            {
              id: "5",
              label: "Размыв грунта и откачка пульп",
            },
            {
              id: "6",
              label: "Водоотлив в добывающей промышленности (ДПИ)",
            },
            {
              id: "7",
              label: "Чрезвычайные ситуации",
            },
            {
              id: "8",
              label: "Сезонная опрессовка АОМЦ",
            },
            {
              id: "9",
              label: "Агрегаты АН и АО",
            },
            {
              id: "10",
              label: "Насосные блоки для буровых скважин",
            },
          ]
        }
      ]
    }
  ]
}
import { FIELD_TYPES, Form } from '@/lib/types/form'

export const FORM_MOCK_DATA: Form = {
  id: '1',
  name: 'Опросный лист на изготовление дизельной насосной установки (ДНУ)',
  description:
    'Опросный лист содержит основные параметры, по которым производится подбор оборудования.',
  createdAt: '2021-01-01',
  updatedAt: '2021-01-01',
  isPublic: true,
  authorId: '1',
  fieldSets: [
    {
      legend: 'Контактная информация и условия поставки',
      fields: [
        {
          label: 'Контактное лицо',
          description: 'имя и должность',
          name: 'username',
          type: FIELD_TYPES.TEXT,
          required: true,
        },
        {
          label: 'Телефон',
          description: 'с кодом города',
          name: 'phone',
          type: FIELD_TYPES.TEXT,
          required: true,
        },
        {
          label: 'Электронная почта',
          name: 'email',
          type: FIELD_TYPES.TEXT,
          required: true,
        },
        {
          label: 'Организация',
          name: 'organization',
          type: FIELD_TYPES.TEXT,
        },
        {
          label: 'Местонахождение и тип объекта',
          name: 'place',
          type: FIELD_TYPES.TEXT,
        },
        {
          label: 'Необходимые сроки поставки',
          name: 'time',
          type: FIELD_TYPES.TEXT,
        },
        {
          label: 'Количество агрегатов',
          name: 'number',
          type: FIELD_TYPES.TEXT,
        },
      ],
    },
    {
      legend: 'Характеристики перекачиваемой среды и сфера применения',
      fields: [
        {
          label: 'Область применения',
          name: 'items',
          type: FIELD_TYPES.CHECKBOX,
          withCustomField: true,
          items: [
            'Орошение',
            'Навозоудаление',
            'Промышленные мотопомпы для грязной воды',
            'Пожаротушение',
            'Размыв грунта и откачка пульп',
            'Водоотлив в добывающей промышленности (ДПИ)',
            'Чрезвычайные ситуации',
            'Сезонная опрессовка АОМЦ',
            'Агрегаты АН и АО',
            'Насосные блоки для буровых скважин',
          ],
        },
      ],
    },
  ],
}

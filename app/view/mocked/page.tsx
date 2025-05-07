"use client"

import FormView from "../components/FormView"
export default function MockedView() {
  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center md:text-left">Опросный лист на изготовление дизельной насосной установки (ДНУ)</h1>
      <p className="text-sm text-gray-500 mb-4">
        Опросный лист содержит основные параметры, по которым производится подбор оборудования.

      </p>
      <FormView />
    </div>
  )
}
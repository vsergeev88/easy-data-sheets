'use client'

import FormView from '../components/FormView'
import { FORM_MOCK_DATA } from './mockedData'
export default function MockedView() {
  return <FormView formData={FORM_MOCK_DATA} />
}

import { noop } from 'lodash'

export const clickButton = (component, text) => {
  component.find(`button[children="${text}"]`).simulate('click', { preventDefault: noop })
}
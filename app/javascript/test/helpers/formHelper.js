import { noop } from 'lodash'

export const clickButton = (component, text) => {
  component.find(`button[children="${text}"]`).simulate('click', { preventDefault: noop })
}

export const clickLink = (component, text) => {
  const link = component.findWhere((e) => e.type() === 'a' && e.text() === text)
  link.simulate('click', { preventDefault: noop })
}

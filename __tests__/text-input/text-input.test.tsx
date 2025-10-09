import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { TextInput } from 'react-native';
import AppTextInput from '../../component/text-input/text-input';

describe('TextField', () => {
  it("renderswithplaceholder", () => {
    const {getByPlaceholderText} = render(<AppTextInput placeholder='Hello?'/>)

    expect(getByPlaceholderText("Hello?")).toBeTruthy()
  })

  it("update when user types", () => {
    const {getByPlaceholderText} = render(<AppTextInput placeholder='Hello?'/>)
    const input = getByPlaceholderText("Hello?")
    fireEvent.changeText(input, "John")
    expect(input.props.value).toBe("John")
  })

  it("calls onChangeText", () => {
    const onChangeText = jest.fn()
    const {getByPlaceholderText} = render(<AppTextInput placeholder='Hello?' />)
    const input = getByPlaceholderText("Hello?")

    fireEvent.changeText(input, "John")
    expect(onChangeText).toHaveBeenCalledWith("John")
  })
});
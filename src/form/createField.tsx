import * as React from 'react'
import { isEqual } from '../utils'
import AbsentField from '../AbsentField'
import { ProviderValue, FormFieldProps, FieldState, InnerFieldProps } from '../'

const defaultFieldState: FieldState = {
  value: '',
  originalValue: '',
  didBlur: false,
  touched: false
}

function wrapConsumer<T>(Consumer: React.Consumer<ProviderValue<T>>) {
  const InnerField = getInnerField<T>()
  const emptyArray = []

  return class FormField extends React.Component<FormFieldProps<T>> {
    _render = ({ value, loaded, formIsDirty, ...providerValue }: ProviderValue<T>) => {
      const { render, component, name, validators, ...props } = this.props
      const state = loaded && value[name] ? value[name] : defaultFieldState
      const validation = loaded && value[name] ? providerValue.validation[name] : emptyArray
      return (
        <InnerField
          {...state}
          {...props}
          name={name}
          render={render}
          component={component}
          validation={validation}
          validators={validators}
          formIsDirty={formIsDirty}
          submit={providerValue.submit}
          unload={providerValue.unload}
          clearForm={providerValue.clearForm}
          submitting={providerValue.submitting}
          forgetState={providerValue.forgetState}
          submitCount={providerValue.submitCount}
          onFieldBlur={providerValue.onFieldBlur}
          setFieldValue={providerValue.setFieldValue}
          registerField={providerValue.registerField}
          registerValidator={providerValue.registerValidator}
          isDirty={formIsDirty && !isEqual(state.originalValue, state.value)}
        />
      )
    }

    render() {
      return <Consumer>{this._render}</Consumer>
    }
  }
}

function getInnerField<T>() {
  const emptyArray = []
  class InnerField extends React.Component<InnerFieldProps<T>> {
    componentDidMount() {
      const { registerField, name, initialValue, validators } = this.props
      registerField(name, initialValue, validators || emptyArray)
    }

    componentDidUpdate(pp: InnerFieldProps<T>) {
      const { validators = emptyArray, registerValidator, name } = this.props
      if (validators !== pp.validators) {
        registerValidator(name, validators)
      }
    }

    componentWillUnmount() {
      // unregisterField()
    }

    onBlur = e => {
      const { onFieldBlur, name, onBlur } = this.props
      onFieldBlur(name)
      if (onBlur) {
        onBlur(e)
      }
    }

    onChange = e => {
      const { setFieldValue, name } = this.props
      setFieldValue(name, e.target.value)
    }

    collectProps = () => {
      const {
        render,
        component,
        initialValue,
        registerValidator,
        validation = emptyArray,
        ...props
      } = this.props
      return {
        name: this.props.name,
        value: this.props.value,
        originalValue: this.props.originalValue,
        didBlur: this.props.didBlur,
        touched: this.props.touched,
        isDirty: this.props.isDirty,
        isValid: validation.length === 0,
        messages: validation,
        submitCount: this.props.submitCount,
        ...props,
        onBlur: this.onBlur,
        onChange: this.onChange
      }
    }

    render() {
      const { render, component: Component, name } = this.props

      const props = this.collectProps()
      if (render) {
        return render(props)
      }

      if (Component) {
        return <Component {...props} />
      }

      return (
        <AbsentField message={`Please provide render or component prop for field: '${name}'`} />
      )
    }
  }

  return InnerField
}

export default wrapConsumer

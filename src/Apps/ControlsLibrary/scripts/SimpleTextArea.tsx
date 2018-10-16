import "../css/SimpleTextArea.scss";

import * as React from "react";
import * as ReactDOM from "react-dom";

import { initializeIcons } from "@uifabric/icons";
import {
    IWorkItemFieldControlProps, IWorkItemFieldControlState, WorkItemFieldControl
} from "Common/Components/VSTS/WorkItemFieldControl";
import { getFormService } from "Common/Utilities/WorkItemFormHelpers";
import { Fabric } from "OfficeFabric/Fabric";
import { TextField } from "OfficeFabric/TextField";
import { css } from "OfficeFabric/Utilities";

interface ISimpleTextAreaInputs {
    FieldName: string;
    Pattern: string;
    ErrorMessage?: string;
}

interface ISimpleTextAreaProps extends IWorkItemFieldControlProps {
    pattern: string;
    errorMessage: string;
}

interface ISimpleTextAreaState extends IWorkItemFieldControlState<string> {
    hovered?: boolean;
    focused?: boolean;
}

export class SimpleTextArea extends WorkItemFieldControl<string, ISimpleTextAreaProps, ISimpleTextAreaState> {
    public render(): JSX.Element {
        const { value, hovered, focused, error } = this.state;
        const isActive = hovered || focused || error;
        return (
            <Fabric className="fabric-container">
                <TextField
                    style={{height: 200}}
                    className={css("simple-text-area", { invalid: !!error })}
                    value={value || ""}
                    multiline={true}
                    borderless={!isActive}
                    onChanged={this._onChange}
                    onKeyDown={this._onInputKeyDown}
                    onMouseOver={this._onMouseOver}
                    onMouseOut={this._onMouseOut}
                    onFocus={this._onFocus}
                    onBlur={this._onBlur}
                />
            </Fabric>
        );
    }

    protected getErrorMessage(value: string): string {
        let error = "";
        if (value) {
            const patt = new RegExp(this.props.pattern);
            error = patt.test(value) ? "" : this.props.errorMessage;
        }
        this._setWorkItemFormError(error);
        return error;
    }

    private async _setWorkItemFormError(error: string) {
        const service: any = await getFormService();
        if (error) {
            service.setError(error);
        } else {
            service.clearError();
        }
    }

    private _onInputKeyDown = async (e: React.KeyboardEvent<any>) => {
        if (e.ctrlKey && e.keyCode === 83) {
            e.preventDefault();
            const formService = await getFormService();
            formService.save();
        }
    };

    private _onMouseOver = () => {
        this.setState({ hovered: true });
    };

    private _onMouseOut = () => {
        this.setState({ hovered: false });
    };

    private _onFocus = () => {
        this.setState({ focused: true });
    };

    private _onBlur = () => {
        this.setState({ focused: false });
    };

    private _onChange = (value: string) => {
        this.onValueChanged(value);
    };
}

export function init() {
    initializeIcons();
    const inputs = WorkItemFieldControl.getInputs<ISimpleTextAreaInputs>();

    ReactDOM.render(
        <SimpleTextArea
            fieldName={inputs.FieldName}
            pattern={inputs.Pattern}
            errorMessage={(inputs.ErrorMessage && inputs.ErrorMessage.trim()) || "The entered value does not match the control's pattern."}
        />,
        document.getElementById("ext-container")
    );
}

import React from 'react';
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';

const Form = ({ formControls, formData, setFormData, onSubmit, buttonText, isBtnDisabled}) => {
    const renderInputsByComponentType = (controlItem) => {
        const value = formData[controlItem.name] || '';

        switch (controlItem.componentType) {
            case "input":
                return (
                    <Input
                        name={controlItem.name}
                        placeholder={controlItem.placeholder}
                        id={controlItem.name}
                        type={controlItem.type}
                        value={value}
                        onChange={event => setFormData({
                            ...formData,
                            [controlItem.name]: event.target.value
                        })}
                    />
                );

            case "select":
                return (
                    <Select onValueChange={(value) => setFormData({
                        ...formData,
                        [controlItem.name]: value
                    })} value={value}>
                        <SelectTrigger className="w-full">
                            <SelectValue placeholder={controlItem.placeholder} />
                        </SelectTrigger>
                        <SelectContent>
                            {controlItem.options && controlItem.options.length > 0 ? 
                                controlItem.options.map(optionItem => (
                                    <SelectItem key={optionItem.id} value={optionItem.id}>
                                        {optionItem.label}
                                    </SelectItem>
                                )) : null
                            }
                        </SelectContent>
                    </Select>
                );

            case "textarea":
                return (
                    <Textarea
                        name={controlItem.name}
                        placeholder={controlItem.placeholder}
                        id={controlItem.name}
                        value={value}
                        onChange={event => setFormData({
                            ...formData,
                            [controlItem.name]: event.target.value
                        })}
                    />
                );

            default:
                return (
                    <Input
                        name={controlItem.name}
                        placeholder={controlItem.placeholder}
                        id={controlItem.name}
                        type={controlItem.type}
                        value={value}
                        onChange={event => setFormData({
                            ...formData,
                            [controlItem.name]: event.target.value
                        })}
                    />
                );
        }
    };

    return (
        <form onSubmit={onSubmit}>
            <div className="flex flex-col gap-3">
                {formControls.map(controlItem => (
                    <div className="grid w-full gap-1.5 text-left" key={controlItem.name}>
                        <Label className="mb-1">{controlItem.label}</Label>
                        {renderInputsByComponentType(controlItem)}
                    </div>
                ))}
            </div>
            <Button disabled = {isBtnDisabled} type="submit" className="mt-4 w-full">
                {buttonText}
            </Button>
        </form>
    );
};

export default Form;
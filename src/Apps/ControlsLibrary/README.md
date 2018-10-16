# VSTS Work item form control library
This extension is a working library of a number of custom controls targeting the work item form. It provides some rudimentary functionality to your work item forms without adding any functionality one wouldnt expect.

If you are using TFS, you can add these controls to work item form via work item type xml file - <a href="https://docs.microsoft.com/en-us/vsts/extend/develop/configure-workitemform-extensions?view=vsts">Add extensions in work item form via work item type definition xml</a>.

If you are using VSTS, you can add them from process admin page -<a href="https://docs.microsoft.com/en-us/vsts/work/customize/process/custom-controls-process?view=vsts">Add or modify a custom control for a process and WIT</a>.

* <a href="#pattern">Simple Textarea Control</a>

The code for this extension is on <a href="https://github.com/dcaponi/vsts-extensions/tree/master/src/ControlsLibrary">github</a>

Credit goes to Mohit Bagra for his help in setting this up and for much of the code, on which, this extension is founded. The base for this project can be found at <a
href="https://github.com/mohitbagra/vsts-extensions">github</a>

<a name="pattern"></a>
#### Simple Textarea Control ####
A custom textarea control for multiline string fields which can also restrict the field value to a certain regex pattern. Note that the restriction would only work in this custom control as the pattern would not apply to the actual work item field. If users enter a wrong pattern in this control, it'll show an error below the control but the work item would still be saveable because work item form extensions cannot block work item save right now.

Additionally, this field provides all the functionality you would expect from a textarea tag in HTML. This is useful as one may use this to post raw strings to a VSTS service hook for later consumption within an API or other ecosystem. The multiline textarea provided by VSTS by default enables rich text editing which may cause undesirable results in your response.

![Group](images/pattern.png)

In the example above, there are 2 instances of pattern control - the first one requires the value to be an email. The 2nd one requires it to be a phone number. If the value entered by user doesnt match the pattern, it'll show an error.
If the value matches the pattern, then no error would be shown. Note that work item would still be saveable even if the control shows error.

![Group](images/pattern_correct.png)

>*Inputs* -
>1. **FieldName** *(required)* - A String or a Multiline string field associated with this control. The value of the pattern control would be bound to this field's value.
>2. **Pattern** *(required)* - A regex pattern for this control. It should be a valid javascript regex pattern string without the leading and trailing forward slash character.
>3. **ErrorMessage** *(required)* - A custom error message to be shown to user if the value entered in the control doesnt match the pattern.

*Some common regex patterns*
1. **Email** - ^(([^<>()\[\\]\\.,;:\s@"]+(\.[^<>()\[\\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$
2. **Phone Number** - ^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$
3. **Guid** - ^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$
4. **URL** - https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,4}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)

<a name="slider"></a>
#### Slider Control ####
A custom control that shows a numeric field as a slider control

![Group](images/slider.png)

>*Inputs* -
>1. **FieldName** *(required)* - A numeric field (Integer or Decimal) associated with this control. The value of the pattern control would be bound to this field's value.
>2. **MinValue** *(required)* - The min numeric value of the field.
>3. **MaxValue** *(required)* - The max numeric value of the field.
>3. **StepSize** *(required)* - The numeric step size for the slider.

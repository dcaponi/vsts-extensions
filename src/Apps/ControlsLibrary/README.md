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
This field is nothing more than a simple PlainText textarea like one would find in standard HTML forms. This enables developers to include VSTS work items in a solution ecosystem where capturing only text values is necessary and rich text format is not allowed or required.

That means, back end developers no longer need to write HTML parsers to sift out and throw away the formatting tags that the multiline field inserts in the standard VSTS input. Additionally, for every line break a newline `\n` character is automatically inserted, giving APIs and workers a consistent character to split lines on.

One additional feature is regex validation. A regex can be supplied in the field options on your process customization page that can help you define how your input should look and tell users if/when the input may become problematic.

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

import ChildrenHtml from './ChildrenHtml';
import useWindowDimensions from '../hooks/windowChange';
import { useSelector, useDispatch } from "react-redux";
import { useState } from 'react';

const Main = (props) => {
    const state = useSelector((state) => state);
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const { id, type, componentName, rootId, parent, settings, nodes, from } = props;

    //--------------for input controllers-----------------------
    const [editProperty, setEditProperty] = useState({
        color: settings?.style?.desktop?.color ? settings.style.desktop.color : "",
        text: type === "Heading" && settings?.general?.text
    })
    const [showInput, setShowInput] = useState(false)
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditProperty(preVal => {
            return { ...preVal, [name]: value }
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const { color, text } = editProperty;
        dispatch({ type: 'EDIT_INPUT', id, color, text });
        setShowInput(false);
    }

    if (from === "parent") {
        if (nodes.length === 0) {
            return null;
        } else {
            if (parent !== rootId) {
                return null;
            }
        }
    }
    switch (type) {
        case "Container":
            return (
                <div className={settings.className}>
                    <ChildrenHtml nodes={nodes} />
                </div>
            );
        case "Row":
            return (
                <div className={`${settings.general.className} justify-content-${settings.general.horizontalAlignment} align-items-${settings.general.verticalAlignment}`}>
                    <ChildrenHtml nodes={nodes} />
                </div>
            );
        case "Column":
            return (
                <div className={`${settings.className} ${width > 992 ? `col-md-${settings.general.colSize.desktop}` : `col-sm-${settings.general.colSize.tablet}`}`}>
                    <ChildrenHtml nodes={nodes} />
                </div>
            );
        case "Heading":
            const HeadingElement = componentName.toLowerCase();
            return (
                <>
                    <HeadingElement
                        className={settings.general.className}
                        style={width > 992 ? { ...settings?.style?.desktop } : (width < 992 && width >= 575) ? { ...settings?.style?.tablet } : { ...settings?.style?.mobile }}
                    >
                        <ChildrenHtml nodes={nodes} />
                        {settings.general.text}
                    </HeadingElement>

                    {state.mode &&
                        <>
                            <button
                                onClick={() => { setShowInput(!showInput) }}
                                className='btn btn-sm btn-light'
                            >
                                <i className='fa fa-edit' />
                            </button>
                            {
                                showInput &&
                                <form className='w-50' onSubmit={handleSubmit}>
                                    <div class="form-group">
                                        <label>Color</label>
                                        <input type="color" name="color" onChange={handleInputChange} class="form-control form-control-color" value={editProperty.color} title="Choose your color" />
                                    </div>
                                    <div class="form-group">
                                        <label>Text</label>
                                        <input name="text" value={editProperty.text} onChange={handleInputChange} type="text" class="form-control" placeholder="Enter text" />
                                    </div>
                                    <button type="submit" class="btn btn-primary">Submit</button>
                                </form>
                            }
                        </>
                    }
                </>
            );
        case "Box":
            return (
                <div
                    className={settings.className}
                    style={width > 992 ? { ...settings?.style?.desktop } : (width < 992 && width >= 575) ? { ...settings?.style?.tablet } : { ...settings?.style?.mobile }}
                >
                    <ChildrenHtml nodes={nodes} />
                </div>
            );
        case "Img":
            return (
                <img
                    className={settings.general.className}
                    src={settings.general.img.src}
                    alt={settings.general.img.src}
                />
            );
        case "Icon":
            return (
                <i
                    className={settings.general.icon?.type}
                    style={width > 992 ? { ...settings?.general?.icon?.style?.desktop } : (width < 992 && width >= 575) ? { ...settings?.general?.icon?.style?.tablet } : { ...settings?.general?.icon?.style?.mobile }}
                />
            );
        case "Button":
            return (
                <button
                    className={settings.className}
                    style={width > 992 ? { ...settings?.style?.desktop } : (width < 992 && width >= 575) ? { ...settings?.style?.tablet } : { ...settings?.style?.mobile }}
                >
                    {settings.general.text}
                </button>
            );
        default:
            return null;
    }
}

export default Main